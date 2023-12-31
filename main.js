import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"; // Import DRACOLoader

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
renderer.setClearColor(0xffffff); // Set the background color to white

const controls = new OrbitControls(camera, renderer.domElement);


// Create an instance of DRACOLoader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
); // Set the path to the Draco decoder files

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader); // Set DRACOLoader for the GLTFLoader

let shoe;

loader.load("public/models/Shoe_compressed.glb", (gltf) => {
  gltf.scene.position.set(0, 0, 0);
  gltf.scene.rotation.y = 1;

  shoe = gltf.scene.children[0];
  console.log(shoe);

  shoe.traverse((child) => {
    if (child.isMesh) {
      if (child.name === "inside") {
        const colorPicker = document.getElementById("colorPickerInside");
        colorPicker.addEventListener("input", (event) => {
          const selectedColor = event.target.value;

          child.material.color.set(selectedColor);
        });
      }
      if (child.name === "laces") {
        const colorPicker = document.getElementById("colorPickerLaces");
        colorPicker.addEventListener("input", (event) => {
          const selectedColor = event.target.value;

          child.material.color.set(selectedColor);
        });
      }
      if (child.name === "outside_1") {
        const colorPicker = document.getElementById("colorPickerOutside_1");
        colorPicker.addEventListener("input", (event) => {
          const selectedColor = event.target.value;

          child.material.color.set(selectedColor);
        });
      }
      if (child.name === "outside_2") {
        const colorPicker = document.getElementById("colorPickerOutside_2");
        colorPicker.addEventListener("input", (event) => {
          const selectedColor = event.target.value;

          child.material.color.set(selectedColor);
        });
      }
      if (child.name === "outside_3") {
        const colorPicker = document.getElementById("colorPickerOutside_3");
        colorPicker.addEventListener("input", (event) => {
          const selectedColor = event.target.value;

          child.material.color.set(selectedColor);
        });
      }
      if (child.name === "sole_bottom") {
        const colorPicker = document.getElementById("colorPickerSole_bottom");
        colorPicker.addEventListener("input", (event) => {
          const selectedColor = event.target.value;

          child.material.color.set(selectedColor);
        });
      }
      if (child.name === "sole_top") {
        const colorPicker = document.getElementById("colorPickerSole_top");
        colorPicker.addEventListener("input", (event) => {
          const selectedColor = event.target.value;

          child.material.color.set(selectedColor);
        });
      }
    }
  });

  scene.add(gltf.scene);
});


const cubeTextureLoader = new THREE.CubeTextureLoader();
const environmentMapTexture = cubeTextureLoader.load([
  "/cubemap/px.png",
  "/cubemap/nx.png",
  "/cubemap/py.png",
  "/cubemap/ny.png",
  "/cubemap/pz.png",
  "/cubemap/nz.png",
]);
//add to background
scene.background = environmentMapTexture;

camera.position.z = 0.5;
camera.position.y = 0.2;
camera.lookAt(0, 0, -0.1);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime();

  // shoe.rotation.y += 0.005;

  renderer.render(scene, camera);
}

animate();
