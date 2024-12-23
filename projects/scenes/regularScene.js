import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

export function regularScene(scene) {
    console.log('Regular Show Scene Loaded');

    scene.background = new THREE.Color(0xceeef5);


    // Grassy ground
    const grassGeometry = new THREE.PlaneGeometry(100, 100);
    const grassMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
    const grass = new THREE.Mesh(grassGeometry, grassMaterial);
    grass.rotation.x = -Math.PI / 2;
    scene.add(grass);

    // Adding trees
    createTrees(scene);

    // Adding a bench
    createBench(scene);

    // Add Regular Show House
    createRegularShowHouse(scene);
    addCharacterImages(scene);

    // Add warm sunlight
    const sunlight = new THREE.DirectionalLight(0xffe4b5, 1);
    sunlight.position.set(10, 10, 10);
    scene.add(sunlight);
}

// Creating the trees
function createTrees(scene) {
    const treePositions = [
        { x: -15, z: -12 },
        { x: -20, z: -12 },
        {x:-10, z: -12},
        {x: 25, z:-12},
        { x: 15, z: -12 },
        { x: 20, z: -12 }
    ];

    treePositions.forEach((position) => {
        // Tree trunk
        const trunkGeometry = new THREE.CylinderGeometry(1, 1, 7, 20);
        const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.set(position.x, 3.5, position.z);
        scene.add(trunk);

        // Tree leaves
        const leavesGeometry = new THREE.SphereGeometry(3, 20, 20);
        const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
        const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
        leaves.position.set(position.x, 8, position.z);
        scene.add(leaves);
    });
}

// Adding the bench
function createBench(scene) {
    const benchGeometry = new THREE.BoxGeometry(5, 1, 2);
    const benchMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 });
    const bench = new THREE.Mesh(benchGeometry, benchMaterial);
    bench.position.set(0, 0.5, -10);
    scene.add(bench);
}

// Helper Function: Regular Show House
function createRegularShowHouse(scene) {
    const houseXPosition = 0;
    const houseZPosition = -10;

    // House
    const houseGeometry = new THREE.BoxGeometry(12, 6, 10);
    const houseMaterial = new THREE.MeshStandardMaterial({ color: 0x9cf7e0 });
    const house = new THREE.Mesh(houseGeometry, houseMaterial);
    house.position.set(houseXPosition, 3, houseZPosition);
    scene.add(house);

    // Roof
    const roofGeometry = new THREE.ConeGeometry(10, 4, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x6b6e6d });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.rotation.y = Math.PI / 4;
    roof.position.set(houseXPosition, 7.5, houseZPosition);
    scene.add(roof);

    // Porch
    const porchGeometry = new THREE.BoxGeometry(12, 0.5, 5);
    const porchMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const porch = new THREE.Mesh(porchGeometry, porchMaterial);
    porch.position.set(houseXPosition, 0.25, houseZPosition + 6);
    scene.add(porch);

    // Garage
    createGarage(scene, houseXPosition + 8, houseZPosition + 2);

    // Door
    const doorGeometry = new THREE.BoxGeometry(1.5, 2.5, 0.1);
    const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x6b6e6d });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(houseXPosition, 1.5, houseZPosition + 5);
    scene.add(door);

    // Windows
    createWindows(scene, houseXPosition, houseZPosition);
}

// Creating the Garage
function createGarage(scene, garageXPosition, garageZPosition) {
    const garageGeometry = new THREE.BoxGeometry(8, 5, 6);
    const garageMaterial = new THREE.MeshStandardMaterial({ color: 0x8edeca });
    const garage = new THREE.Mesh(garageGeometry, garageMaterial);
    garage.position.set(garageXPosition, 2.5, garageZPosition);
    scene.add(garage);

    const garageDoorGeometry = new THREE.BoxGeometry(6, 3, 0.1);
    const garageDoorMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const garageDoor = new THREE.Mesh(garageDoorGeometry, garageDoorMaterial);
    garageDoor.position.set(garageXPosition, 2, garageZPosition + 3);
    scene.add(garageDoor);
}

// Adding the Windows
function createWindows(scene, houseXPosition, houseZPosition) {
    const windowGeometry = new THREE.BoxGeometry(2, 2, 0.1);
    const windowMaterial = new THREE.MeshStandardMaterial({ color: 0x87ceeb }); // Light blue

    const frontWallZPosition = houseZPosition + 5;

    const leftWindow = new THREE.Mesh(windowGeometry, windowMaterial);
    leftWindow.position.set(houseXPosition - 3, 4, frontWallZPosition); // Properly positioned on the front wall
    scene.add(leftWindow);

    const rightWindow = new THREE.Mesh(windowGeometry, windowMaterial);
    rightWindow.position.set(houseXPosition + 3, 4, frontWallZPosition); // Properly positioned on the front wall
    scene.add(rightWindow);
}

function addCharacterImages(scene) {
  const loader = new THREE.TextureLoader();

  loader.load('./images/regshow.png', (texture) => {
    const charMaterial = new THREE.MeshBasicMaterial({
  map: texture,
  transparent: true,
});

    const charGeometry = new THREE.PlaneGeometry(5, 5);
    const charMesh = new THREE.Mesh(charGeometry, charMaterial);
    charMesh.position.set(0, 2.27, -1);
    scene.add(charMesh);
  });
}
