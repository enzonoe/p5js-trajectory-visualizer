// Values needed for calculations of the trajectory
let velocity = 0;
let degrees = 0;
let gravity = 9.81;
let y0 = 0;

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
  text('y in meters', 5, 15);
  text('x in seconds', 300, 395);

  text('Velocity:', 5, 415);
  text('Degrees:', 5, 445);
  text('Gravity:', 5, 475);
  text('Scale:', 5, 505);
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

  stroke('black');
  fill('black');
  strokeWeight(1);
  text(y0.toFixed(2) + "s", 60, 565);
}

function calculate() {
  stroke('black');
  strokeWeight(2);

  // Get user input
  velocity = float(velocityInput.value());
  degrees = float(degreesInput.value());
  gravity = float(gravityInput.value());

  let angle = radians(degrees);
  y0 = zeroPoint(velocity, degrees, gravity);

  stroke('red');
  noFill();
  beginShape();
  for (let x = 0; x <= y0; x += 0.001) {
    let y = x * Math.tan(angle) - (gravity * Math.pow(x, 2)) / (2 * Math.pow(velocity, 2) * Math.pow(Math.cos(angle), 2));

    // Scale and flip y for canvas
    let canvasX = 20 + x * 5 * graphScale;
    let canvasY = 380 - y * 5 * graphScale; // invert y axis to go up

    console.log("Scale: " + graphScale + " x-point: " + y0);

    vertex(canvasX, canvasY);
  }
  endShape();

  fill('red');
  circle(y0 * graphScale * 5 + 20, 380, 10);

  stroke('black');
  text(y0.toFixed(2) + "s", y0 * 5 * graphScale + 20, 360);
}

function zeroPoint(v, theta_deg, g) {
  theta = radians(theta_deg);
  return (v ** 2 * Math.sin(2 * theta)) / g;
}