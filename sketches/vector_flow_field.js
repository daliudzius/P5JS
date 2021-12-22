// scale of the vector field
// smaller values => bigger structures
// bigger values  ==> smaller structures

// number of drawing agents

var nAgents = 10000;

let agent = [];

let img;
function preload() {
  //img = loadImage('marchiquita.jpg');
  img = loadImage("https://picsum.photos/1080/1080/?random");
}

function setup() {
  createCanvas(1080, 1080);
  //colorMode(HSB, 360, 100, 100);
  rectMode(CENTER);
  strokeCap(SQUARE);

  background(0);

  for (let i = 0; i < nAgents; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let myRGB = img.get(x, y);
    agent.push(new Agent(x, y, myRGB));
  }
}

function draw() {
  if (frameCount > 1000) {
    noLoop();
  }

  for (let i = 0; i < agent.length; i++) {
    agent[i].update(0, 0);
  }

  stroke(0, 0, 100);
}

// paintining agent
class Agent {
  constructor(x0, y0, color0) {
    this.p = createVector(x0, y0);
    this.direction = 1;
    this.color = color0;
    this.scale = 5;
    this.strokeWidth = 0.01;
    this.distance = 0;
    this.step = 3;
    this.pOld = createVector(this.p.x, this.p.y);
    this.split = 4;
  }

  update(xx, yy) {
    this.p.x += this.direction * vector_field(this.p.x, this.p.y, this.scale).x;
    this.p.y += this.direction * vector_field(this.p.x, this.p.y, this.scale).y;

    this.distance += this.step;
    this.scale = map(this.p.x, 0, width, 3, 10);
    stroke(this.color);
    line(this.pOld.x, this.pOld.y, this.p.x, this.p.y);
    this.pOld.set(this.p);
  }
}

// vector field function
// the painting agents follow the flow defined
// by this function
function vector_field(x, y, myScale) {
  x = map(x, 0, width, -myScale, myScale);
  y = map(y, 0, height, -myScale, myScale);

  let k1 = 5;
  let k2 = 3;

  let u = sin(k1 * y) + floor(cos(k2 * y));
  let v = sin(k2 * x) - cos(k1 * x);

  // litle trick to move from left to right

  if (u <= 1) {
    //u = -u;
  }

  return createVector(u, v);
}
