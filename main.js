import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//npm three install
//npm run dev

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera );

//torus
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 )
const material = new THREE.MeshMatcapMaterial( { color: 0x3200C6, wireframe: true } );
const torus = new THREE.Mesh( geometry, material );

//octahedron
const geometry2 = new THREE.OctahedronGeometry( 20, 0 )
const material2 = new THREE.MeshMatcapMaterial( { color: 0x00FF74 } );
const octahedron = new THREE.Mesh( geometry2, material2 );

// scene.add(torus)
// scene.add(octahedron)

octahedron.position.setX(-70)
octahedron.position.setY(-30)


const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20, 20, 20)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.15, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } )
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread ( 100 ));

  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('./img/space7.jpg');
scene.background = spaceTexture;


//Avatar

const rubyTexture = new THREE.TextureLoader().load('./img/profile_2.jpg');

const ruby = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial( { map: rubyTexture } )
);

// scene.add(ruby);

//earth

const earthTexture = new THREE.TextureLoader().load('./img/earth.jpeg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(7, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: earthTexture
    } )
);

scene.add(earth);

earth.position.z = -15;
earth.position.setX(-25);


//jupiter

const jupiterTexture = new THREE.TextureLoader().load('./img/jupiter.jpg');

const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: jupiterTexture
    } )
);

scene.add(jupiter);

jupiter.position.z = -55;
jupiter.position.setX(105);


//mars

const marsTexture = new THREE.TextureLoader().load('./img/mars.jpg');

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: marsTexture
    } )
);

scene.add(mars);

mars.position.z = -90;
mars.position.setX(80);


//mercury

const mercuryTexture = new THREE.TextureLoader().load('./img/mercury.jpg');

const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: mercuryTexture
    } )
);

scene.add(mercury);

mercury.position.z = -75;
mercury.position.setX(95);


//moon

const moonTexture = new THREE.TextureLoader().load('./img/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('./img/normal.jpg');


const moon = new THREE.Mesh(
  new THREE.SphereGeometry(8, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: moonTexture,
    normalMap: normalTexture
  } )
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);



function moveCamera() {

  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  earth.rotation.x += 0.08;
  earth.rotation.y += 0.09;
  earth.rotation.z += 0.07;

  jupiter.rotation.x += 0.05;
  jupiter.rotation.y += 0.075;
  jupiter.rotation.z += 0.05;

  mars.rotation.x += 0.05;
  mars.rotation.y += 0.075;
  mars.rotation.z += 0.05;

  mercury.rotation.x += 0.05;
  mercury.rotation.y += 0.075;
  mercury.rotation.z += 0.05;

  // ruby.rotation.y += 0.01;
  // ruby.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;


}

document.body.onscroll = moveCamera


function animate() {
  requestAnimationFrame( animate );

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  // octahedron.rotation.x += 0.02;
  // octahedron.rotation.y += 0.005;
  // octahedron.rotation.z += 0.02;

  moon.rotation.x += 0.01;
  moon.rotation.y += 0.005;
  moon.rotation.z += 0.01;

  earth.rotation.x += 0.01;
  earth.rotation.y += 0.005;
  earth.rotation.z += 0.01;

  jupiter.rotation.x += 0.01;
  jupiter.rotation.y += 0.005;
  jupiter.rotation.z += 0.01;

  mars.rotation.x += 0.01;
  mars.rotation.y += 0.005;
  mars.rotation.z += 0.01;

  mercury.rotation.x += 0.01;
  mercury.rotation.y += 0.005;
  mercury.rotation.z += 0.01;

  controls.update();

  renderer.render( scene, camera );
}

animate()