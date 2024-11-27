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

// 创建几何体
const points = [];
points.push(new THREE.Vector3(-5, 0, 1));
points.push(new THREE.Vector3(5, 0, 1));
points.push(new THREE.Vector3(5, 0, 5));
const geometry = new THREE.BufferGeometry().setFromPoints(points);

// 创建 LineBasicMaterial
const material = new THREE.LineBasicMaterial({
  color: 0xff0000, // 线条颜色
  linewidth: 1, // 线条宽度，由于大多数平台上WebGL渲染器的OpenGL核心配置文件的限制，无论设置值如何，线宽始终为1。
  linecap:'square', // ["round"]，线条端点的样式：'butt'|'round'|"square"
  linejoin:"bevel", // [ 'round']，线条连接处的样式：'miter'|'round'|"bevel"
});

// 创建线条
const line = new THREE.Line(geometry, material);
scene.add(line);


camera.position.y = 25;

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 动态渲染
function animation() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animation);
}
animation();


const gridHelper = new THREE.GridHelper(20, 20);
gridHelper.material.transparent = true; 
gridHelper.material.opacity = 0.5;
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);



