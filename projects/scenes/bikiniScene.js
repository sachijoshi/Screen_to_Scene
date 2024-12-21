import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

export function bikiniScene(scene) {
    // Blue Background (Underwater Effect)
    scene.background = new THREE.Color(0x87ceeb);

    // Building the ground
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0xffe4b5 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // SpongeBob's Pineapple House
    createPineappleHouse(scene);

    // Squidward's Stone Head
    createSquidwardHouse(scene);

    // Patrick's Rock (Semi-Circle)
    const rockGeometry = new THREE.SphereGeometry(2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2); // creating a semi circle
    const rockMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const rock = new THREE.Mesh(rockGeometry, rockMaterial);
    rock.scale.set(1, 1.5, 1);
    rock.position.set(6, 0, -10);
    scene.add(rock);

    // Paths to the houses
    createPaths(scene);

    // Adding the character images to the scenes
    addCharacterImages(scene);

}
export let spongebobHouseBoundingBox;

function createPineappleHouse(scene) {
    // Creating the pineapple Main Body
    const pineappleGeometry = new THREE.CylinderGeometry(2, 2, 5, 32);
    const pineappleMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 });
    const pineapple = new THREE.Mesh(pineappleGeometry, pineappleMaterial);
    pineapple.position.set(0, 2.5, -10);
    scene.add(pineapple);

    // Top of the Pineapple
    const topGeometry = new THREE.SphereGeometry(2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const topMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 });
    const top = new THREE.Mesh(topGeometry, topMaterial);
    top.position.set(0, 5, -10); // Put on top of the pineapple main body
    scene.add(top);

    // Leaves on top of the pineapple
    const leafGeometry = new THREE.ConeGeometry(0.6, 2, 16);
    const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
    const pineappleHeight = 5;
    const roundTopHeight = 1;
    const leafHeight = pineappleHeight + roundTopHeight + 0.2;
    const radius = 1.25;

    // Loop to put the leaves around the top
    for (let i = 0; i < 12; i++) {
        const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        const angle = (i / 12) * Math.PI * 2;
        leaf.position.set(
            Math.sin(angle) * radius,
            leafHeight,
            Math.cos(angle) * radius - 0.5);

        leaf.translateZ(-9);
        leaf.translateY(0.5);
        leaf.translateX(0);
        scene.add(leaf);
    }

    // More leaves added on top
    for (let i = 0; i < 4; i++) {
        const centralLeaf = new THREE.Mesh(leafGeometry, leafMaterial);
        centralLeaf.position.set(0, leafHeight + 0.5, -10.5);
        centralLeaf.rotation.set(-Math.PI / 6, (i / 4) * Math.PI * 2, 0);
        scene.add(centralLeaf);
    }

    // Door on the pineapple house
    const doorGeometry = new THREE.BoxGeometry(1, 2, 0.1);
    const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, 1, -7.95);
    scene.add(door);

    // Putting together the whole house
    spongebobHouseBoundingBox = new THREE.Box3().setFromObject(pineapple);
    spongebobHouseBoundingBox.expandByObject(top);
    spongebobHouseBoundingBox.expandByObject(door);
}


// Creating Squidward's house
function createSquidwardHouse(scene) {
    // Main Body of the house
    const bodyGeometry = new THREE.CylinderGeometry(2, 2, 6, 32);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x2f4f4f });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(-6, 3, -10);
    scene.add(body);

    // Top part of the squidward house
    const capGeometry = new THREE.SphereGeometry(2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const cap = new THREE.Mesh(capGeometry, bodyMaterial);
    cap.position.set(-6, 6, -10);
    scene.add(cap);

    // Eyes of the house
    const eyeGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x87cefa });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-7, 4.5, -8.5);
    scene.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(-5, 4.5, -8.5);
    scene.add(rightEye);

    // Borders around the eyes
    const borderGeometry = new THREE.RingGeometry(0.85, 1, 32);
    const borderMaterial = new THREE.MeshStandardMaterial({ color: 0x1d2c2c });
    const leftBorder = new THREE.Mesh(borderGeometry, borderMaterial);
    leftBorder.position.set(-7, 4.5, -8.45);
    leftBorder.rotation.x = Math.PI / 2;
    scene.add(leftBorder);

    const rightBorder = new THREE.Mesh(borderGeometry, borderMaterial);
    rightBorder.position.set(-5, 4.5, -8.45);
    rightBorder.rotation.x = Math.PI / 2;
    scene.add(rightBorder);

    // Eyebrows above the eyes
    const eyebrowGeometry = new THREE.BoxGeometry(2, 1, 1);
    const eyebrowMaterial = new THREE.MeshStandardMaterial({ color: 0x1d2c2c });
    const leftEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
    leftEyebrow.position.set(-7, 5.2, -8.3);
    leftEyebrow.rotation.z = 0.2;
    scene.add(leftEyebrow);

    const rightEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
    rightEyebrow.position.set(-5, 5.2, -8.3);
    rightEyebrow.rotation.z = -0.2;
    scene.add(rightEyebrow);

    // Nose onn the house
    const noseGeometry = new THREE.BoxGeometry(1, 2.5, 1);
    const noseMaterial = new THREE.MeshStandardMaterial({ color: 0x1d2c2c });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(-6, 4.3, -8.1);
    scene.add(nose);

    // Ears on the house
    const earGeometry = new THREE.BoxGeometry(1, 2, 1);
    const leftEar = new THREE.Mesh(earGeometry, bodyMaterial);
    leftEar.position.set(-8, 3.5, -10);
    scene.add(leftEar);

    const rightEar = new THREE.Mesh(earGeometry, bodyMaterial);
    rightEar.position.set(-4, 3.5, -10);
    scene.add(rightEar);

    // Door on the house
    const doorGeometry = new THREE.BoxGeometry(1, 2, 0.1);
    const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(-6, 1, -7.95);
    scene.add(door);
}

// Creating paths to each of the houses
function createPaths(scene) {
    const pathGeometry = new THREE.PlaneGeometry(0.5, 4);
    const pathMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });

    const pathToPineapple = new THREE.Mesh(pathGeometry, pathMaterial);
    pathToPineapple.position.set(0, 0.01, -8);
    pathToPineapple.rotation.x = -Math.PI / 2;
    scene.add(pathToPineapple);

    const pathToStoneHead = new THREE.Mesh(pathGeometry, pathMaterial);
    pathToStoneHead.position.set(-6, 0.01, -8);
    pathToStoneHead.rotation.x = -Math.PI / 2;
    scene.add(pathToStoneHead);

    const pathToRock = new THREE.Mesh(pathGeometry, pathMaterial);
    pathToRock.position.set(6, 0.01, -8);
    pathToRock.rotation.x = -Math.PI / 2;
    scene.add(pathToRock);
}

// Adding familiar characters to the scenes near their houses
function addCharacterImages(scene) {
  const loader = new THREE.TextureLoader();

  // Load SpongeBob and Patrick Image
  loader.load('./images/sponge.png', (texture) => {
    const sponge = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    });

    const spongeGeometry = new THREE.PlaneGeometry(2.5, 3);
    const spongeMesh = new THREE.Mesh(spongeGeometry, sponge);
    spongeMesh.position.set(3, 1, -3);
    scene.add(spongeMesh);
  });

  // Load Squidward Image
  loader.load('./images/squid.png', (texture) => {
    const squidMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    });

    const squidGeometry = new THREE.PlaneGeometry(2, 3);
    const squidMesh = new THREE.Mesh(squidGeometry, squidMaterial);
    squidMesh.position.set(-3, 1.5, -3); 
    scene.add(squidMesh);
  });
}
