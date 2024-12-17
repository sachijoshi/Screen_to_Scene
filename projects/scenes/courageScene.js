import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

export function courageScene(scene) {
  scene.background = new THREE.Color(0x63056e); // Spooky purple background

  // Desert plane
  const desertGeometry = new THREE.PlaneGeometry(100, 100);
  const desertMaterial = new THREE.MeshStandardMaterial({ color: 0xffd580 });
  const desert = new THREE.Mesh(desertGeometry, desertMaterial);
  desert.rotation.x = -Math.PI / 2;
  scene.add(desert);

  // Courage's house
  createCourageHouse(scene);
  addCharacterImages(scene);


  // Add a simple ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  // Add directional light for shadows
  const directionalLight = new THREE.DirectionalLight(0xffe4b5, 1);
  directionalLight.position.set(10, 10, 10);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

}

function createCourageHouse(scene) {
  // Main house body
  const houseBodyGeometry = new THREE.BoxGeometry(6.25, 5, 6);
  const houseBodyMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
  const houseBody = new THREE.Mesh(houseBodyGeometry, houseBodyMaterial);
  houseBody.position.set(0, 2.5, -10); // Centered position
  scene.add(houseBody);

  // Roof
  const roofGeometry = new THREE.ConeGeometry(6.5, 4, 4);
  const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x4b3f2f });
  const roof = new THREE.Mesh(roofGeometry, roofMaterial);
  roof.rotation.y = Math.PI / 4; // Diamond shape
  roof.position.set(0, 6, -10);
  scene.add(roof);

  // Porch
  const porchGeometry = new THREE.BoxGeometry(8, 0.2, 3);
  const porchMaterial = new THREE.MeshStandardMaterial({ color: 0xdeb887 });
  const porch = new THREE.Mesh(porchGeometry, porchMaterial);
  porch.position.set(0, 0.1, -8);
  scene.add(porch);

  // Porch supports
  const columnGeometry = new THREE.CylinderGeometry(0.2, 0.2, 5, 20);
  const columnMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const leftColumn = new THREE.Mesh(columnGeometry, columnMaterial);
  leftColumn.position.set(-3, 1.5, -7);
  scene.add(leftColumn);

  const rightColumn = new THREE.Mesh(columnGeometry, columnMaterial);
  rightColumn.position.set(3, 1.5, -7);
  scene.add(rightColumn);

  // Door
  createDoor(scene, 0, 1.5, -7);

  // Windows
  createWindows(scene, 0, 3.5, -7); // Adjust z-position closer to the house
}

// Helper Function: Door
function createDoor(scene, x, y, z) {
  const doorGeometry = new THREE.BoxGeometry(1.5, 3, 0.1);
  const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x6b4226 });
  const door = new THREE.Mesh(doorGeometry, doorMaterial);
  door.position.set(x, y, z);
  scene.add(door);

  // Door Knob
  const knobGeometry = new THREE.SphereGeometry(0.1, 16, 16);
  const knobMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
  const knob = new THREE.Mesh(knobGeometry, knobMaterial);
  knob.position.set(x + 0.6, y, z + 0.05);
  scene.add(knob);
}

// Helper Function: Windows
function createWindows(scene, houseXPosition, houseYPosition, houseZPosition) {
  const windowGeometry = new THREE.BoxGeometry(1.5, 1.5, 0.1);
  const windowFrameMaterial = new THREE.MeshStandardMaterial({ color: 0x2e1a10 }); // Frame color
  const glassMaterial = new THREE.MeshStandardMaterial({ color: 0x87ceeb, transparent: true, opacity: 0.6 });

  // Left Window
  const leftFrame = new THREE.Mesh(windowGeometry, windowFrameMaterial);
  leftFrame.position.set(houseXPosition - 2, houseYPosition, houseZPosition);
  scene.add(leftFrame);

  const leftGlass = new THREE.Mesh(windowGeometry, glassMaterial);
  leftGlass.scale.set(0.8, 0.8, 1);
  leftGlass.position.set(houseXPosition - 2, houseYPosition, houseZPosition + 0.05);
  scene.add(leftGlass);

  // Right Window
  const rightFrame = new THREE.Mesh(windowGeometry, windowFrameMaterial);
  rightFrame.position.set(houseXPosition + 2, houseYPosition, houseZPosition);
  scene.add(rightFrame);

  const rightGlass = new THREE.Mesh(windowGeometry, glassMaterial);
  rightGlass.scale.set(0.8, 0.8, 1);
  rightGlass.position.set(houseXPosition + 2, houseYPosition, houseZPosition + 0.05);
  scene.add(rightGlass);
}

function addCharacterImages(scene) {
  const loader = new THREE.TextureLoader();

  // Load Courage Image
  loader.load('./images/courage_pic.png', (texture) => {
    const courageMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    });

    const courageGeometry = new THREE.PlaneGeometry(2, 3); // Adjust size
    const courageMesh = new THREE.Mesh(courageGeometry, courageMaterial);
    courageMesh.position.set(5, 1.5, -9); // Right side of the house
    scene.add(courageMesh);
  });

  // Load Muriel Image
  loader.load('./images/muriel.png', (texture) => {
    const murielMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    });

    const murielGeometry = new THREE.PlaneGeometry(2, 3); // Adjust size
    const murielMesh = new THREE.Mesh(murielGeometry, murielMaterial);
    murielMesh.position.set(-5, 1.5, -9); // Left side of the house
    scene.add(murielMesh);
  });
}
