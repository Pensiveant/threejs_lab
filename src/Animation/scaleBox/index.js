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

// 创建box
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "rgb(100,123,205)",
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
camera.position.z = 25;

// 创建关键帧
const scaleKeyframe = new THREE.KeyframeTrack(
  ".scale",
  [0, 1, 2],
  [
    1,1,1, // 第一帧
    2,2,2, // 第二帧
    3,3,3, // 第三帧
  ]
);

// 创建动画剪辑
const moveClip=new THREE.AnimationClip("move",4,[scaleKeyframe]);

// 创建动画混合器
const mixer=new THREE.AnimationMixer(mesh);
const clipAction =  mixer.clipAction(moveClip);
clipAction.play();

let clock = new THREE.Clock()


// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 动态渲染
function animation() {
  controls.update();
  const delta = clock.getDelta();
  mixer.update(delta);
  renderer.render(scene, camera);
  requestAnimationFrame(animation);

}
animation();

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 创建网格辅助工具
const gridHelper = new THREE.GridHelper(20, 20, 0xffffff, 0xffffff);
gridHelper.material.transparent = true; // 为了更方便观察, 设置opacity透明度
gridHelper.material.opacity = 0.5;
scene.add(gridHelper);
