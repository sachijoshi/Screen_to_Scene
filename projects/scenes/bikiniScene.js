import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

export function bikiniScene(scene) {
    // Blue Background (Underwater Effect)
    scene.background = new THREE.Color(0x87ceeb); // Light blue

    // Ground (sandy color)
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0xffe4b5 }); // Sandy color
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // SpongeBob's Pineapple House
    createPineappleHouse(scene);

    // Squidward's Stone Head
    createSquidwardHouse(scene);

    // Patrick's Rock (Semi-Circle)
    const rockGeometry = new THREE.SphereGeometry(2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2); // Half-sphere
    const rockMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 }); // Dark brown
    const rock = new THREE.Mesh(rockGeometry, rockMaterial);
    rock.scale.set(1, 1.5, 1); // Scale taller on the Y-axis
    rock.position.set(6, 0, -10); // Adjusted Y position for the taller rock
    scene.add(rock);

    // Paths to houses
    createPaths(scene);

    addCharacterImages(scene);

}


// Helper Function: Pineapple House
function createPineappleHouse(scene) {
    // Pineapple Main Body
    const pineappleGeometry = new THREE.CylinderGeometry(2, 2, 5, 32); // Rounded cylinder for the body
    const pineappleMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 }); // Orange for the pineapple
    const pineapple = new THREE.Mesh(pineappleGeometry, pineappleMaterial);
    pineapple.position.set(0, 2.5, -10); // Pineapple's base height
    scene.add(pineapple);

    // Round Top for Pineapple
    const topGeometry = new THREE.SphereGeometry(2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2); // Half sphere
    const topMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 }); // Match pineapple color
    const top = new THREE.Mesh(topGeometry, topMaterial);
    top.position.set(0, 5, -10); // Place on top of the pineapple
    scene.add(top);

    // Leaves
    // Leaves
    const leafGeometry = new THREE.ConeGeometry(0.6, 2, 16); // Leaf shape
    const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 }); // Dark green
    const pineappleHeight = 5; // Height of the pineapple cylinder
    const roundTopHeight = 1; // Approximate height of the half-sphere
    const leafHeight = pineappleHeight + roundTopHeight + 0.2; // Leaves start just above the pineapple top
    const radius = 1.25; // Slightly larger radius for better spread

    // Outer Leaves
    for (let i = 0; i < 12; i++) {
        const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        const angle = (i / 12) * Math.PI * 2; // Spread leaves evenly around
        leaf.position.set(
            Math.sin(angle) * radius, // Spread around the x-axis
            leafHeight,               // Correct height for leaves
            Math.cos(angle) * radius - 0.5 // Move leaves slightly backward on the z-axis
        );
        //leaf.rotation.set(-Math.PI / 4, angle, 0); // Slightly tilt outward
        leaf.translateZ(-9); // Translate leaves backward by 0.5 units
        leaf.translateY(0.5);
        leaf.translateX(0);
        scene.add(leaf);
    }

    // Central Leaves (Straight-Up Leaves)
    for (let i = 0; i < 4; i++) {
        const centralLeaf = new THREE.Mesh(leafGeometry, leafMaterial);
        centralLeaf.position.set(0, leafHeight + 0.5, -10.5); // Adjusted z-axis to move backward
        centralLeaf.rotation.set(-Math.PI / 6, (i / 4) * Math.PI * 2, 0); // Slight outward tilt
        scene.add(centralLeaf);
    }


    // Door
    const doorGeometry = new THREE.BoxGeometry(1, 2, 0.1);
    const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 }); // Brown
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, 1, -7.95);
    scene.add(door);
}


