import * as THREE from "three";
import { FirstPersonControls } from "three/addons/controls/FirstPersonControls.js";

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
camera.position.set(0, 1, 0); // 设置相机初始位置

const geometry = new THREE.PlaneGeometry(10, 10);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const ground = new THREE.Mesh(geometry, material);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// 创建轨道控制器
const controls = new FirstPersonControls(camera, renderer.domElement);
controls.movementSpeed = 10; // 移动速度
controls.lookSpeed = 0.005; // 视角旋转速度
controls.autoForward = false; // 关闭自动前进

// 键盘事件监听
document.addEventListener("keydown", function (event) {
  switch (event.code) {
    case "ArrowUp":
    case "KeyW":
      firstPersonControls.moveForward = true;
      break;
    case "ArrowDown":
    case "KeyS":
      firstPersonControls.moveBackward = true;
      break;
    case "ArrowLeft":
    case "KeyA":
      firstPersonControls.moveLeft = true;
      break;
    case "ArrowRight":
    case "KeyD":
      firstPersonControls.moveRight = true;
      break;
  }
});

document.addEventListener("keyup", function (event) {
  switch (event.code) {
    case "ArrowUp":
    case "KeyW":
      firstPersonControls.moveForward = false;
      break;
    case "ArrowDown":
    case "KeyS":
      firstPersonControls.moveBackward = false;
      break;
    case "ArrowLeft":
    case "KeyA":
      firstPersonControls.moveLeft = false;
      break;
    case "ArrowRight":
    case "KeyD":
      firstPersonControls.moveRight = false;
      break;
  }
});
const clock = new THREE.Clock();
// 动态渲染
function animation() {
  requestAnimationFrame(animation);
  controls.update( clock.getDelta() );
  renderer.render(scene, camera);
}
animation();

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 创建网格辅助工具
const gridHelper = new THREE.GridHelper(20, 20, 0xffffff, 0xffffff);
gridHelper.material.transparent = true; // 为了更方便观察, 设置opacity透明度
gridHelper.material.opacity = 0.5;
scene.add(gridHelper);
