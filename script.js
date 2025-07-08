// ==========================
// Galaxy Section Alerts
// ==========================
function showSectionAlert(sectionName) {
  const alert = document.createElement("div");
  alert.className = "section-alert";
  alert.innerText = sectionName;
  document.body.appendChild(alert);
  setTimeout(() => alert.remove(), 1500);
}

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const section = entry.target;
        const name = section.getAttribute("data-section-name");
        if (name) showSectionAlert(name);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll("section").forEach((section) => {
    const id = section.getAttribute("id");
    if (id === "glory-house") section.setAttribute("data-section-name", "GLORY HOUSE");
    if (id === "midway") section.setAttribute("data-section-name", "MIDWAY");
    if (id === "fables") section.setAttribute("data-section-name", "FABLES MODULE");
    if (id === "end") section.setAttribute("data-section-name", "DESIRED CHAOS");
    observer.observe(section);
  });
});

// ==========================
// Carousel Memory Card Flip
// ==========================
const cards = document.querySelectorAll('.memory-card');
let currentCardIndex = 0;

function showCard(index) {
  cards.forEach((card, i) => {
    card.style.transform = `rotateY(0deg) translateX(${(i - index) * 300}px)`;
    card.style.zIndex = i === index ? 2 : 1;
  });
}

cards.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});

document.getElementById("prev-btn").addEventListener("click", () => {
  currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
  showCard(currentCardIndex);
});

document.getElementById("next-btn").addEventListener("click", () => {
  currentCardIndex = (currentCardIndex + 1) % cards.length;
  showCard(currentCardIndex);
});

showCard(currentCardIndex);

// ==========================
// Login Unlock System
// ==========================
function unlockFables() {
  const key = document.getElementById("unlock-key").value.trim();
  const section = document.getElementById("fables");
  if (key === "PRINCESS-AURA") {
    section.innerHTML = `
      <h2 class="section-title">FABLES MODULE UNLOCKED</h2>
      <div id="memory-carousel"></div>
    `;
    showSectionAlert("ACCESS GRANTED");
  } else {
    alert("Wrong Key. Try Again.");
  }
}

// ==========================
// Audio Autoplay on Load
// ==========================
window.addEventListener("load", () => {
  const audio = new Audio("./assets/audio/perfect.mp3");
  audio.volume = 0.5;
  audio.play().catch(() => {});
});

// ==========================
// 3D Tunnel Background (Three.js)
// ==========================
import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('background-tunnel'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

let geometry = new THREE.TorusGeometry(10, 1, 16, 100);
let material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
let torus = new THREE.Mesh(geometry, material);
scene.add(torus);

camera.position.z = 30;

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
