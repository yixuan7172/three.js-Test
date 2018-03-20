'use strict';
let scene,
    camera,
    renderer,
    raycaster,
    mouseDown,
    world,
    night = false;

let ground,
    city,
    dino;

let width,
    height;

let speed = 0.05;

function init() {
    width = window.innerWidth,
        height = window.innerHeight;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 50);
    camera.position.set(-2, 2, 12);
    camera.lookAt(scene.position);

    renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    addLights();
    drawGround();
    drawCity();
    drawDino();
    document.body.appendChild(renderer.domElement);

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchend', onTouchEnd);
    window.addEventListener('resize', onResize);
}

function addLights() {
    const light = new THREE.HemisphereLight();
    scene.add(light);

    const directLight1 = new THREE.DirectionalLight(0xffffff, 0.3);
    directLight1.castShadow = true;
    directLight1.position.set(20, 10, 18);
    scene.add(directLight1);

    const directLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    directLight2.castShadow = true;
    directLight2.position.set(-14, 6, 14);
    scene.add(directLight2);
}

function drawGround() {
    ground = new THREE.Mesh(new THREE.PlaneGeometry(90, 30), new THREE.MeshStandardMaterial({
        color: 0x375076,
        roughness: 1
    }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.6;
    ground.receiveShadow = true;
    scene.add(ground);
}

function drawCity() {
    city = new City();
    scene.add(city.group);
}

function drawDino() {
    dino = new Dino();
    scene.add(dino.group);
}

function onResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

function onMouseDown(event) {
    mouseDown = true;
}

function onTouchStart(event) {
    if(event.target.classList[0] === 'toggle-music') return;
    event.preventDefault();
    mouseDown = true;
    if(speed !== 0.1) speed = 0.1;
}

function onMouseUp() {
    mouseDown = false;
}

function onTouchEnd(event) {
    if(event.target.classList[0] === 'toggle-music') return;
    event.preventDefault();
    mouseDown = false;
}

function animate() {
    requestAnimationFrame(animate);

    render();
}

function render() {
    if(mouseDown) {
        city.move(speed * 2);
        dino.moveFast(speed * 2);
    } else {
        city.move(speed);
        dino.move(speed);
    }

    city.road.forEach((bus) => {
        bus.moveOut(dino.group.position);
    });

    renderer.render(scene, camera);
}

class City {
    constructor() {
        this.group = new THREE.Group();

        this.city = new THREE.Group();
        this.group.add(this.city);

        this.drawCity();
        this.drawRoad();
        this.drawSky();
    }

    drawCity() {
        this.line1 = new THREE.Group();
        this.line1.position.z = -3;
        this.city.add(this.line1);

        const houses = new THREE.Group();
        houses.name = 'houses';
        this.line1.add(houses);

        const houseMaterial = new THREE.MeshStandardMaterial({
            color: 0x2697A8,
            roughness: 1,
            flatShading: true
        });

        const windowMaterial = new THREE.MeshStandardMaterial({
            color: 0xEDF0F8,
            roughness: 1,
            flatShading: true
        });
        const windows = new THREE.Group();
        const window1 = this.drawBox(0.2, 0.4, 0.3, windowMaterial);
        const window2 = window1.clone();
        window2.position.x = 0.3;
        const window3 = window2.clone();
        window3.position.y = 0.5;
        const window4 = window1.clone();
        window4.position.y = 0.5;
        windows.add(window1);
        windows.add(window2);
        windows.add(window3);
        windows.add(window4);

        const house1 = this.drawBox(1, 1.2, 1, houseMaterial);
        const house1Windows = windows.clone();
        house1Windows.position.set(-0.2, -0.2, 0.5);
        house1.add(house1Windows);
        houses.add(house1);

        const house2 = this.drawBox(1.1, 2.4, 1, houseMaterial);
        house2.position.set(1, 0.6, 0);
        const house2Windows = windows.clone();
        house2Windows.position.set(0, 0.3, 0.5);
        house2.add(house2Windows);
        houses.add(house2);

        const house3 = this.drawBox(1.4, 1.6, 1, houseMaterial);
        house3.position.set(2.25, 0.2, 0);
        const house3Windows = windows.clone();
        house3Windows.position.set(0, -0.4, 0.5);
        house3.add(house3Windows);
        houses.add(house3);

        const house4 = this.drawBox(0.9, 1, 1, houseMaterial);
        house4.position.set(3.4, -0.1, 0);
        const house4Window = window1.clone();
        house4Window.position.set(0.2, 0.1, 0.5);
        house4.add(house4Window);
        houses.add(house4);

        const house5 = this.drawBox(1.2, 3.7, 1, houseMaterial);
        house5.position.set(4.5, 1.25, 0);
        const house5Windows = windows.clone();
        house5Windows.position.set(-0.3, -0.2, 0.5);
        house5.add(house5Windows);
        houses.add(house5);

        for(let i = 0; i < 8; i++) {
            const housesClone = houses.clone();
            housesClone.position.x = houses.position.x - 5.6 * (i + 1);
            this.line1.add(housesClone);
        }

        for(let i = 0; i < 8; i++) {
            const housesClone = houses.clone();
            housesClone.position.x = houses.position.x + 5.6 * (i + 1);
            this.line1.add(housesClone);
        }

        this.line2 = this.line1.clone();
        this.line2.position.set(-1, 0.3, -5);
        this.city.add(this.line2);

        this.line3 = this.line1.clone();
        this.line3.position.set(-2, 0.7, -8);
        this.city.add(this.line3);

        this.line4 = this.line1.clone();
        this.line4.position.set(-1.5, 1, -11);
        this.city.add(this.line4);
    }

    drawRoad() {
        this.road = [];

        const colors = [0x65BDCC, 0xC40066, 0xE0C538];

        for(let i = 0; i < 50; i++) {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const bus = new Bus(randomColor);

            bus.group.origX = Math.random() * 80 - 40;
            bus.group.origY = -0.25;
            bus.group.origZ = 0.8 + 3 * i / 12;
            bus.group.position.set(bus.group.origX, bus.group.origY, bus.group.origZ);

            this.group.add(bus.group);
            this.road.push(bus);
        }
    }

    drawSky() {
        this.sky = new THREE.Group();
        this.group.add(this.sky);
        const geometry = new THREE.IcosahedronGeometry(0.2, 0);

        for(let i = 0; i < 150; i++) {
            const material = new THREE.MeshStandardMaterial({
                color: 0xA9EFF9,
                roughness: 1,
                flatShading: true
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(Math.random() * 100 - 50,
                Math.random() * 12 + 4,
                Math.random() * 10 - 15);
            this.sky.add(mesh);
        }
    }

    drawCylinder(rTop, rBottom, height, rSeg, material) {
        const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBottom, height, rSeg), material)
        cylinder.castShadow = true;
        cylinder.receiveShadow = true;
        return cylinder;
    }

    drawBox(w, h, d, material) {
        const box = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material)
        box.castShadow = true;
        box.receiveShadow = true;
        return box;
    }

    deg(degrees) {
        return degrees * (Math.PI / 180);
    }

    move(speed) {
        const lineLimits = [56, 54, 52, 53];
        const lines = [this.line1, this.line2, this.line3, this.line4];
        lines.forEach((line, index) => {
            line.traverse((houses) => {
                if(houses.name === 'houses') {
                    houses.position.x += speed;
                    if(houses.position.x > lineLimits[index]) {
                        houses.position.x = lineLimits[index] - 95.2;
                    }
                }
            });
        });

        this.sky.traverse((cloud) => {
            if(cloud instanceof THREE.Mesh) {
                cloud.position.x += speed;
                if(cloud.position.x > 50) {
                    cloud.position.x = -50;
                }
            }
        });

        this.road.forEach((bus) => {
            bus.move(speed);
        });
    }
}

class Dino {
    constructor() {
        this.group = new THREE.Group();
        this.group.position.y = 0.7;
        this.group.position.z = 6;

        this.vAngle = 0;

        this.skinMaterial = new THREE.MeshStandardMaterial({
            color: 0xE0C538,
            roughness: 1,
            flatShading: true
        });
        this.whiteMaterial = new THREE.MeshStandardMaterial({
            color: 0xEDF0F8,
            roughness: 1,
            flatShading: true
        });
        this.darkMaterial = new THREE.MeshStandardMaterial({
            color: 0x375076,
            roughness: 1,
            flatShading: true
        });

        this.drawBody();
        this.drawLegs();

        this.drawAirship();
    }

    drawBody() {
        this.body = new THREE.Group();
        this.body.position.y = 0.75;
        this.body.rotation.set(this.deg(-23.3), this.deg(40), this.deg(34));
        this.group.add(this.body);

        const torso = this.drawCylinder(0.4, 1, 1.3, 4, this.skinMaterial);
        torso.position.y = 0.95;
        this.body.add(torso);

        const back = this.drawCylinder(1, 0.75, 0.85, 4, this.skinMaterial);
        back.position.y = -0.11;
        this.body.add(back);

        this.drawHead();
        this.drawTail();
        this.drawHands();
    }

    drawHead() {
        this.head = new THREE.Group();
        this.head.rotation.set(0, this.deg(-45), this.deg(-20));
        this.head.position.set(-0.1, 1.8, -0.1);
        this.body.add(this.head);

        const mainHead = this.drawCylinder(0.5, 0.58, 0.8, 4, this.skinMaterial);
        mainHead.rotation.set(this.deg(45), 0, this.deg(90));
        mainHead.position.x = 0.05;
        this.head.add(mainHead);


        const rightEye = this.drawCylinder(0.2, 0.2, 0.25, 5, this.skinMaterial);
        rightEye.position.set(0, 0.4, 0.3);
        rightEye.rotation.x = this.deg(90);
        this.head.add(rightEye);

        const eyeWhite = this.drawCylinder(0.1, 0.15, 0.1, 5, this.whiteMaterial);
        eyeWhite.position.y = 0.15;
        rightEye.add(eyeWhite);

        this.eyeBlack = this.drawCylinder(0.04, 0.05, 0.03, 5, this.darkMaterial);
        this.eyeBlack.position.y = 0.06;
        eyeWhite.add(this.eyeBlack);

        const leftEye = rightEye.clone();
        leftEye.position.z = -rightEye.position.z;
        leftEye.rotation.z = this.deg(180);
        this.head.add(leftEye);

        const nose = this.drawCylinder(0.14, 0.5, 0.4, 4, this.skinMaterial);
        nose.position.x = -0.55;
        nose.rotation.set(this.deg(45), 0, this.deg(90));
        this.head.add(nose);
    }

    drawLegs() {
        this.rightLeg = new THREE.Group();
        this.rightLeg.position.x = this.rightLeg.position.z = 0.35;
        this.group.add(this.rightLeg);

        const leg = this.drawCylinder(0.6, 0.2, 1.1, 4, this.skinMaterial);
        leg.geometry.translate(0.2, -0.1, 0);
        leg.position.set(-0.26, 0.15, 0.25);
        leg.rotation.y = this.deg(45);
        this.rightLeg.add(leg);

        const foot = this.drawBox(0.8, 0.3, 0.3, this.skinMaterial);
        foot.geometry.translate(0.2, -0.15, 0.1);
        foot.position.set(-0.35, -0.5, 0);
        this.rightLeg.add(foot);

        const bus = new Bus(0xC40066);
        bus.group.position.set(-0.15, -0.85, 0.1);
        this.rightLeg.add(bus.group);

        this.leftLeg = this.rightLeg.clone();
        this.leftLeg.position.z = -this.rightLeg.position.z - 0.25;
        this.group.add(this.leftLeg);
    }

    drawTail() {
        this.tail = new THREE.Group();
        this.tail.position.set(0.4, -0.4, 0.5);
        this.tail.rotation.set(this.deg(-27.3), this.deg(-6.8), this.deg(27.3));
        this.body.add(this.tail);

        const bigTail = this.drawCylinder(0.75, 0.4, 1.2, 4, this.skinMaterial);
        this.tail.add(bigTail);

        const littleTail = this.drawCylinder(0.4, 0.08, 1.3, 4, this.skinMaterial);
        littleTail.position.set(0.15, -1.07, 0.15);
        littleTail.rotation.set(this.deg(-15.25), this.deg(-2.05), this.deg(15.25));
        this.tail.add(littleTail);
    }

    drawHands() {
        this.rightHand = new THREE.Group();
        this.rightHand.position.set(-0.7, 0.9, -0.35);
        this.rightHand.rotation.set(0, this.deg(-45), this.deg(-30));
        this.body.add(this.rightHand);

        const hand = this.drawCylinder(0.2, 0.1, 0.5, 4, this.skinMaterial);
        hand.position.set(0.08, 0.1, 0);
        hand.rotation.set(this.deg(33), this.deg(32.5), this.deg(-50.5));
        this.rightHand.add(hand);

        const palm = this.drawBox(0.15, 0.15, 0.15, this.skinMaterial);
        palm.position.set(-0.06, -0.12, 0);
        this.rightHand.add(palm);

        this.leftHand = this.rightHand.clone();
        this.leftHand.position.set(-0.34, 0.9, -0.7);
        this.body.add(this.leftHand);
    }

    drawAirship() {
        this.airship = new Airship(0.5);

        this.airship.group.position.set(3, 4.5, -2);
        this.group.add(this.airship.group);

        const stringMaterial = new THREE.LineBasicMaterial({color: 0xC40066});
        const stringGeometry = new THREE.Geometry();
        stringGeometry.vertices.push(this.airship.group.position);
        stringGeometry.vertices.push(this.leftHand.position);
        this.string = new THREE.Line(stringGeometry, stringMaterial);
        this.string.position.set(0, 0, 0);
        this.group.add(this.string);
    }

    skate(speed) {
        const legPos = Math.sin(this.vAngle) * this.deg(20);

        if(Math.sin(this.vAngle) > 0) {
            this.rightLeg.rotation.z = legPos;
            this.rightLeg.position.x = legPos;
        } else {
            this.leftLeg.rotation.z = -legPos;
            this.leftLeg.position.x = -legPos;
        }
    }

    move(speed) {
        this.vAngle += speed;

        this.skate(speed);

        if(Math.sin(this.vAngle) > 0) {
            this.eyeBlack.scale.z = Math.sin(this.vAngle) * this.deg(50) + 0.2;
        }

        this.tail.rotation.z = Math.sin(this.vAngle) * this.deg(4) + this.deg(27.3);
        this.tail.rotation.y = Math.sin(this.vAngle) * this.deg(5) + this.deg(-6.8);

        this.head.rotation.z = Math.sin(this.vAngle) * this.deg(10) - this.deg(30);

        this.airship.fly(speed / 2);
        this.string.geometry.verticesNeedUpdate = true;

        if(this.body.rotation.x !== this.deg(-23.3)) {
            this.body.rotation.set(this.deg(-23.3), this.deg(40), this.deg(34));
        }
    }

    moveFast(speed) {
        this.vAngle += speed;

        this.eyeBlack.scale.z = 1;
        this.skate(speed);

        this.body.rotation.z = Math.sin(-this.vAngle) * this.deg(5) + this.deg(34);
        this.body.rotation.x = Math.sin(-this.vAngle) * this.deg(5) + this.deg(-23.3);
    }

    deg(degrees) {
        return degrees * (Math.PI / 180);
    }

    drawCylinder(rTop, rBottom, height, rSeg, material) {
        const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBottom, height, rSeg), material)
        cylinder.castShadow = true;
        cylinder.receiveShadow = true;
        return cylinder;
    }

    drawBox(w, h, d, material) {
        const box = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material)
        box.castShadow = true;
        box.receiveShadow = true;
        return box;
    }
}

