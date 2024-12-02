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

const material = new THREE.MeshStandardMaterial({
  color: "rgb(199,237,204)",
  side: THREE.DoubleSide,

});

const material1 = new THREE.MeshStandardMaterial({
  color: "rgb(199,237,204)",
  side: THREE.DoubleSide,
  wireframe: true,
});

const material2 = new THREE.MeshStandardMaterial({
  color:  0xffffff,
  metalness: .9, // 金属度
  roughness: 0.1, // 粗糙度
});

const texture = new THREE.TextureLoader().load("./img/wood.jpg");
const materia3 = new THREE.MeshStandardMaterial({
  map: texture,
});


// 创建球体
const geometry = new THREE.SphereGeometry(2);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 创建陀螺
const geometry1 = new THREE.SphereGeometry(2, 20, 2);
const mesh1 = new THREE.Mesh(geometry1, material1);
scene.add(mesh1);
mesh1.position.set(5, 0, 0);

//
const geometry2 = new THREE.SphereGeometry(2, 2, 20);
const mesh2 = new THREE.Mesh(geometry2, material2);
scene.add(mesh2);
mesh2.position.set(0, 0, 5);

// 半圆柱
const geometry5 = new THREE.SphereGeometry(
  2,
  10,
  10,
  0,
  THREE.MathUtils.degToRad(180)
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
