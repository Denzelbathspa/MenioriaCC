let img;
let mask;

function preload() {
  img = loadImage("bsu.jpg");
}

function setup() {
  // Background
  createCanvas(700, 700);
  background(53, 46, 115);
  img.resize(1000, 700); // resizing the image
  smallPoint = 50;
  largePoint = 100;
  noStroke();
  img.loadPixels();
}

function draw() {
  // Pointillize Filter as the background
  let pointillize = map(mouseX, 0, width, smallPoint, largePoint);
  let x = floor(random(img.width));
  let y = floor(random(img.height));
  let pix = img.get(x, y);
  fill(pix, 128);
  ellipse(x, y, pointillize, pointillize);
  var v = map(mouseX, 0, width, 0, 5);
  filter(BLUR, v);

  // Foreground:
  noStroke();
  mask = createGraphics(width, height);
  mask.fill(38, 34, 87);
  mask.rect(0, 0, 700, 700); // x , y, width and height
  mask.erase();
  mask.textSize(200);
  mask.textFont("Fantasy");
  mask.rotate(100); // Rotate the canvas by the specified angle
  
  // Clipping
  push();
  clip(
    () => {
      mask.circle(200, 700, 300); // Draw a circle for clipping
      mask.text("BATH SPA UNIVERSITY", -600, 200); // Draw text within clipping region
      mask.text("BATH SPA UNIVERSITY", -200, 380); // Draw text within clipping region
      mask.text("BATH SPA UNIVERSITY", -1000, 560); // Draw text within clipping region
      mask.text("BATH SPA UNIVERSITY", -350, 740); // Draw text within clipping region
      mask.text("BATH SPA UNIVERSITY", -100, 920); // Draw text within clipping region
      image(mask, 0, 0); // Draw the clipped shape
    },
    { invert: true }
  );
  pop();
}
