var num = 20;
var step, sz, offSet, theta, angle;

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(5);
  step = 22;
}

function draw() {
  background(0);
  translate(width / 2, height * 0.75);
  angle = 0;
  for (i = 0; i < num; i++) {
    stroke(255);
    noFill();
    sz = i * step;
    offSet = (TWO_PI / num) * i;
    arcEnd = map(sin(theta + offSet), -1, 1, PI, TWO_PI);
    arc(0, 0, sz, sz, PI, arcEnd);
  }
  colorMode(RGB);
  resetMatrix();
  theta += 0.0523;
}
