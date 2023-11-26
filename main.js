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

const controls = new OrbitControls(camera, renderer.domElement);

// Create an instance of DRACOLoader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/"); // Set the path to the Draco decoder files

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader); // Set DRACOLoader for the GLTFLoader

let shoe;

loader.load("public/models/Shoe_compressed.glb", (gltf) => {
  gltf.scene.position.set(0, 0, 0);
  gltf.scene.rotation.y = 1;


  shoe = gltf.scene.children[0];
  console.log(shoe);

  // Add an event listener to the color picker
  const colorPicker = document.getElementById("colorPicker");
  colorPicker.addEventListener("input", (event) => {
  const selectedColor = event.target.value;
  

  shoe.traverse((child) => {
    if (child.isMesh) {
      if (child.name === "inside") {
        child.material.color.set(selectedColor);
      }
      if (child.name === "laces") {
        child.material.color.set("orange");
      }
      if (child.name === "outside_1") {
        child.material.color.set("yellow");
      }
      if (child.name === "outside_2") {
        child.material.color.set("purple");
      }
      if (child.name === "outside_3") {
        child.material.color.set("red");
      }
      if (child.name === "sole_bottom") {
        child.material.color.set("blue");
      }
      if (child.name === "sole_top") {
        child.material.color.set("brown");
      }
    }
  });
  });

  scene.add(gltf.scene);
});


camera.position.z = 0.3;
camera.position.y = 0.2;
camera.lookAt(0, 0, -0.1);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime();

  shoe.rotation.y += 0.005;

  renderer.render(scene, camera);
}

animate();
