// 顶点颜色
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";

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


// 添加平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(0, 15, 0);
scene.add(directionalLight);

const mtlLoader = new MTLLoader();
mtlLoader.load("./model/trees9.mtl", function (materials) {
  materials.preload();

  console.log(materials)
  const loader = new OBJLoader();
  loader.setMaterials(materials);
  loader.load(
    // resource URL
    "./model/trees9.obj",
    function (object) {
      scene.add(object);
    },

    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },

    function (error) {
      console.log("An error happened");
    }
  );
});

camera.position.z = 50;

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
