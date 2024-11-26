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

// 创建网格辅助工具
// 第一个参数（size)：网格总的宽高，设置为20，对应X轴的坐标范围为（-10,10），默认值为10
// 第二个参数(divisions): 网格分成多少份, 设置为20, 每份就是1个单位, 默认值为10
// 第三个参数(colorCenterLine): 中线的颜色, 默认值为0x444444
// 第四个参数(colorGrid): 网络线的颜色, 默认值为0x888888
const gridHelper = new THREE.GridHelper(20, 20, 0xff0000, 0xffffff);
gridHelper.material.transparent = true; // 为了更方便观察, 设置opacity透明度
gridHelper.material.opacity = 0.5;
scene.add(gridHelper);
camera.position.z = 5;


const controls = new OrbitControls(camera, renderer.domElement);
function animation() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animation);
}
animation();
