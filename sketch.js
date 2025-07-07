// Values needed for calculations of the trajectory
let velocity = 0;
let degrees = 0;
let gravity = 9.81;
let heigth = 0;
let time = 0;

let graphScale;

function setup() {
  createCanvas(400, 700);
  background(220);

  velocityInput = createInput();
  velocityInput.position(60, 400);

  degreesInput = createInput();
  degreesInput.position(60, 430);

  gravityInput = createInput();
  gravityInput.position(60, 460);

  stroke('black');
  strokeWeight(3);
  line(20, 20, 20, 380);
  line(20, 380, 380, 380);

  strokeWeight(1);
  text('Height in meters', 5, 15);
  text('Time in seconds', 300, 395);

  text('Velocity:', 5, 415);
  text('Degrees:', 5, 445);
  text('Gravity:', 5, 475);
  text('Scale:', 5, 505);
  text('Height:', 5, 535);
  text('Time:', 5, 565);

  slider = createSlider(1, 10);
  slider.position(60, 490);
  slider.size(150);

  button = createButton('Calculate');
  button.position(5, 600);
  button.mousePressed(calculate);
}

function draw() {
  graphScale = slider.value();
}

function calculate() {
  // Draw axes again
  stroke('black');
  strokeWeight(3);
  line(20, 20, 20, 380);
  line(20, 380, 380, 380);

  // Get user input
  velocity = float(velocityInput.value());
  degrees = float(degreesInput.value());
  gravity = float(gravityInput.value());

  let angle = radians(degrees);

  stroke('red');
  noFill();
  beginShape();
  for (let x1 = 0; x1 <= 50; x1 += 0.5) {
    let y = x1 * Math.tan(angle) - (gravity * Math.pow(x1, 2)) / (2 * Math.pow(velocity, 2) * Math.pow(Math.cos(angle), 2));

    // Scale and flip y for canvas
    let canvasX = 20 + x1 * 5 * graphScale;
    let canvasY = 380 - y * 5 * graphScale;; // invert y axis to go up

    console.log("Scale: " + graphScale);

    vertex(canvasX, canvasY);
  }
  endShape();
}