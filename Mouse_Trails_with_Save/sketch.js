var d = 50;
var count = 1; 
var c; 

function keyPressed() { 
  if (key === 'a') { 
      saveCanvas('canvasName' + count, 'jpg'); 
      count++; 
  } else if (key === 'z') { 
      background(0); // Reset canvas
  }
}

function face(x, y, w, h, c) {
  fill(c, 100, 100);
  ellipse(x, y, w, h);
  
  // eyes
  fill(c);
  ellipse(x - w / 6, y - h / 8, w / 4, h / 4);
  ellipse(x + w / 6, y - h / 8, w / 4, h / 4);

  // Draw triangular mouth
  triangle(x - w / 8, y + h / 8, x + w / 8, y + h / 8, x, y + h / 8 + h / 16);
}

function setup() {
  createCanvas(600, 400); 
  background(0); 
  noStroke(); 
}

function draw() {
  var r = random(255);
  var g = random(255);
  var b = random(255);
  var shapeD = random(255);
  
  if (mouseIsPressed) { 
   fill(255, 0, 0, 40); 
   ellipse(mouseX, mouseY, 30, 30); 
    if (mouseX > 0){
      if (shapeD >= 100){
        fill(r, g, b, 50);
        circle(mouseX, mouseY, 50);
      } else {
        face(mouseX, mouseY, 50, 50, random(360))
      }
    } else{
      fill(0);
      ellipse(mouseX, mouseY, 50, 50);
    }
  }
}
