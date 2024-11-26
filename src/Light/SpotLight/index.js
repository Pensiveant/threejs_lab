import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 11);

const renderer = new THREE.WebGLRenderer({
  antialias: true, // 抗锯齿
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 物体
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial()
);
plane.rotation.x = -Math.PI / 2;

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshStandardMaterial()
);
cube.position.set(0, 2, 0);

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial()
);
sphere.position.set(3, 2, 0);

const geometry = new THREE.ConeGeometry(1, 4, 6);
const material = new THREE.MeshStandardMaterial();
const cone = new THREE.Mesh(geometry, material);
cone.position.set(-3, 3, 0);

scene.add(plane, cube, sphere, cone);

// 控制器
const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true; // 开启阻尼惯性，默认值为0.05

// 渲染循环动画
function animate() {
  control.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

// 添加点光源
// 聚光光源
var spotLight = new THREE.SpotLight(0xff0000);
// 设置聚光光源位置
spotLight.position.set(0, 5, 0);
// 聚光灯光源指向网格模型mesh2
spotLight.target = cube;
// 设置聚光光源发散角度
spotLight.angle = Math.PI / 6
scene.add(spotLight);//光对象添加到scene场景中

const spotLightHelper = new THREE.SpotLightHelper(spotLight, 1);
scene.add(spotLightHelper);
