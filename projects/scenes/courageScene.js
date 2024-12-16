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

  // Add a simple ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  // Add directional light for shadows
  const directionalLight = new THREE.DirectionalLight(0xffe4b5, 1);
  directionalLight.position.set(10, 10, 10);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
}

// Function to create Courage's house
function createCourageHouse(scene) {
  // Main house body
  const houseBodyGeometry = new THREE.BoxGeometry(6.25, 5, 6);
  const houseBodyMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
  const houseBody = new THREE.Mesh(houseBodyGeometry, houseBodyMaterial);
  houseBody.position.set(0, 2.5, -10);
  scene.add(houseBody);

  // Roof
  const roofGeometry = new THREE.ConeGeometry(6, 4, 4); // Slanted roof
  const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x4b3f2f });
  const roof = new THREE.Mesh(roofGeometry, roofMaterial);
  roof.rotation.y = Math.PI / 4; // Rotate for pyramid-like roof
  roof.position.set(0, 6, -10);
  scene.add(roof);

  // Porch floor
  const porchGeometry = new THREE.BoxGeometry(10, 0.2, 4);
  const porchMaterial = new THREE.MeshStandardMaterial({ color: 0xdeb887 });
  const porch = new THREE.Mesh(porchGeometry, porchMaterial);
  porch.position.set(0, 0.1, -8);
  scene.add(porch);

  // Porch supports
  const columnGeometry = new THREE.CylinderGeometry(0.2, 0.2, 3, 20);
  const columnMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const leftColumn = new THREE.Mesh(columnGeometry, columnMaterial);
  leftColumn.position.set(-3, 3, -7);
  scene.add(leftColumn);

  const rightColumn = new THREE.Mesh(columnGeometry, columnMaterial);
  rightColumn.position.set(3, 3, -7);
  scene.add(rightColumn);

  // Chimney
  const chimneyGeometry = new THREE.BoxGeometry(1, 4, 1);
  const chimneyMaterial = new THREE.MeshStandardMaterial({ color: 0x4b3f2f });
  const chimney = new THREE.Mesh(chimneyGeometry, chimneyMaterial);
  chimney.position.set(3, 6, -10);
  scene.add(chimney);

  // Windows
  createWindows(scene, 0, -10);

  // Front door
  const doorGeometry = new THREE.BoxGeometry(1.5, 3, 0.1);
  const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 });
  const door = new THREE.Mesh(doorGeometry, doorMaterial);
  door.position.set(0, 1.5, -7.9);
  scene.add(door);
}

// Function to add windows
function createWindows(scene, houseX, houseZ) {
  const windowGeometry = new THREE.BoxGeometry(2, 2, 0.1);
  const windowMaterial = new THREE.MeshStandardMaterial({ color: 0x87ceeb });

  // Left window
  const leftWindow = new THREE.Mesh(windowGeometry, windowMaterial);
  leftWindow.position.set(houseX - 3, 3.5, houseZ - 5.9);
  scene.add(leftWindow);

  // Right window
  const rightWindow = new THREE.Mesh(windowGeometry, windowMaterial);
  rightWindow.position.set(houseX + 3, 3.5, houseZ - 5.9);
  scene.add(rightWindow);

  // Small attic window
  const atticWindowGeometry = new THREE.CircleGeometry(1, 32);
  const atticWindowMaterial = new THREE.MeshStandardMaterial({ color: 0x87ceeb });
  const atticWindow = new THREE.Mesh(atticWindowGeometry, atticWindowMaterial);
  atticWindow.position.set(houseX, 5.5, houseZ - 5.9);
  scene.add(atticWindow);
}
