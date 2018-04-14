let THREE = require('./libs/three');
window.THREE = THREE
import FirstPersonControls from 'first-person-controls'
import player from './player'
import {
    Layers
} from './libs/three';

let img = require('../assets/imgs/pig.jpg')

export default class Game {
    constructor() {
        this.scene = this.createScene()
        this.player = this.createPlayer()
        this.plane = this.createPlane()
        this.camera = this.createCamera()
        this.cameraControl = this.createCameraControl()
        this.renderer = this.createRenderer()
        this.init()
    }

    init() {
        this.animate()
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this))
        this.renderer.render(this.scene, this.camera)
            // this.camera.position.x += .01
            // this.camera.position.y += .01
    }

    createPlane() {
        let geo = new THREE.PlaneBufferGeometry(10000, 10000)
        let mat = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            color: 0xCFCFCF
        })
        let plane = new THREE.Mesh(geo, mat)
        plane.rotateX(-Math.PI / 2)
        this.scene.add(plane)
        return plane
    }

    createCamera() {
        let camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 1, 1000)
        camera.position.set(0, 10, 0)
        camera.lookAt(this.player.position)
        return camera
    }
    createCameraControl() {
        let control = new FirstPersonControls(this.camera)

    }

    createScene() {
        let scene = new THREE.Scene()
        scene.background = new THREE.Color(0xF5FFFA)
        return scene
    }

    createRenderer() {
        let renderer = new THREE.WebGLRenderer({
            antialias: true
        })
        renderer.setSize(innerWidth, innerHeight)
        renderer.setPixelRatio(devicePixelRatio)
        document.getElementsByClassName('container')[0].appendChild(renderer.domElement)
        return renderer
    }
    createPlayer() {
        let texture = new THREE.TextureLoader().load(img)
        texture.minFilter = THREE.LinearFilter
        let geo = new THREE.BoxGeometry(1, 3, 1)
        let mat = new THREE.MeshBasicMaterial({
            map: texture,
            color: 0xEE7942
        })
        let player = new THREE.Mesh(geo, mat)
        player.position.y = 1.5
        this.scene.add(player)
        return player
    }


}