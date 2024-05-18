function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(60); // Set background color to black

  // Draw body cylinder
  fill(60, 100, 0); // Set fill color to green
  translate(223, 300); // Move the origin to the center of the canvas
  rotate(HALF_PI); // Rotate by 90 degrees (pi/2 radians)
  ellipse(0, 0, 200, 50); // Top ellipse
  ellipse(0, 50, 200, 50); // Bottom ellipse
  fill(255, 255, 255);
  rect(-100, 0, 200, 50); // Connecting rectangle
  fill(100, 150, 150);
  rect(-10, 0, 200, 50); // Connecting rectangle
  fill(60, 200, 60);
  rect(10, 0, 200, 50); // Connecting rectangle
  
  // Reset transformation
  resetMatrix();
  
  // Draw antennae
  stroke(255); // Set stroke color to white
  strokeWeight(4); // Set stroke weight
  line(180, 100, 180, 50); // Left antenna
  line(220, 100, 220, 70); // Right antenna

  // Draw head with purple color
  fill(150, 150, 200); // Set fill color to purple (RGB: 128, 0, 128)
  ellipse(200, 150, 120, 120); // Head ellipse
  
  // Draw eyes
  fill(255); // Set fill color to white
  ellipse(170, 130, 40, 40); // Left eye
  ellipse(230, 130, 40, 40); // Right eye
  
  // Draw pupils
  fill(0); // Set fill color to black
  ellipse(170, 130, 20, 20); // Left pupil
  ellipse(230, 130, 20, 20); // Right pupil
  
  // Draw mouth
  noFill(); // Don't fill mouth
  stroke(255); // Set stroke color to white
  strokeWeight(4); // Set stroke weight
  arc(200, 180, 80, 40, 0, PI); // Mouth arc
  
}
