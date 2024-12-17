import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 25;

// 创建平面
const geometry = new THREE.PlaneGeometry(10, 10);

// 创建canvas
const canvas = document.createElement("canvas");
// document.body.appendChild(canvas);
canvas.width = 128;
canvas.height = 128;
const ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

var gnt = ctx.createLinearGradient(10, 10, canvas.width, 10);
gnt.addColorStop(0, "white");
gnt.addColorStop(1, "HotPink");
ctx.fillStyle = gnt;
ctx.fillRect(10, 10, canvas.width, 10);

const texture = new THREE.CanvasTexture(canvas);


const material = new THREE.MeshBasicMaterial({
  map: texture,
  // side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 动态渲染
function animation() {
  controls.update();
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
