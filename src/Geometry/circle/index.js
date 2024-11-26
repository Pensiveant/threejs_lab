import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 
const geometry = new THREE.CircleGeometry(10, 50);
const material = new THREE.MeshBasicMaterial({
  color: "rgb(220, 226, 241)",
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
camera.position.z = 25;

const controls = new OrbitControls(camera, renderer.domElement);
function animation() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animation);
}
animation();
