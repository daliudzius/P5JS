// parameters
let line_color = [255, 60, 100];
let stroke_weight = 1;
let hues = ["#390099ff", "#9e0059ff", "#ff0054ff", "#ff5400ff", "#ffbd00ff"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  line_length = windowWidth / 10;
  midpoint = windowWidth / 2;
  // H, S & B integer values
  //colorMode(HSB);

  strokeCap(SQUARE);

  background("#000000"); // H, S & B values
  // frameRate(60) sets the frame rate to 60
  frameRate();
}

function draw() {
  if (frameCount >= 5) {
    noLoop();
  }

  for (let y = 0; y < windowHeight; y += stroke_weight * random(1, 10)) {
    stroke_weight = random(1, 5);
    strokeWeight(stroke_weight);

    let x = randomGaussian(midpoint, line_length);
    stroke(random(hues));

    line(midpoint, y, x, y);
  }
}
