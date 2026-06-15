function refreshProgress(accepted, total) {
  document.getElementById("accepted-count").textContent = accepted;
  document.getElementById("total-count").textContent = total;
}

function removeItem(el) {
  el.remove();
  if (!document.querySelector("#items .item")) {
    const done = document.createElement("div");
    done.className = "done";
    done.textContent = "All videos reviewed. mapping.json is up to date.";
    document.getElementById("items").after(done);
  }
}

async function postJSON(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

function acceptCandidate(itemEl, posterPath, confidence, source) {
  const videoPath = itemEl.dataset.video;
  postJSON("/api/accept", {
    video_path: videoPath,
    poster_path: posterPath,
    confidence: confidence,
    source: source,
  }).then((data) => {
    if (data.error) {
      alert("Error: " + data.error);
      return;
    }
    refreshProgress(data.accepted, data.total);
    removeItem(itemEl);
  });
}

function triggerFallback(itemEl) {
  const videoPath = itemEl.dataset.video;
  itemEl.classList.add("loading");
  postJSON("/api/fallback", { video_path: videoPath }).then((data) => {
    if (data.error) {
      alert("Frame extraction failed: " + data.error);
      itemEl.classList.remove("loading");
      return;
    }
    refreshProgress(data.accepted, data.total);
    removeItem(itemEl);
  });
}

document.getElementById("items").addEventListener("click", (e) => {
  const candidate = e.target.closest(".candidate");
  if (!candidate) return;
  const itemEl = candidate.closest(".item");

  if (candidate.dataset.action === "fallback") {
    triggerFallback(itemEl);
    return;
  }

  const posterPath = candidate.dataset.poster;
  const confidence = parseFloat(candidate.dataset.confidence);
  const isBest = candidate === itemEl.querySelector(".candidate");
  acceptCandidate(itemEl, posterPath, confidence, isBest ? "fuzzy" : "manual");
});

document.addEventListener("keydown", (e) => {
  const firstItem = document.querySelector("#items .item");
  if (!firstItem) return;

  const key = e.key.toLowerCase();

  if (key === "f") {
    triggerFallback(firstItem);
    return;
  }

  const num = parseInt(key, 10);
  if (!isNaN(num) && num >= 1 && num <= 3) {
    const candidates = firstItem.querySelectorAll(".candidate:not(.fallback)");
    const candidate = candidates[num - 1];
    if (candidate) {
      const posterPath = candidate.dataset.poster;
      const confidence = parseFloat(candidate.dataset.confidence);
      acceptCandidate(firstItem, posterPath, confidence, num === 1 ? "fuzzy" : "manual");
    }
  }
});

document.getElementById("bulk-accept-btn").addEventListener("click", () => {
  const threshold = parseFloat(document.getElementById("threshold").value);
  postJSON("/api/bulk_accept", { threshold: threshold }).then((data) => {
    refreshProgress(data.accepted, data.total);
    data.accepted_paths.forEach((vp) => {
      const el = document.querySelector(`.item[data-video="${CSS.escape(vp)}"]`);
      if (el) removeItem(el);
    });
  });
});
