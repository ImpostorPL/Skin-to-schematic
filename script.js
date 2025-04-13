
document.getElementById("skinInput").addEventListener("change", handleSkinUpload);

function handleSkinUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            renderSkin(img);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function renderSkin(image) {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    // Przykład: wypisanie kolorów skóry (głowy)
    const imageData = ctx.getImageData(8, 8, 8, 8).data;
    console.log("Kolory głowy (górna część):");
    for (let i = 0; i < imageData.length; i += 4) {
        console.log(`rgba(${imageData[i]}, ${imageData[i+1]}, ${imageData[i+2]}, ${imageData[i+3]})`);
    }
}
