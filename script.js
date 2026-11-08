const photoContainer = document.getElementById("photoContainer");
const stars = document.getElementById("stars");
const petals = document.getElementById("petals");

const startBtn = document.getElementById("startBtn");
const startIcon = document.getElementById("startIcon");
const startText = document.getElementById("startText");
const pauseBtn = document.getElementById("pauseBtn");
const pauseIcon = document.getElementById("pauseIcon");
const loveBtn = document.getElementById("loveBtn");

const message = document.getElementById("message");
const messageText = document.getElementById("messageText");
const flashHeart = document.getElementById("flashHeart");

let paused = false;
let opened = false;
let darkRomanticCreated = false;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

/* Bintang kecil */
for (let i = 0; i < 26; i++) {
  const star = document.createElement("span");
  star.className = "star";
  star.style.setProperty("--size", `${random(2, 5)}px`);
  star.style.setProperty("--left", `${random(2, 98)}%`);
  star.style.setProperty("--top", `${random(3, 96)}%`);
  star.style.setProperty("--duration", `${random(2.2, 5)}s`);
  star.style.setProperty("--delay", `${random(-5, 0)}s`);
  stars.appendChild(star);
}

/* Foto hati */
const photoCount = 24;

for (let i = 0; i < photoCount; i++) {
  const heart = document.createElement("div");
  heart.className = "photo-heart";

  const img = document.createElement("img");
  img.src = "ayuyu.png";
  img.alt = "Foto Ayuyu";

  heart.style.setProperty("--size", `${random(68, 145)}px`);
  heart.style.setProperty("--left", `${random(-8, 100)}%`);
  heart.style.setProperty("--duration", `${random(9, 17)}s`);
  heart.style.setProperty("--delay", `${random(-17, 0)}s`);
  heart.style.setProperty("--moveX", `${random(-110, 110)}px`);
  heart.style.setProperty("--rotate", `${random(-11, 11)}deg`);
  heart.style.setProperty("--sway", `${random(2.8, 5.5)}s`);

  heart.appendChild(img);
  photoContainer.appendChild(heart);
}

/* Kelopak */
for (let i = 0; i < 14; i++) {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.style.setProperty("--size", `${random(5, 10)}px`);
  petal.style.setProperty("--left", `${random(-5, 100)}%`);
  petal.style.setProperty("--duration", `${random(8, 14)}s`);
  petal.style.setProperty("--delay", `${random(-14, 0)}s`);
  petal.style.setProperty("--moveX", `${random(-80, 80)}px`);
  petals.appendChild(petal);
}

/* Pause / lanjut semua animasi */
pauseBtn.addEventListener("click", () => {
  paused = !paused;
  document.body.classList.toggle("paused", paused);

  if (paused) {
    document.querySelectorAll("*").forEach(el => {
      el.style.animationPlayState = "paused";
    });
    pauseIcon.textContent = "▶";
    showMessage("Animasi dijeda");
  } else {
    document.querySelectorAll("*").forEach(el => {
      el.style.animationPlayState = "";
    });
    pauseIcon.textContent = "Ⅱ";
    showMessage("Animasi dilanjutkan");
  }
});

/* Tombol buka: menampilkan efek tambahan */
startBtn.addEventListener("click", () => {
  opened = !opened;
  const scene = document.getElementById("scene");

  if (opened) {
    startIcon.textContent = "♥";
    startText.textContent = "Romantic";
    scene.classList.add("opened", "dark-mode");

    // Tambahan efek hanya dibuat sekali agar tidak menumpuk.
    if (!darkRomanticCreated) {
      createDarkRomanticEffects();
      darkRomanticCreated = true;
    }

    createBurst();
    showMessage("A little love for Ayuyu ♡");
  } else {
    startIcon.textContent = "♡";
    startText.textContent = "Buka";
    scene.classList.remove("opened", "dark-mode");
    showMessage("Back to soft mode");
  }
});

/* Tombol love: ledakan hati kecil */
loveBtn.addEventListener("click", () => {
  flashHeart.classList.remove("pop");
  void flashHeart.offsetWidth;
  flashHeart.classList.add("pop");

  createBurst();
  showMessage("♥ Ayuyu ♥");
});

/* Pesan kecil */
function showMessage(text) {
  messageText.textContent = text;
  message.classList.remove("show");
  void message.offsetWidth;
  message.classList.add("show");
}

/* Efek tambahan saat masuk tema dark romantic */
function createDarkRomanticEffects() {
  const scene = document.getElementById("scene");

  // Bokeh cahaya merah muda
  for (let i = 0; i < 10; i++) {
    const bokeh = document.createElement("span");
    bokeh.className = "dark-bokeh";
    bokeh.style.setProperty("--size", `${random(35, 105)}px`);
    bokeh.style.setProperty("--left", `${random(-5, 95)}%`);
    bokeh.style.setProperty("--top", `${random(5, 90)}%`);
    bokeh.style.setProperty("--duration", `${random(4, 8)}s`);
    bokeh.style.setProperty("--delay", `${random(-7, 0)}s`);
    bokeh.style.setProperty("--moveX", `${random(-25, 25)}px`);
    bokeh.style.setProperty("--moveY", `${random(-25, 25)}px`);
    scene.appendChild(bokeh);
  }

  // Hati kecil yang naik perlahan
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("span");
    heart.className = "dark-heart-particle";
    heart.textContent = Math.random() > .3 ? "♡" : "♥";
    heart.style.setProperty("--size", `${random(9, 18)}px`);
    heart.style.setProperty("--left", `${random(0, 100)}%`);
    heart.style.setProperty("--duration", `${random(7, 13)}s`);
    heart.style.setProperty("--delay", `${random(-12, 0)}s`);
    heart.style.setProperty("--moveX", `${random(-90, 90)}px`);
    heart.style.setProperty("--rotate", `${random(-35, 35)}deg`);
    scene.appendChild(heart);
  }
}

/* Ledakan partikel hati */
function createBurst() {
  const scene = document.getElementById("scene");

  for (let i = 0; i < 13; i++) {
    const heart = document.createElement("span");
    heart.textContent = Math.random() > .25 ? "♥" : "♡";
    heart.style.position = "absolute";
    heart.style.left = "50%";
    heart.style.top = "50%";
    heart.style.zIndex = "45";
    heart.style.color = i % 2 ? "#e9638d" : "#f58cab";
    heart.style.fontSize = `${random(13, 25)}px`;
    heart.style.pointerEvents = "none";
    heart.style.willChange = "transform, opacity";

    const x = random(-170, 170);
    const y = random(-180, 180);
    const duration = random(800, 1300);

    scene.appendChild(heart);

    heart.animate(
      [
        {
          transform: "translate(-50%, -50%) scale(.2) rotate(0deg)",
          opacity: 0
        },
        {
          transform: `translate(calc(-50% + ${x * .55}px), calc(-50% + ${y * .55}px)) scale(1) rotate(120deg)`,
          opacity: 1
        },
        {
          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(.35) rotate(260deg)`,
          opacity: 0
        }
      ],
      {
        duration,
        easing: "cubic-bezier(.2,.75,.25,1)",
        fill: "forwards"
      }
    ).finished.then(() => heart.remove());
  }
}
