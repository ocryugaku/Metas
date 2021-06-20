import { createChannel } from '../node_modules/decentraland-builder-scripts/channel'
import { createInventory } from '../node_modules/decentraland-builder-scripts/inventory'
import Script1 from "../1d7e46b3-bfce-42bf-8d3c-cb9acebbf4ca/src/item"
import Script2 from "../d367d3f2-9696-4d61-985a-7988fbf5f50d/src/item"
import Script3 from "../645d2a2b-266d-4872-9368-562ca4a81139/src/item"
import Script4 from "../b53e3bde-9d22-4098-8707-29a685d25a3b/src/item"
import Script5 from "../80d9cb1c-2fcf-4585-8e19-e2d5621fd54d/src/item"
import Script6 from "../94d40c0a-759a-4210-bb23-7a87d9e143f1/src/item"
import Script7 from "../7d669c08-c354-45e4-b3a3-c915c8fd6b6e/src/item"

const _scene = new Entity('_scene')
engine.addEntity(_scene)
const transform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
_scene.addComponentOrReplace(transform)

const entity = new Entity('entity')
engine.addEntity(entity)
entity.setParent(_scene)
const gltfShape = new GLTFShape("models/FloorBasePebbles_01/FloorBasePebbles_01.glb")
gltfShape.withCollisions = true
gltfShape.isPointerBlocker = true
gltfShape.visible = true
entity.addComponentOrReplace(gltfShape)
const transform2 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity.addComponentOrReplace(transform2)

const facebookLink = new Entity('facebookLink')
engine.addEntity(facebookLink)
facebookLink.setParent(_scene)
const transform3 = new Transform({
  position: new Vector3(0.5, 0, 3.5),
  rotation: new Quaternion(-1.8182431745073473e-16, -0.7071068286895752, 8.429370268459024e-8, 0.7071067690849304),
  scale: new Vector3(1, 1, 1)
})
facebookLink.addComponentOrReplace(transform3)

const instagramLink = new Entity('instagramLink')
engine.addEntity(instagramLink)
instagramLink.setParent(_scene)
const transform4 = new Transform({
  position: new Vector3(0.5, 0, 2.5),
  rotation: new Quaternion(-3.2901249948221953e-15, 0.7071068286895752, -8.429369557916289e-8, 0.7071068286895752),
  scale: new Vector3(1.0000001192092896, 1, 1.0000001192092896)
})
instagramLink.addComponentOrReplace(transform4)

const youtubeLink = new Entity('youtubeLink')
engine.addEntity(youtubeLink)
youtubeLink.setParent(_scene)
const transform5 = new Transform({
  position: new Vector3(0.5, 0, 1.5),
  rotation: new Quaternion(-4.1028494548831114e-16, 0.7071068286895752, -8.429369557916289e-8, 0.7071068286895752),
  scale: new Vector3(1, 1, 1)
})
youtubeLink.addComponentOrReplace(transform5)

const twitterLink = new Entity('twitterLink')
engine.addEntity(twitterLink)
twitterLink.setParent(_scene)
const transform6 = new Transform({
  position: new Vector3(0.5, 0, 0.5),
  rotation: new Quaternion(-1.5394153601527394e-15, 0.7071068286895752, -8.429369557916289e-8, 0.7071068286895752),
  scale: new Vector3(1.000000238418579, 1, 1.000000238418579)
})
twitterLink.addComponentOrReplace(transform6)

