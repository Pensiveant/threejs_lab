// 顶点颜色
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

// 创建点云几何体
const count = 100; // 点的数量
const positions = new Float32Array(count * 3); // 每个点有 x, y, z 三个坐标
for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10; // 随机分布的点
}

const geometry = new THREE.BufferGeometry();
const attribute = new THREE.Float32BufferAttribute(positions, 3);
geometry.setAttribute('position', attribute);

// 创建 PointsMaterial
const material = new THREE.PointsMaterial({
  size: 1, // 点的大小
  sizeAttenuation: true, // 启用大小衰减
  transparent: true, // 启用透明
  opacity: 0.5 // 透明度
});

// 创建顶点颜色数组
const colors = new Float32Array(count * 3); // 每个点有 r, g, b 三个颜色通道
for (let i = 0; i < count * 3; i++) {
  colors[i] = Math.random(); // 随机颜色
}

// 将颜色属性添加到几何体
const colorAttribute = new THREE.Float32BufferAttribute(colors, 3);
geometry.setAttribute('color', colorAttribute);

// 在 PointsMaterial 中启用顶点颜色
material.vertexColors = true;


// 创建点对象
const points = new THREE.Points(geometry, material);
scene.add(points);

camera.position.z = 25;

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 动态渲染
function animation() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animation);
}
animation();

