import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

export function gumballScene(scene) {
    console.log('Gumball Scene Loaded');

    scene.background = new THREE.Color(0xfceab6);

    // Floor (hallway tiles)
    const floorGeometry = new THREE.PlaneGeometry(100, 100);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xd3d3d3 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Creating the lockers
    createLockers(scene, -25, 25, 0, 2.5, -5);
      addCharacterImages(scene);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.5, 50);
    pointLight.position.set(0, 10, 0);
    scene.add(pointLight);
}

// Function to create the row of lockers
function createLockers(scene, startX, endX, startY, lockerHeight, zPosition) {
    const lockerColor = 0x8B0000;
    const metalness = 0.8;
    const roughness = 0.3;

    for (let y = 0; y < 2; y++) {
        for (let x = startX; x <= endX; x += 2) {
            const lockerGeometry = new THREE.BoxGeometry(2, lockerHeight, 1);
            const lockerMaterial = new THREE.MeshStandardMaterial({
                color: lockerColor,
                metalness: metalness,
                roughness: roughness
            });
            const locker = new THREE.Mesh(lockerGeometry, lockerMaterial);
            locker.position.set(x, startY + y * lockerHeight, zPosition);
            scene.add(locker);

            createLockerDoor(scene, x, startY + y * lockerHeight, zPosition + 0.5);

            createLockerHandle(scene, x, startY + y * lockerHeight, zPosition + 0.55);
        }
    }
}

function createLockerDoor(scene, x, y, z) {
    const doorGeometry = new THREE.PlaneGeometry(1.8, 4.8);
    const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x6a0000 });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(x, y, z + 0.01);
    scene.add(door);
}

function createLockerHandle(scene, x, y, z) {
    const handleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.2, 16);
    const handleMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.rotation.z = Math.PI / 2;
    handle.position.set(x, y - 0.5, z);
    scene.add(handle);
}

// To add the pictures of the charaters
function addCharacterImages(scene) {
  const loader = new THREE.TextureLoader();

  // Load Gumball and Darwin Image
  loader.load('./images/gumball.png', (texture) => {
    const gumMaterial = new THREE.MeshBasicMaterial({
  map: texture,
  transparent: true,
});

    const gumGeometry = new THREE.PlaneGeometry(5, 3);
    const gumMesh = new THREE.Mesh(gumGeometry, gumMaterial);
    gumMesh.position.set(0, 1.25, -1); 
    scene.add(gumMesh);
  });
}
