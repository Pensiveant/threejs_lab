import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

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

const state = {
  animateBones: false,
};

//
let segmentHeight = 6; //   每一节骨骼的高度
let segmentCount = 4; // 总节数
let height = segmentHeight * segmentCount; // 总高度
let halfHeight = height / 2;
let sizing = {
  segmentHeight,
  segmentCount,
  height,
  halfHeight,
};

let geometry = createGeometry(sizing);
let bones = createBones(sizing); // 创建骨骼
let mesh = createMesh(geometry, bones);
scene.add(mesh);

function createGeometry(sizing) {
  let geometry = new THREE.CylinderGeometry(
    5,
    5,
    sizing.height,
    8,
    sizing.segmentCount * 3,
    true
  );

  const position = geometry.attributes.position;
  const vertex = new THREE.Vector3();
  const skinIndices = [];
  const skinWeights = [];
  for (let i = 0; i < position.count; i++) {
    vertex.fromBufferAttribute(position, i);
    let y = vertex.y + sizing.halfHeight;

    const skinIndex = Math.floor(y / sizing.segmentHeight);
    const skinWeight = (y % sizing.segmentHeight) / sizing.segmentHeight;
    skinIndices.push(skinIndex, skinIndex + 1, 0, 0);
    skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
  }
  geometry.setAttribute(
    "skinIndex",
    new THREE.Uint16BufferAttribute(skinIndices, 4)
  );
  geometry.setAttribute(
    "skinWeight",
    new THREE.Float32BufferAttribute(skinWeights, 4)
  );

  return geometry;
}

function createBones(sizing) {
  let bones = [];
  let preBone = new THREE.Bone();
  bones.push(preBone);

  preBone.position.y = -sizing.halfHeight;

  for (let i = 0; i < sizing.segmentCount; i++) {
    let bone = new THREE.Bone();
    bone.position.y = sizing.segmentHeight;
    bones.push(bone);
    preBone.add(bone);
    preBone = bone;
  }

  return bones;
}

function createMesh(geometry, bones) {
  let material = new THREE.MeshPhongMaterial({
    skinning: true,
    color: 0x156289,
    emissive: 0x072534,
    side: THREE.DoubleSide,
    flatShading: true,
  });

  let mesh = new THREE.SkinnedMesh(geometry, material);
  let skeleton = new THREE.Skeleton(bones);
  const rootBone = skeleton.bones[0];
  mesh.add(rootBone);

  mesh.bind(skeleton);
  return mesh;
}

setupDatGui();

function setupDatGui() {
  let gui = new GUI();
  let folder = gui.addFolder("General Options");
  folder.add(state, "animateBones");
  folder.controllers[0].name("Animate Bones");

  folder.add(mesh, "pose");
  folder.controllers[1].name(".pose()");

  const bones = mesh.skeleton.bones;

  for (let i = 0; i < bones.length; i++) {
    const bone = bones[i];

    folder = gui.addFolder("Bone " + i);

    folder.add(bone.position, "x", -10 + bone.position.x, 10 + bone.position.x);
    folder.add(bone.position, "y", -10 + bone.position.y, 10 + bone.position.y);
    folder.add(bone.position, "z", -10 + bone.position.z, 10 + bone.position.z);

    folder.add(bone.rotation, "x", -Math.PI * 0.5, Math.PI * 0.5);
    folder.add(bone.rotation, "y", -Math.PI * 0.5, Math.PI * 0.5);
    folder.add(bone.rotation, "z", -Math.PI * 0.5, Math.PI * 0.5);

    folder.add(bone.scale, "x", 0, 2);
    folder.add(bone.scale, "y", 0, 2);
    folder.add(bone.scale, "z", 0, 2);

    folder.controllers[0].name("position.x");
    folder.controllers[1].name("position.y");
    folder.controllers[2].name("position.z");

    folder.controllers[3].name("rotation.x");
    folder.controllers[4].name("rotation.y");
    folder.controllers[5].name("rotation.z");

    folder.controllers[6].name("scale.x");
    folder.controllers[7].name("scale.y");
    folder.controllers[8].name("scale.z");
  }
}

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 动态渲染
function animation() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animation);

  const time = Date.now() * 0.001;

  //Wiggle the bones
  if (state.animateBones) {
    for (let i = 0; i < mesh.skeleton.bones.length; i++) {
      mesh.skeleton.bones[i].rotation.z =
        (Math.sin(time) * 2) / mesh.skeleton.bones.length;
    }
  }
}
animation();

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 创建网格辅助工具
const gridHelper = new THREE.GridHelper(20, 20, 0xffffff, 0xffffff);
gridHelper.material.transparent = true; // 为了更方便观察, 设置opacity透明度
gridHelper.material.opacity = 0.5;
scene.add(gridHelper);

let skeletonHelper = new THREE.SkeletonHelper(mesh);
skeletonHelper.material.linewidth = 2;
scene.add(skeletonHelper);