class Airship {
    constructor(scale) {
        this.group = new THREE.Group();
        this.group.scale.set(scale, scale, scale);

        this.vAngle = 0;

        this.draw();
    }

    draw() {
        const bodyMaterial = new THREE.MeshStandardMaterial({
            color: 0xC40066,
            roughness: 1,
            flatShading: true
        });

        const wingMaterial = new THREE.MeshStandardMaterial({
            color: 0xEDF0F8,
            roughness: 1,
            flatShading: true
        });

        const body1 = this.drawCylinder(0.8, 1, 0.8, 8, bodyMaterial);
        body1.rotation.x = body1.rotation.z = this.deg(90);
        body1.position.x = -1.4;
        this.group.add(body1);

        const body2 = this.drawCylinder(1, 1, 1.6, 8, bodyMaterial);
        body2.rotation.x = body2.rotation.z = this.deg(90);
        body2.position.x = -0.2;
        this.group.add(body2);

        const body3 = this.drawCylinder(1, 0.7, 0.8, 8, bodyMaterial);
        body3.rotation.x = body3.rotation.z = this.deg(90);
        body3.position.x = 1;
        this.group.add(body3);

        const nose = this.drawCylinder(0.2, 0.8, 0.46, 8, wingMaterial);
        nose.rotation.x = nose.rotation.z = this.deg(90);
        nose.position.x = -2;
        this.group.add(nose);

        const wing1 = this.drawBox(0.5, 1, 0.2, wingMaterial);
        wing1.position.set(1.1, 0.7, 0);
        this.group.add(wing1);

        const wing2 = wing1.clone();
        wing2.position.y = -wing1.position.y;
        this.group.add(wing2);

        const wing3 = wing1.clone();
        wing3.rotation.x = this.deg(90);
        wing3.position.set(1.1, 0.1, 0.7);
        this.group.add(wing3);

        const wing4 = wing3.clone();
        wing4.position.z = -wing3.position.z;
        this.group.add(wing4);
    }

