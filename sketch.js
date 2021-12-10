let num = 1000;
let range = 100;

// global variable
let i;

let ax = [];
let ay = [];

let params = {
  myNumber: 100,
  bg_HSL: [255, 60, 100],
  myChoice: ["one", "two", "three"],
  Stroke: "",
  Save: false,
};

function setup() {
  createCanvas(1440, 1200);

  // Create GUI and add params
  var gui = createGui(this);
  gui.addObject(params);

  // H, S & B integer values
  colorMode(HSB);

  for (i = 0; i < num; i++) {
    ax[i] = width / 2;
    ay[i] = height / 2;
  }
  // frameRate(60) sets the frame rate to 60
  frameRate();
}

function draw() {
  background(params.bg_HSL); // H, S & B values

  // Shift all elements 1 place to the left
  for (i = 1; i < num; i++) {
    ax[i - 1] = ax[i];
    ay[i - 1] = ay[i];
  }

  // Put a new value at the end of the array
  ax[num - 1] += random(-range, range);
  ay[num - 1] += random(-range, range);

  // Constrain all points to the screen
  ax[num - 1] = constrain(ax[num - 1], 0, width);
  ay[num - 1] = constrain(ay[num - 1], 0, height);

  // Draw a line connecting the points
  for (i = 1; i < num; i++) {
    let val = (i / num) * 300 + 60;
    stroke(val, 100, 100);
    line(ax[i - 1], ay[i - 1], ax[i], ay[i]);
  }

  if (params.Save) {
    noLoop();
    saveCanvas("sketch", "png");
  }
}

// dynamically adjust the canvas to the window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
