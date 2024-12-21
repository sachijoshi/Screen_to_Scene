import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

import { courageScene } from './scenes/courageScene.js';
import { bikiniScene } from './scenes/bikiniScene.js';
import { regularScene } from './scenes/regularScene.js';
import { gumballScene } from './scenes/gumballScene.js';
import { spongebobHouseBoundingBox } from './scenes/bikiniScene.js';

let scene, camera, renderer;
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();
let showFPS = false;
let stats;
let mouseDown = false;

let audioVolume = 0.5
let currentAudio;
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

    startBackgroundMusic();
    animate();
}
function startBackgroundMusic() {
    currentAudio = new Audio('./audio/lofi.mp3');
    currentAudio.loop = true;
    currentAudio.volume = audioVolume;

    // Wait for user interaction before playing
    document.addEventListener('click', () => {
        if (currentAudio.paused) {
            currentAudio.play();
        }
    });
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

let collisionCooldown = false; // Used to prevent repeated triggers
let collisionDetected = false;
function animate() {
    requestAnimationFrame(animate);

    // Get the direction the camera is facing
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0; // Ignore vertical movement
    forward.normalize();

    // Get the right vector by using the cross product with the up vector
    const right = new THREE.Vector3();
    right.crossVectors(forward, camera.up).normalize();

    // Movement logic based on relative direction
    direction.set(0, 0, 0);

    if (moveForward) direction.add(forward);
    if (moveBackward) direction.sub(forward);
    if (moveLeft) direction.sub(right);
    if (moveRight) direction.add(right);

    direction.normalize();

    velocity.x = direction.x * 0.1;
    velocity.z = direction.z * 0.1;

    camera.position.add(velocity);

    renderer.render(scene, camera);

        // Detect collision with SpongeBob's house
        if (spongebobHouseBoundingBox) {
            const playerBox = new THREE.Box3().setFromCenterAndSize(
                camera.position,
                new THREE.Vector3(1, 2, 1) // Player's "hitbox"
            );

            if (playerBox.intersectsBox(spongebobHouseBoundingBox) && !collisionDetected) {
                collisionDetected = true;
                if (!collisionCooldown) {
                    collisionCooldown = true;
                    setTimeout(() => {
                        window.open('https://www.roblox.com/games/78130703432892/TV-Show-Obby', '_blank');
                        collisionCooldown = false;
                    }, 2000); // Cooldown to prevent multiple triggers
                }
            }

            if (!playerBox.intersectsBox(spongebobHouseBoundingBox)) {
                collisionDetected = false;
            }
        }

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
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    newSceneFunction(scene);
}

function toggleFPSCounter(enable) {
    if (enable) {
        if (!stats) {
            stats = new Stats();
            stats.showPanel(0); // 0 = FPS panel

            stats.dom.style.position = 'fixed';
            stats.dom.style.bottom = '10px';
            stats.dom.style.right = '10px';
            stats.dom.style.zIndex = '999';
            stats.dom.style.pointerEvents = 'none';

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
        if (currentAudio) currentAudio.volume = audioVolume;
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
