// By Roni Kaufman
// https://ronikaufman.github.io/
// https://twitter.com/KaufmanRoni

let l = 1300;
let seed;
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
const N_FRAMES = 500;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  strokeCap(ADD);
  seed = random(1000);
}

function draw() {
  clear();
  background(0);
  randomSeed(seed);
  blendMode(ADD);
  translate(width / 2, height / 2);
  let z = (frameCount % N_FRAMES) / N_FRAMES;

  for (let i = 0; i < 10; i++) {
    stroke(random(dr_suess));
    strokeWeight(random(1, 8));
    let n = floor(random(1, 3)) * random([-1, 1]);
    let h = random(5, l / 6);
    h *= -sq(2 * z - 1) + 1;
    let sp = random(-3, 3);

    makeWave(n, h, sp);
  }

  stroke(255);
  strokeWeight(5);
  //square(-l / 2, -l / 2, l);
  circle(0, 0, l);

  if (frameCount % N_FRAMES === 0) {
    seed = random(1000 * frameCount);
  }
}

// n=num of waves, h=height, sp=speed
function makeWave(n, h, sp) {
  let t = (5 * (frameCount % N_FRAMES)) / N_FRAMES;
  beginShape();
  for (let x = -l / 2; x < l / 2; x++) {
    let z = map(x, -l / 2, l / 2, 0, 1);
    let alpha = -sq(2 * z - 1) + 1;
    let off = sin((n * TWO_PI * (x + l / 2)) / l + sp * t) * h * alpha;
    curveVertex(x, off);
  }
  endShape();
}
