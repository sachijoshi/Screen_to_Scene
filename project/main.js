import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';
import { courageScene } from './scenes/courageScene.js';
import { bikiniScene } from './scenes/bikiniScene.js';
import { regularScene } from './scenes/regularScene.js';
import { gumballScene } from './scenes/gumballScene.js';

let scene, camera, renderer, currentAudio;
let audioVolume = 0.5; // Default volume
let showFPS = false; // Default FPS display setting
let stats; // FPS Stats object

// Initialize Three.js
function init() {
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Camera setup
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 1, 5);

    // Scene setup
    scene = new THREE.Scene();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Load the initial scene
    courageScene(scene);

    // Setup sidebar and settings
    setupSidebarButtons();
    setupSettings();

    // Start animation loop
    animate();
}

// Switch scene function
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

// Setup sidebar button click listeners
function setupSidebarButtons() {
    const buttons = document.querySelectorAll('.scene-button');

    buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
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
        });
    });
}

function setupSettings() {
    const settingsButton = document.getElementById('settings-button');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsButton = document.getElementById('close-settings');
    const volumeSlider = document.getElementById('music-volume');
    const fpsToggle = document.getElementById('fps-toggle');

    // Debugging logs to confirm element selection
    console.log('Settings button:', settingsButton);
    console.log('Settings modal:', settingsModal);
    console.log('Close settings button:', closeSettingsButton);
    
    // Ensure the modal starts hidden
    if (!settingsModal.classList.contains('hidden')) {
        settingsModal.classList.add('hidden');
    }

    // Open settings
    settingsButton.addEventListener('click', () => {
        console.log('Settings button clicked');
        if (settingsModal.classList.contains('hidden')) {
            settingsModal.classList.remove('hidden'); // Show the modal
            console.log('Settings modal opened');
        }
    });

    // Close settings
    closeSettingsButton.addEventListener('click', () => {
        console.log('Close button clicked');
        if (!settingsModal.classList.contains('hidden')) {
            settingsModal.classList.add('hidden'); // Hide the modal
            console.log('Settings modal closed');
        }
    });

    // Adjust music volume
    volumeSlider.addEventListener('input', (event) => {
        audioVolume = parseFloat(event.target.value);
        console.log('Music Volume:', audioVolume);
        if (currentAudio) currentAudio.setVolume(audioVolume);
    });

    // Toggle FPS Counter
    fpsToggle.addEventListener('change', (event) => {
        showFPS = event.target.checked;
        toggleFPSCounter(showFPS);
    });
}



// Toggle FPS Counter
function toggleFPSCounter(enable) {
    if (enable) {
        if (!stats) {
            import('https://cdn.jsdelivr.net/npm/stats.js').then((module) => {
                stats = new module.default();
                stats.showPanel(0);
                document.body.appendChild(stats.dom);
            });
        }
    } else if (stats) {
        document.body.removeChild(stats.dom);
        stats = null;
    }
}

// Animation Loop with FPS Tracking
function animate() {
    if (stats) stats.begin(); // Start FPS tracking
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    if (stats) stats.end(); // End FPS tracking
}

// Handle window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Initialize the application
init();
