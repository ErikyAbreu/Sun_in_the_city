import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let vel = 0.0;
let velocidadeAngular = 0.0;
let acel = 0.0;
let rumo = 0.0;
let l = 350;
var nave;
var robo;
var robo2;
var robo3;
var roboDog;


const light = new THREE.AmbientLight( 0xFFFFFF, 2 );
scene.add( light );

//CRIAÇÃO DO CENÁRIO
let materialArray = [];
let texture_ft = new THREE.TextureLoader().load('skybox/space_ft.png');
let texture_bk = new THREE.TextureLoader().load('skybox/space_bk.png');
let texture_up = new THREE.TextureLoader().load('skybox/space_up.png');
let texture_dn = new THREE.TextureLoader().load('skybox/space_dn.png');
let texture_rt = new THREE.TextureLoader().load('skybox/space_rt.png'); 
let texture_lf = new THREE.TextureLoader().load('skybox/space_lf.png');

materialArray.push(new THREE.MeshBasicMaterial({map: texture_ft})); 
materialArray.push(new THREE.MeshBasicMaterial({map: texture_bk})); 
materialArray.push (new THREE.MeshBasicMaterial({map: texture_up})); 
materialArray.push(new THREE.MeshBasicMaterial({map: texture_dn})); 
materialArray.push (new THREE.MeshBasicMaterial ({map: texture_rt})); 
materialArray.push(new THREE.MeshBasicMaterial ({map: texture_lf}));

for(let i= 0; i<6; i++){
  materialArray[i].side=THREE.BackSide;
}

let skyboxGeo = new THREE.BoxGeometry(700, 500, 700);
let skybox = new THREE.Mesh(skyboxGeo, materialArray);
skybox.position.y = 20;
scene.add(skybox);

//CRIAÇÃO DAS ESTRELAS
const points = [];
const points2 = [];
const points3 = [];
let n = 10;
let m = 10;

let escala = 150.0;

//ESFERA
for (let i = 0; i < n; i++){
    for(let j = 0; j < n; j++){
        let s = i / n;
        let t = j / (m - 1.0);

        let theta = 2.0*Math.PI*s;
        let y = 2.0 * t - 1.0;
        let r = (Math.sqrt(1.0 - y * y));
        let x = r * Math.cos(theta);
        let z = r * Math.sin(theta);

        x *= escala;
        y *= escala;
        z *= escala;

        points.push( new THREE.Vector3(x - 1, y, z));
        points2.push( new THREE.Vector3(x + 1, y, z + 1));
        points3.push( new THREE.Vector3(x, y + 1, z - 1));
    }
}/**/

/*const geometry0 = new THREE.BoxGeometry(1500, 800, 500);
const material0 = new THREE.MeshBasicMaterial( { color: 0x00ff00} );
const cube = new THREE.Mesh(geometry0, material0);
scene.add(cube);
cube.position.set(0, 0, -250);*/

const geometryStar = new THREE.SphereGeometry( 0.25, 32, 16 ); 
const materialStar = new THREE.MeshBasicMaterial( { color: 0xFFFFFF } ); 

for (let i = 0; i < 600; i++) {
    const sphere = new THREE.Mesh( geometryStar, materialStar );
    const k = Math.random();
    if(i < 200){
        sphere.position.set((375 * Math.random()) - 187.5, 37.5 + (62.5 * Math.random()), (375 * Math.random()) - 187.5);
    } else if(i <= 400){
        sphere.position.set((375 * Math.random()) - 187.5, -37.5 - (62.5 * Math.random()), (375 * Math.random()) - 187.5);
    }else if(i <= 500){
        sphere.position.set(87.5 + (100 * Math.random()), (75 * Math.random()) - 37.5, (375 * Math.random()) - 187.5);
    }else if(i <= 600){
        sphere.position.set(- 87.5 - (100 * Math.random()), (75 * Math.random()) - 37.5, (375 * Math.random()) - 187.5);
    }else{
        sphere.position.set(- 87.5 - (100 * Math.random()), 75, (375 * Math.random()) - 187.5);
    }
    scene.add(sphere);
}

const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE. PointsMaterial({ color: 0xFFFFFF, size: 1});
const cloud = new THREE.Points(geometry, material);
scene.add(cloud);

const geometry2 = new THREE.BufferGeometry().setFromPoints(points2);
const cloud2 = new THREE.Points(geometry2, material);
scene.add(cloud2);

