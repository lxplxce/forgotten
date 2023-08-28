const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");

var matrixHeight = document.getElementById("matrix__wrapper").offsetHeight;

canvas.width = window.innerWidth;
canvas.height = matrixHeight;

let themeColor = getComputedStyle(document.documentElement).getPropertyValue(
  "--theme-color"
);
var matrixColor = getComputedStyle(document.documentElement).getPropertyValue(
  "--matrix-color"
);

var matrixFZ = getComputedStyle(document.documentElement).getPropertyValue(
  "--matrix-fz"
);

class Symbol {
  constructor(x, y, fontSize, canvasHeight) {
    this.characters =
      "天使の翼に涙が流れる死神シいナイフは私を愛しています新しい神するために座労災の時的な状況ヴォルプタスコンセクン";
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = "";
    this.canvasHeight = canvasHeight;
  }
  draw(context) {
    this.text = this.characters.charAt(
      Math.floor(Math.random() * this.characters.length)
    );
    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.97) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
}

class Effect {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = matrixFZ;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
  }
  //private method starts with '#'
  #initialize() {
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Symbol(
        i,
        this.canvasHeight / Math.random(),
        this.fontSize,
        this.canvasHeight
      );
    }
  }
  resize(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
  }
}
const effect = new Effect(canvas.width, canvas.height);

let lastTime = 0;
const fps = 40;
const nextFrame = 1000 / fps;
let timer = 0;

function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  let themeColor = getComputedStyle(document.documentElement).getPropertyValue(
    "--theme-color"
  );
  if (timer > nextFrame) {
    ctx.fillStyle = matrixColor;
    ctx.textAlign = "center";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = themeColor;
    ctx.font = effect.fontSize + "px monospace";
    effect.symbols.forEach((symbol) => symbol.draw(ctx));
    timer = 0;
  } else {
    timer += deltaTime;
  }
  requestAnimationFrame(animate);
}

animate(0);

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  var matrixHeight = document.getElementById("matrix__wrapper").offsetHeight;
  canvas.height = matrixHeight;
  effect.resize(canvas.width, canvas.height);
});

///////////////// change Theme buttons ///////////////////////
let themeButtons = document.querySelectorAll(".lamp-color__btn");

themeButtons.forEach((color) => {
  color.addEventListener("click", () => {
    let colorName = color.value;
    document
      .querySelector(":root")
      .style.setProperty(
        "--theme-color",
        "rgb(var(--color-" + colorName + "))"
      );
  });
});
