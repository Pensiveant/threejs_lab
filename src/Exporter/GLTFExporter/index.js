import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";
import * as TextureUtils from "three/addons/utils/WebGLTextureUtils.js";

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

// 创建box
const geometry = new THREE.BoxGeometry(5, 5, 5);
const material = new THREE.MeshBasicMaterial({
  color: "rgb(100,123,205)",
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
camera.position.z = 25;

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

//#region 导出gltf模型
const gltfExporter = new GLTFExporter().setTextureUtils(TextureUtils);
gltfExporter.parse(
  scene,
  function (result) {
    if (result instanceof ArrayBuffer) {
      saveArrayBuffer(result, "scene.glb");
    } else {
      const output = JSON.stringify(result, null, 2);
      saveString(output, "scene.gltf");
    }
  },
  function (error) {
    console.log("解析失败", error);
  },
  {
    trs: false, // 导出位置、旋转和缩放，而不是每个节点的矩阵。默认值为false
    onlyVisible: true, // 仅仅导出可见对象
    binary: false, // 以.glb的格式导出，默认为false
    maxTextureSize: Infinity, // 将图像的最大大小（宽度和高度）限制为给定值。默认值为Infinity
    includeCustomExtensions: false, // 在userData.gltfExtensions属性上导出自定义glTF扩展。默认为false
    animations: [], // 需要导出的动画
  }
);

function saveArrayBuffer(buffer, filename) {
  save(new Blob([buffer], { type: "application/octet-stream" }), filename);
}

function save(blob, filename) {
  const link = document.createElement("a");
  link.style.display = "none";
  document.body.appendChild(link);
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

function saveString(text, filename) {
  save(new Blob([text], { type: "text/plain" }), filename);
}
//#endregion
