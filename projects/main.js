import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

import { courageScene } from './scenes/courageScene.js';
import { bikiniScene } from './scenes/bikiniScene.js';
import { regularScene } from './scenes/regularScene.js';
import { gumballScene } from './scenes/gumballScene.js';

let scene, camera, renderer, currentAudio;
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();
let audioVolume = 0.5; // Default volume
let showFPS = false; // Default FPS display setting
let stats; // FPS Stats object
let mouseDown = false;

function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 5);

    scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    setupSidebarToggle();
    courageScene(scene); // Load initial scene
    setupSettings();
    setupMovementControls();
    setupMouseControls();

    animate();
}

function setupMovementControls() {
    document.addEventListener('keydown', (event) => {
        switch (event.code) {
            case 'KeyW': moveForward = true; break;
            case 'KeyS': moveBackward = true; break;
            case 'KeyA': moveLeft = true; break;
            case 'KeyD': moveRight = true; break;
        }
    });

    document.addEventListener('keyup', (event) => {
        switch (event.code) {
            case 'KeyW': moveForward = false; break;
            case 'KeyS': moveBackward = false; break;
            case 'KeyA': moveLeft = false; break;
            case 'KeyD': moveRight = false; break;
        }
    });
}

function setupMouseControls() {
    document.addEventListener('mousedown', () => { mouseDown = true; });
    document.addEventListener('mouseup', () => { mouseDown = false; });
    document.addEventListener('mousemove', (event) => {
        if (mouseDown) {
            const sensitivity = 0.002;
            camera.rotation.y -= event.movementX * sensitivity;
            camera.rotation.x -= event.movementY * sensitivity;
        }
    });
}

function animate() {
    requestAnimationFrame(animate);

    // Movement logic
    direction.z = Number(moveBackward) - Number(moveForward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize();

    velocity.z = direction.z * 0.1;
    velocity.x = direction.x * 0.1;

    camera.position.add(velocity);

    renderer.render(scene, camera);

    if (stats) stats.update(); // Update FPS counter
}

function setupSidebarToggle() {
    const sidebar = document.getElementById('sidebar');
    const menuButton = document.getElementById('menu-button');
    const sceneButtons = document.querySelectorAll('.scene-button');

    sceneButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const sceneName = event.target.getAttribute('data-scene');
            switch (sceneName) {
                case 'courage': switchScene(courageScene); break;
                case 'bikini': switchScene(bikiniScene); break;
                case 'regular': switchScene(regularScene); break;
                case 'gumball': switchScene(gumballScene); break;
            }
            sidebar.classList.add('hidden');
            menuButton.classList.remove('hidden');
        });
    });

    menuButton.addEventListener('click', () => {
        sidebar.classList.remove('hidden');
        menuButton.classList.add('hidden');
    });
}

function switchScene(newSceneFunction) {
    while (scene.children.length > 0) scene.remove(scene.children[0]);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);
    if (currentAudio) currentAudio.stop();
    newSceneFunction(scene);
}

function toggleFPSCounter(enable) {
    if (enable) {
        if (!stats) {
            stats = new Stats();
            stats.showPanel(0); // 0 = FPS panel

            // Position the FPS counter at the bottom-right corner
            stats.dom.style.position = 'fixed';
            stats.dom.style.bottom = '10px';
            stats.dom.style.right = '10px';
            stats.dom.style.zIndex = '999'; // Ensure it's below modal (modal z-index is 1000)
            stats.dom.style.pointerEvents = 'none'; // Prevent blocking clicks on other elements

            document.body.appendChild(stats.dom);
        }
    } else if (stats) {
        if (stats.dom && stats.dom.parentNode) stats.dom.parentNode.removeChild(stats.dom);
        stats = null;
    }
}

function setupSettings() {
    const settingsButton = document.getElementById('settings-button');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsButton = document.getElementById('close-settings');
    const volumeSlider = document.getElementById('music-volume');
    const fpsToggle = document.getElementById('fps-toggle');

    settingsButton.addEventListener('click', () => {
        settingsModal.classList.remove('hidden');
    });

    closeSettingsButton.addEventListener('click', () => {
        settingsModal.classList.add('hidden');
    });

    volumeSlider.addEventListener('input', (event) => {
        audioVolume = parseFloat(event.target.value);
        if (currentAudio) currentAudio.setVolume(audioVolume);
    });

    fpsToggle.addEventListener('change', (event) => {
    showFPS = event.target.checked;
    toggleFPSCounter(showFPS);
});

}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

init();
