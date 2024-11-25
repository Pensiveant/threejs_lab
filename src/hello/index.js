import * as THREE from 'three';

// 创建三个对象
const scene = new THREE.Scene(); // 创建一个scene实例
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

// 渲染scene
function animate() {
  requestAnimationFrame(animate); // window.requestAnimationFrame(),类似于window.setInterval(),循环渲染
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
