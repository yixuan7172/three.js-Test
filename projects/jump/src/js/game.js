let nextCube = {
    position: new THREE.Vector3(),
    dir: null
}
const direction = {
    forward: 0,
    right: 1
}

function Game() {
    this.scene = this.createScene()
    this.renderer = this.createRenderer()
    this.player = this.createPlayer()
    this.camera = this.createCamera()
    this.plane = this.createPlane()
    this.cube = this.createCube()
}

Game.prototype = {
    constructor: Game,
    animate() {
        requestAnimationFrame(this.animate.bind(this))
        this.renderer.render(this.scene, this.camera)
        TWEEN.update()
    },
    createScene() {
        let scene = new THREE.Scene()
        scene.background = new THREE.Color(0xB5B5B5)
        return scene
    },

    createRenderer() {
        let renderer = new THREE.WebGLRenderer({antialias: true})
        renderer.setSize(innerWidth, innerHeight)
        renderer.setPixelRatio(devicePixelRatio)
        document.getElementsByClassName('container')[0].appendChild(renderer.domElement)
        return renderer
    },
    createCamera() {
        let camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 1000)
        camera.position.set(-25, 40, 40)
        camera.lookAt(this.player.position)
        new THREE.OrbitControls(camera)
        return camera
    },
    createPlane() {
        let geo = new THREE.PlaneBufferGeometry(1000, 1000, 50, 50)
        let mat = new THREE.MeshBasicMaterial({
            color: 0x000000,
            side: THREE.DoubleSide,
            wireframe: true
        })
        let plane = new THREE.Mesh(geo, mat)
        plane.rotation.x = -Math.PI / 2
        this.scene.add(plane)
        return plane
    },
    createPlayer() {
        let cube = new THREE.BoxGeometry(1.5, 4, 1.5)
        let mat = new THREE.MeshBasicMaterial({
            color: 0x8B008B,
            side: THREE.DoubleSide
        })
        let mesh = new THREE.Mesh(cube, mat)
        mesh.position.set(0, 8, 0)
        this.scene.add(mesh)
        return mesh
    },
    createCube() {
        let geo = new THREE.BoxGeometry(6, 6, 6)
        let mat = new THREE.MeshBasicMaterial({
            color: 0xE6E6FA
        })
        let mesh = new THREE.Mesh(geo, mat)
        mesh.position.set(0, 3, 0)
        nextCube.position = new THREE.Vector3().copy(mesh.position)
        this.scene.add(mesh)

        let direction = ~~(Math.random() * 2)
        if (direction === 0) {
            nextCube.position.z -= utils.randomInt(8, 24)
            nextCube.dir = 0
        } else {
            nextCube.position.x += utils.randomInt(8, 24)
            nextCube.dir = 1
        }
        this.randomCreateCube(direction, nextCube.position)
        return mesh
    },
    randomCreateCube(dir, position) {
        let geo = new THREE.BoxGeometry(6, 6, 6)
        let mat = new THREE.MeshBasicMaterial({
            color: Math.random() * 0xffffff
        })
        let mesh = new THREE.Mesh(geo, mat)
        mesh.position.set(position.x, position.y, position.z)
        nextCube.position = new THREE.Vector3().copy(mesh.position)
        this.scene.add(mesh)
        return mesh
    }
}

let game = new Game()
game.animate()


class Player {
    constructor() {
        this.tw_posX = null
        this.tw_posZ = null
        this.scaleInterval = null
        this.jumpInterval = null
        this.distance = new THREE.Vector3()
        this.nextPos = new THREE.Vector3()
    }

    mouseDown(e) {
        if (e.button === 2) return
        const _this = this
        if (e.button === 2) return
        let nowTime = _this.getStartTime()
        let endTime = null
        _this.scaleInterval = setInterval(() => {
            endTime = this.getStartTime()
            if ((endTime - nowTime) > 30) {
                nowTime = endTime
                if (game.player.scale.y <= .4) {
                    clearInterval(_this.scaleInterval)
                    _this.scaleInterval = null
                }
                game.player.scale.y -= 0.03
                game.player.position.y -= .03
            }
        }, 100)
        _this.jumpInterval = setTimeout(() => {
            if (game.player.scale.y <= .4) {
                clearInterval(_this.jumpInterval)
                _this.jumpInterval = null
            }
            if (direction.forward === nextCube.dir) {
                _this.distance.y += 10
                _this.distance.z -= 10

            } else {
                _this.distance.y += 10
                _this.distance.x += 10
            }
        }, 100)
    }

    mouseUp() {
        const _this = this
        _this.scaleInterval && clearInterval(_this.scaleInterval)
        _this.jumpInterval && clearInterval(_this.jumpInterval)
        _this.scaleInterval = null
        _this.jumpInterval = null
        let currPlayerPos = game.player.position.clone()
        let obj = {x: game.player.position.x, y: game.player.position.y, z: game.player.position.z}
        if (direction.forward === nextCube.dir) {//前
            _this.tw_posZ = new TWEEN.Tween(obj)
                .to({y: (currPlayerPos.y += _this.distance.y), z: (currPlayerPos.z += _this.distance.z)}, 500)
                .onUpdate(() => {
                    game.player.position.y = obj.y
                    game.player.position.z = obj.z
                })
                .onComplete(() => {
                    _this.tw_posZ.stop()
                    _this.distance.set(0, 0, 0)
                    console.log('右进完毕')
                })
                .start()
        } else {
            _this.tw_posX = new TWEEN.Tween(obj)
                .to({y: (currPlayerPos.y += _this.distance.y), x: (currPlayerPos.x += _this.distance.x)}, 500)
                .onUpdate(() => {
                    game.player.position.y = obj.y
                    game.player.position.x = obj.x
                })
                .onComplete(() => {
                    _this.tw_posX.stop()
                    _this.distance.set(0, 0, 0)
                    console.log('右进完毕')
                })
                .start()
        }
    }

    getStartTime() {
        return +new Date()
    }

    judgeNextCubePos() {

    }

}

let player = new Player()
document.body.addEventListener('mousedown', player.mouseDown.bind(player), false)
document.body.addEventListener('mouseup', player.mouseUp.bind(player), false)
