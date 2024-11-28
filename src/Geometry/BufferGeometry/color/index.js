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
	0, 0,  0, // v0
  5, 0,  0, // v1
  0, 5, 0,  // v2
  0, 0, 5,  // v3
] );
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );


const color= new Float32Array( [
	1, 0,  0, // 
  0, 1,  0, // 
  0, 0,  1,  // 
  1, 1,  0,  // 
] );
geometry.setAttribute( 'color', new THREE.BufferAttribute( color, 3 ) );

// 
const material = new THREE.PointsMaterial({
  size: .5, // 点的大小
  vertexColors:true
});


// 创建点对象
const points = new THREE.Points(geometry, material);
scene.add(points);

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

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