const geometry3 = new THREE.BufferGeometry().setFromPoints(points3);
const cloud3 = new THREE.Points(geometry3, material);
scene.add(cloud3);

camera.position.z = 50;

const loader = new GLTFLoader();

/*loader.load(    'modelos/robot_dog.glb',
                function ( gltf ) {
                    roboDog = gltf.scene;
                    roboDog.position.set(-10, -15, 55);
                    roboDog.scale.set(2, 2, 2);
                    roboDog.rotation.y = 1.8; 
                    scene.add( gltf.scene );
                },
                undefined,
                function ( error ) {
                    console.error( error );
                }
);*/

loader.load(    'modelos/medium_-_cute_robo-drone.glb',
                function ( gltf ) {
                    robo3 = gltf.scene;
                    robo3.position.set(-50, 0, -25);
                    robo3.scale.set(10, 10, 10);
                    robo3.rotation.y = 1; 
                    scene.add( gltf.scene );
                },
                undefined,
                function ( error ) {
                    console.error( error );
                }
);

loader.load(    'modelos/futuristic_flying_animated_robot_-_low_poly.glb',
                function ( gltf ) {
                    robo2 = gltf.scene;
                    robo2.position.set(10, -12, 0);
                    robo2.scale.set(18, 18, 18);
                    robo2.rotation.y = -0.8; 
                    scene.add( gltf.scene );
                },
                undefined,
                function ( error ) {
                    console.error( error );
                }
);

loader.load(    'modelos/coot_the_robot.glb',
                function ( gltf ) {
                    robo = gltf.scene;
                    robo.position.set(-10, 0, 0);
                    robo.scale.set(12, 12, 12);
                    robo.rotation.y = 0.8; 
                    scene.add( gltf.scene );
                },
                undefined,
                function ( error ) {
                    console.error( error );
                }
);

loader.load(    'modelos/space_zoo.glb',
                function ( gltf ) {
                    nave = gltf.scene;
                    nave.position.set(-106.25, -17.5, 325);
                    nave.scale.set(0.25, 0.25, 0.25);
                    scene.add( gltf.scene );
                },
                undefined,
                function ( error ) {
                    console.error( error );
                }
);

const animate = function() {
    requestAnimationFrame( animate );

    //ROTAÇÃO DAS ESTRELAS
    geometry.rotateX(-0.0005);
    geometry2.rotateZ(-0.0005);
    geometry3.rotateZ(0.0005);

    camera.position.x += -vel * Math.sin(rumo);
    camera.position.z += -vel * Math.cos(rumo);
    rumo += velocidadeAngular;
    camera.rotation.y = rumo;

    
    if(camera.position.x >= (l / 2)){
        camera.position.x = camera.position.x - 2;
    }
    if(camera.position.x <= -(l / 2)){
        camera.position.x = camera.position.x + 2;
    }
    if(camera.position.z >= (l / 2)){
        camera.position.z = camera.position.z - 2;
    }
    if(camera.position.z <= -(l / 2)){
        camera.position.z = camera.position.z + 2;
    }
    if(camera.position.y >= (l / 2)){
        camera.position.y = camera.position.y - 2;
    }
    if(camera.position.x >= (l / 2) + 100 || 
        camera.position.x <= -(l / 2) - 100 || 
        camera.position.z >= (l / 2) + 100 || 
        camera.position.z <= -(l / 2) - 100){
            camera.position.set(0, 0, 100);
        }

    renderer.render(scene, camera);

    document.onkeydown = function(e) {
        console.log(e);
    
        if(e.key == "ArrowUp") {
            vel = vel + acel;
            acel = acel + 0.001;
        }
    
        if(e.key == "ArrowDown") {
            vel = vel + acel;
            acel = acel - 0.001;
        }
    
        if(e.key == "ArrowLeft") {
            velocidadeAngular = 0.05;
        }
    
        if(e.key == "ArrowRight") {
            velocidadeAngular = -0.05;
        }
    
    }
    
    document.onkeyup = function(e) {
        console.log(e);
    
        if(e.key == "ArrowUp") {
            vel = 0.0;
            acel = 0.0;
        }
    
        if(e.key == "ArrowDown") {
            vel = 0.0;
            acel = 0.0;
        }
    
        if(e.key == "ArrowLeft") {
            velocidadeAngular = 0.0;
        }
    
        if(e.key == "ArrowRight") {
            velocidadeAngular = 0.0;
        }
    };
}
animate();
