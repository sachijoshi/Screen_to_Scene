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

    // Setup sidebar toggle functionality
    setupSidebarToggle();

    // Load initial scene and start animation loop
    courageScene(scene);
    setupSettings();

    setupMovementControls();
    setupMouseControls();

    animate();
}


function setupMovementControls() {
    document.addEventListener('keydown', (event) => {
        switch (event.code) {
            case 'KeyS': moveForward = true; break;
            case 'KeyW': moveBackward = true; break;
            case 'KeyA': moveLeft = true; break;
            case 'KeyD': moveRight = true; break;
        }
    });

    document.addEventListener('keyup', (event) => {
        switch (event.code) {
            case 'KeyS': moveForward = false; break;
            case 'KeyW': moveBackward = false; break;
            case 'KeyA': moveLeft = false; break;
            case 'KeyD': moveRight = false; break;
        }
    });
}
let yaw = 0; // Horizontal rotation
let pitch = 0; // Vertical rotation

function setupMouseControls() {
    document.addEventListener('mousedown', () => {
        mouseDown = true;
    });

    document.addEventListener('mouseup', () => {
        mouseDown = false;
    });

    document.addEventListener('mousemove', (event) => {
        if (mouseDown) {
            const sensitivity = 0.002;
            yaw -= event.movementX * sensitivity; // Invert to rotate in correct direction
            pitch -= event.movementY * sensitivity;

            // Constrain pitch to avoid flipping
            pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));

            // Update camera rotation
            camera.rotation.set(pitch, yaw, 0);
        }
    });
}

function animate() {
    requestAnimationFrame(animate);

    const delta = 0.1; // Speed multiplier

    // Calculate movement direction relative to camera orientation
    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize();

    const moveDirection = new THREE.Vector3(direction.x, 0, direction.z);
    moveDirection.applyQuaternion(camera.quaternion); // Rotate direction by camera's quaternion

    velocity.z = moveDirection.z * delta * 5; // Adjust speed as needed
    velocity.x = moveDirection.x * delta * 5;

    camera.position.add(velocity); // Update camera position

    renderer.render(scene, camera);
}



function setupSidebarToggle() {
    const sidebar = document.getElementById('sidebar');
    const menuButton = document.getElementById('menu-button');
    const sceneButtons = document.querySelectorAll('.scene-button');

    // Function to attach event listeners to scene buttons
    function attachSceneButtonListeners() {
        sceneButtons.forEach((button) => {
            button.removeEventListener('click', handleSceneClick); // Avoid duplicate listeners
            button.addEventListener('click', handleSceneClick);
        });
    }

    // Handle scene button click: switch scene and hide sidebar
    function handleSceneClick(event) {
        const sceneName = event.target.getAttribute('data-scene');
        switch (sceneName) {
            case 'courage':
                switchScene(courageScene);
                break;
            case 'bikini':
                switchScene(bikiniScene);
                break;
            case 'regular':
                switchScene(regularScene);
                break;
            case 'gumball':
                switchScene(gumballScene);
                break;
            default:
                console.error('Scene not found:', sceneName);
        }

        // Hide sidebar and show menu button
        sidebar.classList.add('hidden');
        menuButton.classList.remove('hidden');
    }

    // Show sidebar and hide menu button
    menuButton.addEventListener('click', () => {
        sidebar.classList.remove('hidden');
        menuButton.classList.add('hidden');
        attachSceneButtonListeners(); // Re-attach listeners when sidebar is reopened
    });

    // Initial attachment of scene button listeners
    attachSceneButtonListeners();
}

function switchScene(newSceneFunction) {
    // Clear the current scene
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }

    // Re-add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Stop current audio if any
    if (currentAudio) currentAudio.stop();

    // Load the new scene
    newSceneFunction(scene);
}

function setupSettings() {
    const settingsButton = document.getElementById('settings-button');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsButton = document.getElementById('close-settings');
    const volumeSlider = document.getElementById('music-volume');
    const fpsToggle = document.getElementById('fps-toggle');

    // Open settings
    settingsButton.addEventListener('click', () => {
        settingsModal.classList.remove('hidden');
    });

    // Close settings
    closeSettingsButton.addEventListener('click', () => {
        settingsModal.classList.add('hidden');
    });

    // Adjust music volume
    volumeSlider.addEventListener('input', (event) => {
        audioVolume = parseFloat(event.target.value);
        if (currentAudio) currentAudio.setVolume(audioVolume);
    });

    // Toggle FPS Counter (if applicable)
    fpsToggle.addEventListener('change', (event) => {
        showFPS = event.target.checked;
        toggleFPSCounter(showFPS);
    });
}

function toggleFPSCounter(enable) {
    if (enable) {
        if (!stats) {
            import('https://cdn.jsdelivr.net/npm/stats.js').then((module) => {
                stats = new module.default();
                stats.showPanel(0); // 0 = FPS panel

                // Position the FPS counter at the bottom-right corner
                stats.dom.style.position = 'fixed';
                stats.dom.style.bottom = '10px';
                stats.dom.style.right = '10px';
                stats.dom.style.zIndex = '1000'; // Ensure it's above other elements

                document.body.appendChild(stats.dom);
                console.log('FPS counter enabled');
            }).catch((err) => {
                console.error('Failed to load stats.js:', err);
            });
        }
    } else if (stats) {
        // Remove the stats DOM element when disabling FPS counter
        if (stats.dom && stats.dom.parentNode) {
            stats.dom.parentNode.removeChild(stats.dom);
            console.log('FPS counter disabled');
        }
        stats = null;
    }
}



// Handle window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Initialize the application
init();
