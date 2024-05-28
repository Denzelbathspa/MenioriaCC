var maxCol = 20;
var maxRow = 20;
var circleD = 20;

function setup() {
  createCanvas(600, 600);
  noStroke();
  background(0);

  // Repetition using a for loop to draw rectangles
  for (var i = 0; i < maxCol; i++) {
    // Decision-making to set fill color based on the value of i
    if (i % 2 == 0) {
      fill(100);
    } else {
      fill(10 * i);
    }
    rect(30 * i, 0, 600, 600);
  }

  ellipseMode(CORNER);

  var xSpacing = width / maxCol;
  var ySpacing = height / maxRow;
  translate(5, 5);

  // Repetition using nested for loops to draw ellipses
  for (var x = 0; x < maxCol; x++) {
    for (var y = 0; y < maxRow; y++) {
      // Randomization to set fill color
      if (random() > 0.66) {
        fill(255 - 0, 255 - 180, 255 - 180); // Opposite of white color
      } else if (random() > 0.33) {
        fill(255 - 50, 255 - 180, 255 - 0); // Opposite of black color
      } else {
        if (random() > 0.5) {
          fill(255 - 255, 255 - 100, 255 - 20); // Opposite of orange color
        } else {
          fill(255 - 20, 255 - 100, 255 - 255); // Opposite of blue color
        }
      }
      ellipse(x * xSpacing, y * ySpacing, circleD, circleD);
    }
  }
  
  // Blend mode to invert colors behind the massive circle
  blendMode(DIFFERENCE);

  // Draw massive circle in the middle of the screen
  fill(255);
  ellipse(100, 100, 400, 400);
}
