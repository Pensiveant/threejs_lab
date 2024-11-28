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
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array( [
	1, 0,  0, // v0
  2, 0, 0, // v1
  2, 2, 0,  // v2
  0, 0, 1,  // 
  0, 0, 2, // 
  0, 2, 2, // 
] );
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );


// 创建材质
const material = new THREE.MeshBasicMaterial({
  color: 0xffff00, // 红色
  side: THREE.DoubleSide //两面可见
});

// 创建点对象
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

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

const axesHelper = new THREE.AxesHelper(.5);
scene.add(axesHelper);
