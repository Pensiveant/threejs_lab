import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// 创建三个对象
const scene = new THREE.Scene(); // 创建一个scene实例

const loader = new THREE.CubeTextureLoader();
loader.setPath( './img/' );
const textureCube = loader.load( [
	'px.png', 'nx.png',
  'py.png', 'ny.png',
  'pz.png', 'nz.png',
] );
scene.background=textureCube;


const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
); // 创建一个camera实例，PerspectiveCamera(fov,aspect,near,far)
const renderer = new THREE.WebGLRenderer(); // 创建一个renderer实例
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 添加立方体
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 动态渲染
function animation() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animation);
}
animation();


// 6. 显示坐标轴(x轴: 红色; y轴: 绿色; z轴: 蓝色 rgb)
// x轴水平方向(右正); y轴垂直方向(上正); z轴垂直xy平面即屏幕(外正)
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 创建网格辅助工具
const gridHelper = new THREE.GridHelper(20, 20, 0xffffff, 0xffffff);
gridHelper.material.transparent = true; // 为了更方便观察, 设置opacity透明度
gridHelper.material.opacity = 0.5;
scene.add(gridHelper);