    fly(speed) {
        this.vAngle += speed;
        this.group.position.y = Math.sin(this.vAngle) * 0.5 + 4.5;
    }

    drawCylinder(rTop, rBottom, height, rSeg, material) {
        const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBottom, height, rSeg), material)
        cylinder.castShadow = true;
        cylinder.receiveShadow = true;
        return cylinder;
    }

    drawBox(w, h, d, material) {
        const box = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material)
        box.castShadow = true;
        box.receiveShadow = true;
        return box;
    }

    deg(degrees) {
        return degrees * (Math.PI / 180);
    }
}

class Bus {
    constructor(color) {
        this.group = new THREE.Group();

        this.bodyColor = color;

        this.draw();
    }

    draw() {
        const bodyMaterial = new THREE.MeshStandardMaterial({
            color: this.bodyColor,
            roughness: 1,
            flatShading: true
        });
        const windowMaterial = new THREE.MeshStandardMaterial({
            color: 0xEDF0F8,
            roughness: 1,
            flatShading: true
        });

        const body = this.drawBox(1.2, 0.4, 0.5, bodyMaterial);
        this.group.add(body);

        const hood = this.drawBox(0.15, 0.13, 0.5, bodyMaterial);
        hood.position.set(-0.6, -0.135, 0);
        this.group.add(hood);

        const window = this.drawBox(0.2, 0.15, 0.6, windowMaterial);
        const frontWindow = window.clone();
        frontWindow.position.set(-0.5, 0, 0);
        frontWindow.scale.x = 1.1;
        this.group.add(frontWindow);

        for(let i = 0; i < 3; i++) {
            const windowClone = window.clone();
            windowClone.position.x = -0.2 + i * 0.3;
            this.group.add(windowClone);
        }

        const wheel1 = this.drawBox(0.15, 0.15, 0.15, windowMaterial);
        wheel1.position.set(-0.35, -0.25, 0.15);
        this.group.add(wheel1);

        const wheel2 = wheel1.clone();
        wheel2.position.z = -wheel1.position.z;
        this.group.add(wheel2);

        const wheel3 = wheel1.clone();
        wheel3.position.x = -wheel1.position.x;
        this.group.add(wheel3);

        const wheel4 = wheel3.clone();
        wheel4.position.z = -wheel3.position.z;
        this.group.add(wheel4);
    }