// Helper Function: Squidward's Stone Head
function createSquidwardHouse(scene) {
    // Main Body
    const bodyGeometry = new THREE.CylinderGeometry(2, 2, 6, 32); // Cylindrical body
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x2f4f4f }); // Gray-blue stone
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(-6, 3, -10);
    scene.add(body);

    // Top Cap
    const capGeometry = new THREE.SphereGeometry(2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const cap = new THREE.Mesh(capGeometry, bodyMaterial);
    cap.position.set(-6, 6, -10);
    scene.add(cap);

    // Eyes (Full Circles)
    const eyeGeometry = new THREE.SphereGeometry(0.8, 32, 32); // Spherical eyes
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x87cefa }); // Light blue
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-7, 4.5, -8.5); // Adjusted position for circles
    scene.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(-5, 4.5, -8.5);
    scene.add(rightEye);

    // Eye Borders
    const borderGeometry = new THREE.RingGeometry(0.85, 1, 32); // Slightly larger than the eyes
    const borderMaterial = new THREE.MeshStandardMaterial({ color: 0x1d2c2c }); // Stone gray
    const leftBorder = new THREE.Mesh(borderGeometry, borderMaterial);
    leftBorder.position.set(-7, 4.5, -8.45); // Move slightly forward
    leftBorder.rotation.x = Math.PI / 2; // Face outward
    scene.add(leftBorder);

    const rightBorder = new THREE.Mesh(borderGeometry, borderMaterial);
    rightBorder.position.set(-5, 4.5, -8.45);
    rightBorder.rotation.x = Math.PI / 2;
    scene.add(rightBorder);

    // Eyebrows
    const eyebrowGeometry = new THREE.BoxGeometry(2, 1, 1); // Rectangular eyebrows
    const eyebrowMaterial = new THREE.MeshStandardMaterial({ color: 0x1d2c2c }); // Same as the body
    const leftEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
    leftEyebrow.position.set(-7, 5.2, -8.3); // Position above left eye
    leftEyebrow.rotation.z = 0.2; // Slight tilt
    scene.add(leftEyebrow);

    const rightEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
    rightEyebrow.position.set(-5, 5.2, -8.3); // Position above right eye
    rightEyebrow.rotation.z = -0.2; // Slight tilt
    scene.add(rightEyebrow);

    // Nose
    const noseGeometry = new THREE.BoxGeometry(1, 2.5, 1); // Slightly larger nose
    const noseMaterial = new THREE.MeshStandardMaterial({ color: 0x1d2c2c }); // Darker than body
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(-6, 4.3, -8.1); // Adjusted position for prominence
    scene.add(nose);

    // Ears
    const earGeometry = new THREE.BoxGeometry(1, 2, 1);
    const leftEar = new THREE.Mesh(earGeometry, bodyMaterial);
    leftEar.position.set(-8, 3.5, -10);
    scene.add(leftEar);

    const rightEar = new THREE.Mesh(earGeometry, bodyMaterial);
    rightEar.position.set(-4, 3.5, -10);
    scene.add(rightEar);

    // Door
    const doorGeometry = new THREE.BoxGeometry(1, 2, 0.1);
    const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 }); // Brown
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(-6, 1, -7.95);
    scene.add(door);
}

// Helper Function: Paths
function createPaths(scene) {
    const pathGeometry = new THREE.PlaneGeometry(0.5, 4);
    const pathMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 }); // Dark gray

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

function addCharacterImages(scene) {
  const loader = new THREE.TextureLoader();

  // Load Courage Image
  loader.load('./images/sponge.png', (texture) => {
    const sponge = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    });

    const spongeGeometry = new THREE.PlaneGeometry(2.5, 3); // Adjust size
    const spongeMesh = new THREE.Mesh(spongeGeometry, sponge);
    spongeMesh.position.set(3, 1, -3); // Right side of the house
    scene.add(spongeMesh);
  });

  // Load Muriel Image
  loader.load('./images/squid.png', (texture) => {
    const squidMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    });

    const squidGeometry = new THREE.PlaneGeometry(2, 3); // Adjust size
    const squidMesh = new THREE.Mesh(squidGeometry, squidMaterial);
    squidMesh.position.set(-3, 1.5, -3); // Left side of the house
    scene.add(squidMesh);
  });
}
