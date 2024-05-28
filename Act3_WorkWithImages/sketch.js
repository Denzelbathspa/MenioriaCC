var img, img1, img2, x, y;
var numFrames = 6;
var frame = 0;
var images = new Array(numFrames);
var filterMode = 0;

function preload() {
  img = loadImage("veggies.jpg");
  img1 = loadImage("bsu.jpg");
  img2 = loadImage("sunflower.jpg");
  images[0] = loadImage("dove01.png");
  images[1] = loadImage("dove02.png");
  images[2] = loadImage("dove03.png");
  images[3] = loadImage("dove04.png");
  images[4] = loadImage("dove05.png");
  images[5] = loadImage("dove06.png");
}

function setup() {
  createCanvas(600, 400);
  background(0);
  noStroke();
  frameRate(60);
}

function draw() {
  background(0);
  createCanvas(600, 400);
  switch (filterMode) {
    case 0:
      // Tint Filter
      tint(255, 0, 0);
      image(img, 0, 0, img.width / 2, img.height / 2);
      noTint();
      image(img, 0, img.height / 2, img.width / 2, img.height / 2);
      break;
    case 1:
      // Invert Filter
      image(img, 0, 0);
      filter(INVERT);
      break;
    case 2:
      image(img, 0, 0);
      var v = map(mouseX, 0, width, 2, 20);
      filter(BLUR, v);
      break;
    case 3:
      // Black and white threshold with respect to mouse
      image(img, 0, 0);
      var v1 = map(mouseX, 0, width, 0, 1);
      filter(THRESHOLD, v1);
      break;
    case 4:
      // Posterize Filter with respect to mouse
      image(img, 0, 0);
      var v2 = map(mouseX, 0, width, 2, 20);
      filter(POSTERIZE, v2);
      break;
    case 5:
      // Display the color of the pixel under the mouse
      image(img, 0, 0);
      var c = get(mouseX, mouseY);
      fill(c);
      ellipse(mouseX, mouseY, 100, 100);
      break;
    case 6:
      // Pop out circles until the screen is back to its original shape
      x = random(width);
      y = random(height);
      var c1 = img.get(x, y);
      fill(c1[0], c1[1], c1[2], 50);
      ellipse(x, y, 100, 100);
      break;
    case 7:
      // Moving Dove With the mouse
      image(img, 0, 0);
      frame++;
      if (frame == numFrames) frame = 0;
      image(images[frame], mouseX - 75, mouseY - 100);
      break;
    case 8:
      createCanvas(700, 700);
      background(190, 220, 250);

      // circle inside the image
      //image inside shape, using clip function - only works with one shape
      img2.resize(200, 200);
      let cnv7 = createGraphics(200, 200); // creating a sub canvas inside the main canvas bruv!
      cnv7.circle(100, 100, 190);
      //cnv7.triangle(0,0,100,200,200,0);
      cnv7.canvas.getContext("2d").clip();
      cnv7.image(img2, 0, 0); //positioning the image
      image(cnv7, 350, 300); // putting the sub canvas inside the main canvas

      // Add posterize effect
      // circle inside the image
      //image inside shape, using clip function - only works with one shape
      img1.resize(200, 200);
      let cnv0 = createGraphics(500, 500); // creating a sub canvas inside the main canvas bruv!
      cnv0.rect(100, 100, 190);
      cnv0.canvas.getContext("2d").clip();
      cnv0.image(img1, 100, 100); //positioning the image
      image(cnv0, 40, 400); // putting the sub canvas inside the main canvas

      // Add posterize effect
      // circle inside the image
      //image inside shape, using clip function - only works with one shape
      img1.resize(200, 200);
      let cnv01 = createGraphics(500, 500); // creating a sub canvas inside the main canvas bruv!
      cnv01.rect(100, 100, 190);
      cnv01.canvas.getContext("2d").clip();
      cnv01.image(img1, 200, 100); //positioning the image
      image(cnv01, 40, 400); // putting the sub canvas inside the main canvas

      // Top right weird shape
      //image inside shape, using mask function - works with multiple shapes
      img1.resize(200, 200); // resizing the sunflower image
      let cnv5 = createGraphics(200, 200); // creating a sub canvas
      cnv5.circle(100, 100, 100);
      cnv5.triangle(0, 0, 100, -200, 200, 100);
      cnv5.rect(0, 0, 50);
      cnv5.triangle(200, 200, 100, 100, 0, 200);
      img1.mask(cnv5);
      image(img1, 400, 25); // putting the sub canvas inside the main canvas

      // Blue Circle inside a square
      //rectangle inside circle / circle inside rectangle using clip function
      f = createGraphics(width, height); // creating a sub canvas  - the same size of the
      ctx1 = f.canvas.getContext("2d"); // getting the
      //cnv1.circle(100, 100, 100);
      f.strokeWeight(6); // outling the shapes
      f.rect(25, 0, 100, 100); //  x, y, sides
      ctx1.clip(); // clipping / getting the conditions/ context
      f.fill(0, 0, 200); // circle color
      f.circle(100, 100, 100); // position and size of the circle
      image(f, 50, 50); // putting the sub canvas inside the main canvas

      // Text mask inside the red square
      // show drawings inside of text using clip and erase functions
      // first what's behind the text:
      cnv4 = createGraphics(width, height); // creating sub canvas   - the same size of the main canvas
      ctx2 = cnv4.canvas.getContext("2d");
      cnv4.rect(100, 200, 200); // size of the rectangle
      ctx2.clip(); // clipping or getting the conext
      cnv4.fill(0, 200, 0); // circle color
      cnv4.circle(200, 300, 100); // the position and size
      image(cnv4, 0, 0);

      // and now for the text:
      cnv3 = createGraphics(width, height);
      cnv3.fill(200, 0, 0);
      cnv3.rect(100, 200, 200, 200); // x , y, width and height
      cnv3.erase();
      cnv3.textSize(100);
      cnv3.text("BSU", 100, 350); // txt, x, y
      image(cnv3, 0, 0); // putting the sub canvas inside the main canvas
      break;
    default:
      break;
  }
}

function keyPressed() {
  if (key === "1") {
    filterMode = 0;
  } else if (key === "2") {
    filterMode = 1;
  } else if (key === "3") {
    filterMode = 2;
  } else if (key === "4") {
    filterMode = 3;
  } else if (key === "5") {
    filterMode = 4;
  } else if (key === "6") {
    filterMode = 5;
  } else if (key === "7") {
    filterMode = 6;
  } else if (key === "8") {
    filterMode = 7;
  } else if (key === "9") {
    filterMode = 8;
  }
}