    move(speed) {
        this.group.origX += speed;
        this.group.position.x += speed;

        if(this.group.position.x > 40) {
            this.group.origX = -40;
            this.group.position.x = -40;
        }
    }

    moveOut(pos) {
        const dx = (this.group.origX - pos.x),
              dy = (this.group.origY - pos.y),
              dz = (this.group.origZ - pos.z);
        const dist = dz;

        if(dist < 1.2) {
            const len = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if(len == 0) return;
            const ndx = dx / len,
                  ndz = dz / len;
            this.group.position.x = this.group.origX + ndx * 1.3;
            this.group.position.z = this.group.origZ + ndz * 1.3;
        } else {
            this.group.position.x = this.group.origX;
            this.group.position.y = this.group.origY;
            this.group.position.z = this.group.origZ;
        }
    }

    drawBox(w, h, d, material) {
        const box = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material)
        box.castShadow = true;
        box.receiveShadow = true;
        return box;
    }
}

init();
animate();

const worldMusic = document.querySelector('.world-music');
const btnMusic = document.querySelector('.toggle-music');
let playMusic = false;
btnMusic.addEventListener('click', () => {
    playMusic = !playMusic;
    btnMusic.classList.toggle('music-off');
    playMusic ? worldMusic.play() : worldMusic.pause();
});
worldMusic.volume = 0.3;
worldMusic.loop = true;