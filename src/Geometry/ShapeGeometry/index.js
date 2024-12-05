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
camera.position.z = 25;

//

const geometry = new THREE.ShapeGeometry();
const material = new THREE.MeshBasicMaterial({
  color: "rgb(100,123,205)",
  side: THREE.DoubleSide,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//
const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(1, 0);
shape.lineTo(1, 1);
shape.lineTo(0, 1);
shape.closePath();

const geometry2 = new THREE.ShapeGeometry(shape, 2);
const material1 = new THREE.MeshBasicMaterial({
  color: "rgb(100,123,205)",
  wireframe: true,
});
const mesh2 = new THREE.Mesh(geometry2, material1);
scene.add(mesh2);
mesh2.position.set(0, 0, 5);

// 底部开口
const geometry1 = new THREE.ShapeGeometry(shape, 10);
const mesh1 = new THREE.Mesh(geometry1, material);
scene.add(mesh1);
mesh1.position.set(5, 0, 0);

const material3 = new THREE.MeshBasicMaterial({
  color: "rgb(100,123,205)",
});
const geometry5 =new THREE.ShapeGeometry(shape, 100);
const mesh4 = new THREE.Mesh(geometry5, material3);
scene.add(mesh4);
mesh4.position.set(-5, 0, 0);

const geometry6 = new THREE.ShapeGeometry(shape, {
  curveSegments: 10,
  depth: 3,
  bevelThickness: 0.5,
  bevelSize: 0.8,
  bevelOffset: 1,
});
const mesh5 = new THREE.Mesh(geometry6, material);
scene.add(mesh5);
mesh5.position.set(0, 0, -5);

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
