import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 25;

// 添加环境光
const light = new THREE.AmbientLight(0xffffff); // 柔和的白光
scene.add(light);

// 创建平面
const geometry = new THREE.PlaneGeometry(10, 10);

const width = 512;
const height = 512;
const depth = 100;

const size = width * height;
const data = new Uint8Array( 4 * size * depth );

for ( let i = 0; i < depth; i ++ ) {
	const color = new THREE.Color( Math.random(), Math.random(), Math.random() );
	const r = Math.floor( color.r * 255 );
	const g = Math.floor( color.g * 255 );
	const b = Math.floor( color.b * 255 );

	for ( let j = 0; j < size; j ++ ) {
		const stride = ( i * size + j ) * 4;
		data[ stride ] = r;
		data[ stride + 1 ] = g;
		data[ stride + 2 ] = b;
		data[ stride + 3 ] = 255;
	}
}
const texture = new THREE.DataArrayTexture( data, width, height, depth );
texture.needsUpdate = true;

const material = new THREE.ShaderMaterial( {
  uniforms: {
    diffuse: { value: texture },
    depth: { value: 55 },
    size: { value: new THREE.Vector2( 10, 10 ) }
  },
  vertexShader: document.getElementById( 'vs' ).textContent.trim(),
  fragmentShader: document.getElementById( 'fs' ).textContent.trim(),
  glslVersion: THREE.GLSL3
} );
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

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
