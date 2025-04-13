
let scene, camera, renderer;
let cubeSize = 1;

initThree();

document.getElementById("skinInput").addEventListener("change", handleSkinUpload);

function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / 600, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, 600);
    document.getElementById("viewer").appendChild(renderer.domElement);
    camera.position.z = 20;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10).normalize();
    scene.add(light);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function handleSkinUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            renderSkinAsBlocks(img);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function renderSkinAsBlocks(image) {
    // Czyścimy scenę
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }

    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(8, 8, 8, 8).data; // głowa front
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            const i = (y * 8 + x) * 4;
            const r = imageData[i];
            const g = imageData[i + 1];
            const b = imageData[i + 2];
            const a = imageData[i + 3];
            if (a < 10) continue;

            const color = new THREE.Color(`rgb(${r},${g},${b})`);
            const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
            const material = new THREE.MeshLambertMaterial({ color: color });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(x - 4, -y + 4, 0);
            scene.add(cube);
        }
    }

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10).normalize();
    scene.add(light);
}
