function setup() {
  createCanvas(400, 200);
}

function draw() {
  background(0,255,255);

  // Road
  fill(40);
  rect(0, 100, width, 60);
  fill(0,255,0);
  rect(0, 160, width, width);
  fill(255, 255, 0);
  rect(0, 120, 40, 10);
  rect(50, 120, 40, 10);
  rect(100, 120, 40, 10);
  rect(150, 120, 40, 10);
  rect(200, 120, 40, 10);
  rect(250, 120, 40, 10);
  rect(300, 120, 40, 10);
  rect(350, 120, 40, 10);
  
  // Car body
  fill(180, 255, 100);
  beginShape();
  vertex(100, 100);
  vertex(300, 100);
  vertex(280, 60);
  vertex(220, 40);
  vertex(160, 40);
  vertex(120, 60);
  endShape(CLOSE);

  // Windows
  fill(150, 200, 255, 150);
  rect(150, 50, 40, 20);
  rect(200, 50, 40, 20);

  // Wheels
  fill(0);
  ellipse(150, 100, 40, 40);
  ellipse(250, 100, 40, 40);
  
  // rims
  fill(255);
  ellipse(150, 100, 20, 20);
  ellipse(250, 100, 20, 20);
  
  // Headlights
  fill(255, 255, 0);
  ellipse(290, 85, 15, 10);
  
  // Taillights
  fill(255, 0, 0);
  ellipse(110, 85, 20, 10);
}
