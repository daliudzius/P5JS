const pinkish = [
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
const num = 100;
const noiseScale = 0.01;
const trailFade = 0; // 0-255 0 = no fade
const maxAlpha = 255; // 0-255 max alpha value
const maxStrokeWeight = 3;

// array to store the particles
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < num; i++) {
    particles.push(createVector(random(width), random(height)));
  }
  stroke(255);
  background(0);
}

function draw() {
  //   if (frameCount >= 1000) {
  //     noLoop();
  //   }
  background(0, trailFade);

  // draw all the particles
  for (let i = 0; i < num; i++) {
    let p = particles[i];

    // draw a particle
    point(p.x, p.y);

    // reduce the alpha value for each new particle
    let new_color_alpha = Math.round(map(i, 0, num - 1, maxAlpha, 0, true));
    // pick color in order for each new particle
    let new_color = color(
      dr_suess[Math.round(map(i, 0, num - 1, 0, dr_suess.length - 1, true))]
    );
    // pick stroke weight in order for each new particle
    let new_stroke_weight = map(i, 0, num - 1, 1, maxStrokeWeight);

    // assign the new color, alpha, and stroke weight
    new_color.setAlpha(new_color_alpha);
    stroke(new_color);
    strokeWeight(new_stroke_weight);

    // calculate the perlin noise field magnitude 0-1
    let n = noise(p.x * noiseScale, p.y * noiseScale);
    // map the noise to an angle
    let a = TAU * n;

    // move particles location toward that angle
    p.x += cos(a);
    p.y += sin(a);

    // if the particle is off screen, reset it
    if (!onScreen(p)) {
      p.x = random(width);
      p.y = random(height);
    }
  }
}

function mouseReleased() {
  noiseSeed(millis());
}

// check if a vector is on screen
function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}
