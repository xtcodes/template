const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const upload = document.getElementById("upload");
const uploadTwibbon = document.getElementById("uploadTwibbon");
const download = document.getElementById("download");
const share = document.getElementById("share");
const loading = document.getElementById("loading");
let userImg = new Image();
let twibbonImg = new Image();
let scale = 1, lastDist = null;
let position = { x: 250, y: 250 };
let dragging = false;
let lastTouch = null;
let hasImage = false;

function draw(showWatermark = false) {
ctx.clearRect(0, 0, canvas.width, canvas.height);
if (userImg.src) {
const w = userImg.width * scale;
const h = userImg.height * scale;
ctx.drawImage(userImg, position.x - w / 2, position.y - h / 2, w, h);
}
if (twibbonImg.src) {
ctx.drawImage(twibbonImg, 0, 0, canvas.width, canvas.height);
}
if (showWatermark) {
const text = "TwibbonKu";
ctx.font = "16px sans-serif";
const textWidth = ctx.measureText(text).width;
ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
ctx.fillRect(10, canvas.height - 30, textWidth + 20, 24);
ctx.fillStyle = "#fff";
ctx.fillText(text, 20, canvas.height - 12);
}
}

twibbonImg.onload = () => draw(false);
twibbonImg.src = "/frame.png";

upload.addEventListener("change", (e) => {
const file = e.target.files[0];
if (file && file.type.startsWith('image/')) {
const reader = new FileReader();
loading.style.display = 'flex';
reader.onload = () => {
userImg.onload = () => {
loading.style.display = 'none';
draw(false);
};
userImg.src = reader.result;
hasImage = true;
};
reader.readAsDataURL(file);
} else {
alert("Hanya file gambar yang diperbolehkan.");
}
});

uploadTwibbon.addEventListener("change", (e) => {
const file = e.target.files[0];
if (file && file.type.startsWith('image/')) {
const reader = new FileReader();
loading.style.display = 'flex';
reader.onload = () => {
twibbonImg.onload = () => {
loading.style.display = 'none';
draw(false);
};
twibbonImg.src = reader.result;
};
reader.readAsDataURL(file);
} else {
alert("Hanya file gambar yang diperbolehkan.");
}
});

canvas.addEventListener("touchstart", (e) => {
if (e.touches.length === 1) {
lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
dragging = true;
}
});
canvas.addEventListener("touchmove", (e) => {
e.preventDefault();
if (e.touches.length === 2) {
const dx = e.touches[1].clientX - e.touches[0].clientX;
const dy = e.touches[1].clientY - e.touches[0].clientY;
const dist = Math.hypot(dx, dy);
if (lastDist !== null) {
let deltaScale = dist / lastDist;
scale *= deltaScale;
scale = Math.min(5, Math.max(0.2, scale));
}
lastDist = dist;
} else if (e.touches.length === 1 && dragging && lastTouch) {
const dx = e.touches[0].clientX - lastTouch.x;
const dy = e.touches[0].clientY - lastTouch.y;
position.x += dx;
position.y += dy;
lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
}
draw(false);
});
canvas.addEventListener("touchend", () => {
dragging = false;
lastDist = null;
lastTouch = null;
});

download.addEventListener("click", () => {
if (!hasImage) return alert("Silakan unggah gambar terlebih dahulu.");
draw(true);
setTimeout(() => {
const link = document.createElement("a");
link.download = "twibbon.png";
link.href = canvas.toDataURL();
link.click();
draw(false);
}, 100);
});

share.addEventListener("click", async () => {
if (!hasImage) return alert("Silakan unggah gambar terlebih dahulu.");
draw(true);
canvas.toBlob(async (blob) => {
draw(false);
const file = new File([blob], "twibbon.png", { type: "image/png" });
if (navigator.canShare && navigator.canShare({ files: [file] })) {
try {
await navigator.share({ files: [file], title: "Twibbon Saya" });
} catch (err) {
alert("Gagal membagikan twibbon...");
}
} else {
alert("Perangkat Anda tidak mendukung fitur bagikan file.");
}
});
});

if ('serviceWorker' in navigator) {
window.addEventListener('load', () => {
navigator.serviceWorker.register('sw.js');
});
}
