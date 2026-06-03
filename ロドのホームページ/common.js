/* =========================
   BGM管理
========================= */
const bgm = document.getElementById("bgm");

if (bgm) {
  document.addEventListener("click", () => {
    bgm.volume = 0.3;
    bgm.play().catch(() => {});
  }, { once: true });
}


/* =========================
   ページフェード遷移
========================= */
document.querySelectorAll("a.button").forEach(link => {
  link.addEventListener("click", function(e) {
    const href = this.getAttribute("href");

    if (href && href !== "#") {
      e.preventDefault();
      document.body.classList.add("fadeOut");

      setTimeout(() => {
        location.href = href;
      }, 500);
    }
  });
});


/* =========================
   占い
========================= */
function uranai() {
  const results = [
    "大吉：セックス！",
    "中吉：抜ける(・∀・)ｲｲﾈ!!",
    "小吉：あーまあまあまあまあ",
    "凶：病み期躁鬱希死観念",
    "大凶：集団自決"
  ];
  alert(results[Math.floor(Math.random() * results.length)]);
}


/* =========================
   崩壊ボタン
========================= */
function collapse() {
  const elements = document.body.querySelectorAll("*");

  elements.forEach(el => {
    el.style.transition = "all 1s ease";

    const x = (Math.random() - 0.5) * 1000;
    const y = (Math.random() - 0.5) * 1000;
    const rot = (Math.random() - 0.5) * 720;

    el.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
    el.style.opacity = "0";
  });

  setTimeout(() => {
    location.href = "ura.html";
  }, 1500);
}


/* =========================
   初期化（まとめ）
========================= */
window.addEventListener("load", () => {

  const img = document.getElementById("rodoCursor");
  const se = document.getElementById("clickSE");

  // ===== カーソル =====
  if (img) {
    let x = 0, y = 0;
    let idleTimer;

    document.addEventListener("mousemove", (e) => {
      x += (e.clientX - x) * 0.15;
      y += (e.clientY - y) * 0.15;

      img.style.left = (x + 15) + "px";
      img.style.top = (y + 15) + "px";

      img.src = "neko.jpg";

      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        img.src = "zizii.jpg";
      }, 3000);
    });

    idleTimer = setTimeout(() => {
      img.src = "zizii.jpg";
    }, 3000);
  }

  // ===== クリックSE =====
  if (se) {
    document.addEventListener("click", () => {
      se.currentTime = 0;
      se.play().catch(() => {});
    });
  }

  // ===== secretページ専用処理 =====
  if (location.pathname.includes("secret.html")) {

    if (img) img.style.display = "none";

    if (bgm) {
      bgm.pause();
      bgm.volume = 0;
    }
  }
});


/* =========================
   クリック演出
========================= */
document.addEventListener("click", (e) => {
  const text = document.createElement("div");

  text.innerText = "はにゃ！？！？！？";
  text.style.position = "absolute";
  text.style.left = e.pageX + "px";
  text.style.top = e.pageY + "px";
  text.style.color = "red";

  document.body.appendChild(text);

  setTimeout(() => text.remove(), 500);
});


/* =========================
   3回クリックで隠しページ
========================= */
let clickCount = 0;
let clickTimer = null;

document.addEventListener("click", () => {
  clickCount++;

  if (!clickTimer) {
    clickTimer = setTimeout(() => {
      clickCount = 0;
      clickTimer = null;
    }, 2000);
  }

  if (clickCount >= 3) {
    clickCount = 0;
    clickTimer = null;

    location.href = "secret.html";
  }
});
function secret() {
  document.body.style.filter = "invert(1)";
  setTimeout(() => {
    document.body.style.filter = "none";
  }, 200);

  location.href = "ta.html";
}