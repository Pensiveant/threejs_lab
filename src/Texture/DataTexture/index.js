import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 25;

// 创建平面
const geometry = new THREE.PlaneGeometry(10, 10);

const width = 32; // 纹理宽度
const height = 32; // 纹理高度

const size = width * height; // 像素大小
const data = new Uint8Array(4 * size); // 像素在缓冲区中占用空间
const color = new THREE.Color(0xffffff);

const r = Math.floor(color.r * 255);
const g = Math.floor(color.g * 255);
const b = Math.floor(color.b * 255);

for (let i = 0; i < size; i++) {
  const stride = i * 4;
  data[stride] = r * Math.random();
  data[stride + 1] = g * Math.random();
  data[stride + 2] = b * Math.random();
  data[stride + 3] = 255;
}

const texture = new THREE.DataTexture(data, width, height);
texture.needsUpdate = true;

const material = new THREE.MeshBasicMaterial({
  map: texture,
  side: THREE.DoubleSide,
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
