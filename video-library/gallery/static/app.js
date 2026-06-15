let allItems = [];
let observer;

function createCard(item) {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.dataset.src = item.thumb_url;
  img.alt = item.video_name;
  img.className = "poster";

  const label = document.createElement("div");
  label.className = "label";
  label.textContent = item.video_name;

  card.appendChild(img);
  card.appendChild(label);
  card.addEventListener("click", () => playVideo(item.video_path, card));
  return card;
}

function playVideo(videoPath, card) {
  card.classList.add("playing");
  fetch("/api/play", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ video_path: videoPath }),
  })
    .then((r) => r.json())
    .then((data) => {
      if (data.error) alert("Could not launch SMPlayer: " + data.error);
    })
    .finally(() => {
      setTimeout(() => card.classList.remove("playing"), 800);
    });
}

function render(items) {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  if (observer) observer.disconnect();
  observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          obs.unobserve(img);
        }
      });
    },
    { rootMargin: "300px" }
  );

  const frag = document.createDocumentFragment();
  items.forEach((item) => frag.appendChild(createCard(item)));
  grid.appendChild(frag);

  grid.querySelectorAll("img.poster").forEach((img) => observer.observe(img));
  document.getElementById("count").textContent = items.length + " titles";
}

document.getElementById("search").addEventListener("input", (e) => {
  const q = e.target.value.trim().toLowerCase();
  const filtered = q
    ? allItems.filter((i) => i.video_name.toLowerCase().includes(q))
    : allItems;
  render(filtered);
});

fetch("/api/items")
  .then((r) => r.json())
  .then((items) => {
    allItems = items;
    render(items);
  });
