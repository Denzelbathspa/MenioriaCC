var word = "Hello Bath Spa!",
    word2 = "This is my work",
    word3 = "In Typography.";

var font1, font2, font3;

function preload() {
  font1 = loadFont("BlackOpsOne-Regular.ttf");
  font2 = loadFont("Comfortaa-Light.ttf");
  font3 = loadFont("ShadowsIntoLight.ttf");
}

function setup() {
  createCanvas(600, 400);
  background(230);
  
  fill(100);
  textFont(font1, 60);
  textAlign(CENTER);
  text(word, width / 2, height / 2 - 100);
  
  fill(50);
  textFont(font2, 65);
  textAlign(CENTER);
  text(word2, width / 2, height / 2);
  
  fill(0);
  textFont(font3, 60);
  textAlign(CENTER);
  text(word3, width / 2, height / 2 + 100);
}
