import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera= new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 100 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 25;

// 创建球体
const geometry = new THREE.SphereGeometry(2);
const material = new THREE.MeshBasicMaterial({
  color: "rgb(100,123,205)",
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.name="球体";
scene.add(mesh);

// 创建陀螺
const material1 = new THREE.MeshBasicMaterial({
  color: "rgb(100,123,205)",
  side: THREE.DoubleSide,
});
const geometry1 = new THREE.SphereGeometry(2, 20, 2);
const mesh1 = new THREE.Mesh(geometry1, material1);
mesh1.name="陀螺";
scene.add(mesh1);
mesh1.position.set(5, 0, 0);

//
const material2 = new THREE.MeshBasicMaterial({
  color: "rgb(100,123,205)",
  side: THREE.DoubleSide,
});
const geometry2 = new THREE.SphereGeometry(2, 2, 20);
const mesh2 = new THREE.Mesh(geometry2, material2);
scene.add(mesh2);
mesh2.position.set(0, 0, 5);

// 半球
const material3 = new THREE.MeshBasicMaterial({
  color: "rgb(100,123,205)",
  side: THREE.DoubleSide,
});
const geometry5 = new THREE.SphereGeometry(
  2,
  10,
  10,
  0,
  THREE.MathUtils.degToRad(180)
);
const mesh4 = new THREE.Mesh(geometry5, material3);
mesh4.name="半球";
scene.add(mesh4);
mesh4.position.set(-5, 0, 0);

//#region
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(); // 鼠标位置
let previousSelectedObject = null;
// 鼠标点击事件监听
window.addEventListener("click", mouseClick, false);
function mouseClick(event) {
  // 将鼠标坐标归一化
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);
  if (intersects.length > 0) {
    if (previousSelectedObject) {
      previousSelectedObject.material.color.set(previousSelectedObject.initialColor);
    }
    const selectedObject = intersects[0].object;
    selectedObject.initialColor = selectedObject.material.color.clone();
    selectedObject.material.color.set(0xffff00);
    previousSelectedObject = selectedObject;
  } else {
    if (previousSelectedObject) {
      previousSelectedObject.material.color.set(previousSelectedObject.initialColor);
    }
  }
}

//#endregion

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
