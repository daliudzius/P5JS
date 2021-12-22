// By Roni Kaufman

let kMax;
let step;
let n = 300; // number of blobs
let radius = 50; // diameter of the circle
let inter = 1; // difference between the sizes of two blobs
let maxNoise = 5000;
let dr_suess = [
  "#54478c",
  "#2c699a",
  "#048ba8",
  "#0db39e",
  "#16db93",
  "#83e377",
  "#b9e769",
  "#efea5a",
  "#f1c453",
  "#f29e4c",
];
let pinkish = [
  "#ffe0e9",
  "#ffc2d4",
  "#ff9ebb",
  "#ff7aa2",
  "#e05780",
  "#b9375e",
  "#8a2846",
  "#602437",
  "#522e38",
];
let red_yellow = [
  "#03071e",
  "#370617",
  "#6a040f",
  "#9d0208",
  "#d00000",
  "#dc2f02",
  "#e85d04",
  "#f48c06",
  "#faa307",
  "#ffba08",
];
let colors = ["#000000", "#2f4550", "#586f7c", "#b8dbd9"];

let noiseProg = (x) => x * x;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);
  noFill();
  kMax = random(1, 2);
  step = 0.01;
  background(0);
  // stroke(random(360), 100, 100);
  stroke(360);
}

function draw() {
  if (frameCount < n) {
    let i = frameCount;
    let size = radius + i * inter;
    let k = kMax * sqrt(i / n);
    let noisiness = maxNoise * noiseProg(i / n);

    // change colors in order
    //stroke(colors[i % colors.length]);

    // change colors in random order
    stroke(random(pinkish));

    blob(size, width / 2, height / 2, k, i * step, noisiness);
  } else {
    noLoop();
  }
}

function blob(size, xCenter, yCenter, k, t, noisiness) {
  beginShape();

  let angleStep = 360 / 500;

  for (let theta = 0; theta < 360; theta += angleStep) {
    let r1, r2;

    r1 = cos(theta) + 1;
    r2 = sin(theta) + 1;

    let r = size + noise(k * r1, k * r2, t) * noisiness;
    let x = xCenter + r * cos(theta);
    let y = yCenter + r * sin(theta);

    curveVertex(x, y);
  }

  endShape(CLOSE);
}
