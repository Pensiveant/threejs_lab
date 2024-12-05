import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { LineGeometry } from "three/addons/lines/LineGeometry.js";
import { Line2 } from "three/addons/lines/Line2.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { LineSegmentsGeometry } from "three/addons/lines/LineSegmentsGeometry.js";
import { LineSegments2 } from "three/addons/lines/LineSegments2.js";

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

// 创建Line2
const geometry = new LineGeometry();
geometry.setPositions(new Float32Array([0.0, 0.0, 0.0, 1.0, 1.0, 0.0]));

const material = new LineMaterial({
  color: "rgb(100,123,205)",
});
const mesh = new Line2(geometry, material);
scene.add(mesh);

// Line2:线宽调整
const geometry1 = new LineGeometry();
const material1 = new LineMaterial({
  color: "rgb(100,123,205)",
  linewidth: 3,
  dashed: true,
});
geometry1.setPositions(
  new Float32Array([0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 5.0, 0.0])
);

const mesh2 = new Line2(geometry1, material1);
scene.add(mesh2);
mesh2.position.set(0, 0, 5);

// LineSegments2
const geometry2 = new LineSegmentsGeometry();
geometry2.setPositions(
  new Float32Array([0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 5.0, 0.0, 1.0, 5.0, 2.0])
);
const material2 = new LineMaterial({
  color: "rgb(100,123,205)",
  linewidth: 3,
  dashed: true,
});
const mesh1 = new LineSegments2(geometry2, material2);
scene.add(mesh1);
mesh1.position.set(5, 0, 0);

// 半圆柱
const geometry3 = new LineGeometry();
geometry3.setPositions(
  new Float32Array([0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 5.0, 0.0, 1.0, 5.0, 2.0])
);
const mesh4 = new Line2(geometry3, material);
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
