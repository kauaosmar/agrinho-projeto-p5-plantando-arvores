let player;
let apples = [];
let trees = [];
let score = 0;
let totalApples = 5;
let gameOver = false;
let win = false;

function setup() {
  createCanvas(600, 400);
  player = new Player();

  for (let i = 0; i < totalApples; i++) {
    apples.push(new Apple());
  }

  for (let i = 0; i < 3; i++) {
    trees.push(new Tree());
  }
}

function draw() {
  background(100, 200, 100);

  if (gameOver) {
    fill(255, 0, 0);
    textSize(32);
    textAlign(CENTER);
    text("Você bateu em uma árvore!", width / 2, height / 2);
    textSize(20);
    text("Fim de jogo 😢", width / 2, height / 2 + 40);
    noLoop();
    return;
  }

  if (win) {
    fill(0, 200, 0);
    textSize(32);
    textAlign(CENTER);
    text("Parabéns!", width / 2, height / 2 - 20);
    textSize(20);
    text("Você colheu todas as maçãs! 🍎", width / 2, height / 2 + 20);
    noLoop();
    return;
  }

  fill(0);
  textSize(18);
  textAlign(LEFT);
  text("Maçãs coletadas: " + score + " / " + totalApples, 10, 20);

  player.move();
  player.show();

  for (let a of apples) {
    a.show();
    if (!a.collected && player.hits(a)) {
      a.collected = true;
      score++;
    }
  }

  for (let tr of trees) {
    tr.show();
    if (player.hits(tr)) {
      gameOver = true;
    }
  }

  if (score === totalApples) {
    win = true;
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) player.xdir = -1;
  else if (keyCode === RIGHT_ARROW) player.xdir = 1;
  else if (keyCode === UP_ARROW) player.ydir = -1;
  else if (keyCode === DOWN_ARROW) player.ydir = 1;
}

function keyReleased() {
  player.xdir = 0;
  player.ydir = 0;
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 30;
    this.size = 30;
    this.xdir = 0;
    this.ydir = 0;
  }

  move() {
    this.x += this.xdir * 5;
    this.y += this.ydir * 5;
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  show() {
    fill(0, 0, 255);
    ellipse(this.x, this.y, this.size);
  }

  hits(obj) {
    let d = dist(this.x, this.y, obj.x, obj.y);
    return d < this.size / 2 + obj.size / 2;
  }
}

class Apple {
  constructor() {
    this.x = random(20, width - 20);
    this.y = random(20, height - 20);
    this.size = 20;
    this.collected = false;
  }

  show() {
    if (!this.collected) {
      fill(255, 0, 0); // cor de maçã
      ellipse(this.x, this.y, this.size, this.size);
      fill(34,139,34); // talo verde
      rect(this.x - 1, this.y - 15, 2, 6);
    }
  }
}

class Tree {
  constructor() {
    this.x = random(50, width - 50);
    this.y = random(50, height - 50);
    this.size = 40;
  }

  show() {
    fill(34, 139, 34);
    ellipse(this.x, this.y, this.size);
  }
}