var THREE = require('./libs/three');

class Game {
  constructor() {
    this.scene = this.createScene()
    this.plane = this.createPlane()
    this.camera = this.createCamera()
    this.renderer = this.createRenderer()
    this.init()
  }

  init() {
    this.animate()
  }

  createPlane() {
    let geo = new THREE.PlaneBufferGeometry(20000, 20000, 1, 1)
    let mat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      side: THREE.DoubleSide
    })
    let plane = new THREE.Mesh(geo, mat)
    plane.rotateX(-Math.PI / 2)
    plane.position.y = -10
    this.scene.add(plane)
    return plane
  }

  createCamera() {
    let camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 30000)
    camera.position.set(0, 100, 1000)
    camera.lookAt(this.scene.position)
    return camera
  }

  createScene() {
    let scene = new THREE.Scene()
    scene.background = new THREE.Color(0xF5FFFA)
    return scene
  }

  createRenderer() {
    let renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setSize(innerWidth, innerHeight)
    renderer.setPixelRatio(devicePixelRatio)
    document.body.appendChild(renderer.domElement)
    return renderer
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this))
    this.renderer.render(this.scene, this.camera)
  }
}

export default new Game()