const nftPictureFrame2 = new Entity('nftPictureFrame2')
engine.addEntity(nftPictureFrame2)
nftPictureFrame2.setParent(_scene)
const transform7 = new Transform({
  position: new Vector3(2, 0, 2),
  rotation: new Quaternion(-1.5394153601527394e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
  scale: new Vector3(7.500039100646973, 6.75, 1.0000061988830566)
})
nftPictureFrame2.addComponentOrReplace(transform7)

const nft = new Entity('nft')
engine.addEntity(nft)
nft.setParent(_scene)
const transform8 = new Transform({
  position: new Vector3(11.5, 1.5, 15),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
nft.addComponentOrReplace(transform8)
const nftShape = new NFTShape("ethereum://0x90709c29b779e5228e86ff04bb60a3643ea3e0e6/4100080037")
nftShape.withCollisions = true
nftShape.isPointerBlocker = true
nftShape.visible = true
nftShape.color = {"r":0.6404918,"g":0.611472,"b":0.8584906}
nft.addComponentOrReplace(nftShape)

const nft2 = new Entity('nft2')
engine.addEntity(nft2)
nft2.setParent(_scene)
const transform9 = new Transform({
  position: new Vector3(12, 1.5, 15),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
nft2.addComponentOrReplace(transform9)
const nftShape2 = new NFTShape("ethereum://0xe9be55ffedb6c2a2f3f8eac31c60d7f122f79958/11400012339")
nftShape2.withCollisions = true
nftShape2.isPointerBlocker = true
nftShape2.visible = true
nftShape2.color = {"r":0.6404918,"g":0.611472,"b":0.8584906}
nft2.addComponentOrReplace(nftShape2)

const nft3 = new Entity('nft3')
engine.addEntity(nft3)
nft3.setParent(_scene)
const transform10 = new Transform({
  position: new Vector3(11, 1.5, 15),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
nft3.addComponentOrReplace(transform10)
const nftShape3 = new NFTShape("ethereum://0x8a939fd297fab7388d6e6c634eee3c863626be57/17600020483")
nftShape3.withCollisions = true
nftShape3.isPointerBlocker = true
nftShape3.visible = true
nftShape3.color = {"r":0.6404918,"g":0.611472,"b":0.8584906}
nft3.addComponentOrReplace(nftShape3)

const nft4 = new Entity('nft4')
engine.addEntity(nft4)
nft4.setParent(_scene)
const transform11 = new Transform({
  position: new Vector3(13, 1.5, 15),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
nft4.addComponentOrReplace(transform11)
const nftShape4 = new NFTShape("ethereum://0xc2c747e0f7004f9e8817db2ca4997657a7746928/8643")
nftShape4.withCollisions = true
nftShape4.isPointerBlocker = true
nftShape4.visible = true
nftShape4.color = {"r":0.6404918,"g":0.611472,"b":0.8584906}
nft4.addComponentOrReplace(nftShape4)

const nft5 = new Entity('nft5')
engine.addEntity(nft5)
nft5.setParent(_scene)
const transform12 = new Transform({
  position: new Vector3(13.5, 1.5, 15),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
nft5.addComponentOrReplace(transform12)
const nftShape5 = new NFTShape("ethereum://0xc2c747e0f7004f9e8817db2ca4997657a7746928/11759")
nftShape5.withCollisions = true
nftShape5.isPointerBlocker = true
nftShape5.visible = true
nftShape5.color = {"r":0.6404918,"g":0.611472,"b":0.8584906}
nft5.addComponentOrReplace(nftShape5)

const nft6 = new Entity('nft6')
engine.addEntity(nft6)
nft6.setParent(_scene)
const transform13 = new Transform({
  position: new Vector3(14, 1.5, 15),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
nft6.addComponentOrReplace(transform13)
const nftShape6 = new NFTShape("ethereum://0xc2c747e0f7004f9e8817db2ca4997657a7746928/12562")
nftShape6.withCollisions = true
nftShape6.isPointerBlocker = true
nftShape6.visible = true
nftShape6.color = {"r":0.6404918,"g":0.611472,"b":0.8584906}
nft6.addComponentOrReplace(nftShape6)

const galleryInfoWhite = new Entity('galleryInfoWhite')
engine.addEntity(galleryInfoWhite)
galleryInfoWhite.setParent(_scene)
const transform14 = new Transform({
  position: new Vector3(1, 0, 5.5),
  rotation: new Quaternion(-1.5394153601527394e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
  scale: new Vector3(0.500001072883606, 0.5, 1.000002145767212)
})
galleryInfoWhite.addComponentOrReplace(transform14)

const galleryInfoWhite2 = new Entity('galleryInfoWhite2')
engine.addEntity(galleryInfoWhite2)
galleryInfoWhite2.setParent(_scene)
const transform15 = new Transform({
  position: new Vector3(9.5, 0, 15.5),
  rotation: new Quaternion(2.1037916129632668e-15, -1, 1.1920926112907182e-7, 0),
  scale: new Vector3(0.5000004172325134, 0.5, 1.0000008344650269)
})
galleryInfoWhite2.addComponentOrReplace(transform15)

const imageFromURL = new Entity('imageFromURL')
engine.addEntity(imageFromURL)
imageFromURL.setParent(_scene)
const transform16 = new Transform({
  position: new Vector3(15, 0, 8),
  rotation: new Quaternion(-1.5394153601527394e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
  scale: new Vector3(6.750056266784668, 5.625, 1.0000059604644775)
})
imageFromURL.addComponentOrReplace(transform16)

const channelId = Math.random().toString(16).slice(2)
const channelBus = new MessageBus()
const inventory = createInventory(UICanvas, UIContainerStack, UIImage)
const options = { inventory }

const script1 = new Script1()
const script2 = new Script2()
const script3 = new Script3()
const script4 = new Script4()
const script5 = new Script5()
const script6 = new Script6()
const script7 = new Script7()
script1.init(options)
script2.init(options)
script3.init(options)
script4.init(options)
script5.init(options)
script6.init(options)
script7.init(options)
script1.spawn(facebookLink, {"url":"moenotsu","bnw":false,"name":"MOET ART Facebook"}, createChannel(channelId, facebookLink, channelBus))
script2.spawn(instagramLink, {"url":"moet1030","bnw":false,"name":"MOET ART Instagram"}, createChannel(channelId, instagramLink, channelBus))
script3.spawn(youtubeLink, {"url":"UCYxstVU4B_-tHhj1glO7Z_w","bnw":false,"name":"MOET ART YouTube"}, createChannel(channelId, youtubeLink, channelBus))
script4.spawn(twitterLink, {"url":"moet1030","bnw":false,"name":"MOET ART Twitter"}, createChannel(channelId, twitterLink, channelBus))
script5.spawn(nftPictureFrame2, {"id":"4971","contract":"0x7Bd29408f11D2bFC23c34f18275bBf23bB716Bc7","style":"Classic","color":"#FFFFFF","ui":true}, createChannel(channelId, nftPictureFrame2, channelBus))
script6.spawn(galleryInfoWhite, {"text":"MOET Art NFT Gallery\nComing Soon!","fontSize":6.5,"font":"SF_Heavy","color":"#000000"}, createChannel(channelId, galleryInfoWhite, channelBus))
script6.spawn(galleryInfoWhite2, {"text":"My Favorite \nNFT Art \nCollections","fontSize":5.5,"font":"SF_Heavy","color":"#000000"}, createChannel(channelId, galleryInfoWhite2, channelBus))
script7.spawn(imageFromURL, {"image":"https://images.squarespace-cdn.com/content/v1/56a02ed01a5203899f95ba93/1464607666604-7OOXTHMZF53QGNYGYFJJ/ke17ZwdGBToddI8pDm48kFWxnDtCdRm2WA9rXcwtIYR7gQa3H78H3Y0txjaiv_0fHWpUEmQZkX684UWF7bhg2hhvlA0wF-Xl6Mm9sbU-VKpQPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UQmsdrAm02fZTXLYRxrtfbTWXEWxhrXcp9I8kVHAjHww7nJgZEpy_9PHS0K1tm4k-g/Pasadena13.JPG?format=1500w"}, createChannel(channelId, imageFromURL, channelBus))