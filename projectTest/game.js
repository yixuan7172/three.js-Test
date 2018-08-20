let camera, renderer, scene
let mesh, controls

function init() {
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)

    camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 30000)
    camera.position.z = 500
    camera.position.y = 1000
    camera.lookAt(scene.position)

    controls = new THREE.OrbitControls(camera)
    controls.update()

    renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setSize(innerWidth, innerHeight)
    document.getElementById('container').appendChild(renderer.domElement)

    createPlane()
    createBox()
    createAmbient()

    animate()
}

function createPlane() {
    // let geometry = new THREE.PlaneBufferGeometry(200, 200, 10, 10),
    //     material = new THREE.MeshLambertMaterial({
    //         color: new THREE.Color(0x333333),
    //         wireframe: true
    //     })
    // mesh = new THREE.Mesh(geometry, material)
    // mesh.rotation.z = -Math.PI / 2
    // scene.add(mesh)

    var helper = new THREE.GridHelper(600, 20);
    scene.add(helper);

    var geometry = new THREE.BufferGeometry();
    geometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( 4 * 3 ), 3 ) );
    var material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2, transparent: true } );
    line = new THREE.Line( geometry, material );
    scene.add( line );
}

function createBox() {
    let geo = new THREE.BoxGeometry(100, 20, 10),
        mat = new THREE.MeshLambertMaterial({color: 0xff0000})
    let mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)
    mesh.geometry.computeBoundingBox();

    //获取X边 边长
    let sideLength = mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x
    let sideLength2 = mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y
    let sideLength3 = mesh.geometry.boundingBox.max.z - mesh.geometry.boundingBox.min.z
    console.log(sideLength, sideLength2, sideLength3)
}

function createAmbient() {
    let ambient = new THREE.AmbientLight(0xffffff, 1.0)
    scene.add(ambient)
}

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

init()