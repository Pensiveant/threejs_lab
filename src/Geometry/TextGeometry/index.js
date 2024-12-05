import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

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

const loader = new FontLoader();
loader.load("./DingTalk JinBuTi_Regular.json", function (font) {
  // 创建圆锥
  const geometry = new TextGeometry("hello", {
    font,
    size: 1,
    depth: .2,
  });
  const material = new THREE.MeshBasicMaterial({
    color: "rgb(100,123,205)",
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  //
  const geometry2 = new TextGeometry("你好",{
    font,
    size: 1,
    depth: .5,
    
  });
  const mesh2 = new THREE.Mesh(geometry2, material);
  scene.add(mesh2);
  mesh2.position.set(0, 0, 5);

  // 
  const geometry1 = new TextGeometry("2024",{
    font,
    size: 1,
    depth: .2,
  });
  const mesh1 = new THREE.Mesh(geometry1, material);
  scene.add(mesh1);
  mesh1.position.set(5, 0, 0);

  // 半圆柱
  const geometry5 = new TextGeometry("快乐",{
    font,
    size: 1,
    depth: 1,
    bevelThickness: .1,
		bevelSize: 1,
		bevelOffset: 0,
		bevelSegments: 1
  });
  const mesh4 = new THREE.Mesh(geometry5, material);
  scene.add(mesh4);
  mesh4.position.set(-5, 0, 0);
});

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
