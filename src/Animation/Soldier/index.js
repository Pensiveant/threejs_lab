// 顶点颜色
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

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

// 添加平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(0, 15, 0);
scene.add(directionalLight);

//
const loader = new GLTFLoader();
let mixer;
loader.load(
  "../model/Soldier.glb",
  function (gltf) {
    scene.add(gltf.scene);
    const animations = gltf.animations; // Array<THREE.AnimationClip>

    const model = gltf.scene;
    mixer = new THREE.AnimationMixer(model);
    mixer.clipAction(animations[1]).play();

    // gltf.scene; // THREE.Group
    // gltf.scenes; // Array<THREE.Group>
    // gltf.cameras; // Array<THREE.Camera>
    // gltf.asset; // Object
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.log("An error happened");
  }
);

camera.position.y = 25;

let clock = new THREE.Clock();
// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 动态渲染
function animation() {
  controls.update();
  renderer.render(scene, camera);
  const delta = clock.getDelta();
  if (mixer) {
    mixer.update(delta);
  }

  requestAnimationFrame(animation);
}
animation();

const gridHelper = new THREE.GridHelper(20, 20);
gridHelper.material.transparent = true;
gridHelper.material.opacity = 0.5;
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);