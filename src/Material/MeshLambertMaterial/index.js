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

// 添加环境光
const light = new THREE.AmbientLight(0xffffff); // 柔和的白光
scene.add(light);

const material = new THREE.MeshLambertMaterial({
  color: "rgb(100,123,205)",
});

// 透明度调整
const material1 = new THREE.MeshLambertMaterial({
  color: "rgb(100,123,205)",
  transparent: true,
  opacity: 0.7,
});

const materia2 = new THREE.MeshLambertMaterial({
  color: "rgb(100,123,205)",
  wireframe: true,
});

const texture = new THREE.TextureLoader().load("./img/wood.jpg");
const materia3 = new THREE.MeshLambertMaterial({
  map: texture,
  transparent: true
});

// 创建圆锥
const geometry = new THREE.ConeGeometry(2, 5, 20);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 4棱锥
const geometry2 = new THREE.ConeGeometry(2, 2, 4, 10);
const mesh2 = new THREE.Mesh(geometry2, material1);
scene.add(mesh2);
mesh2.position.set(0, 0, 5);

// 底部开口
const geometry1 = new THREE.ConeGeometry(2, 2, 20, 20, true);
const mesh1 = new THREE.Mesh(geometry1, materia2);
scene.add(mesh1);
mesh1.position.set(5, 0, 0);

const geometry5 = new THREE.ConeGeometry(
  2,
  2,
  20,
  20,
);
const mesh4 = new THREE.Mesh(geometry5, materia3);
scene.add(mesh4);
mesh4.position.set(-5, 0, 0);

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
