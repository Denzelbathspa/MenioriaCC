var screen = 0;
var playerX;
var playerY;
var playerSize = 30;
var enemyX;
var enemyY;
var enemySize = 30;

var score = 0;
var lives = 3;

var bulletDamage = 1; // Initial bullet damage
var enemyCount = 1; // Initial number of enemies
var enemyHealth = 1; // Initial enemy health
var playerSpeed = 5; // Initial player speed
var enemyHP = enemyHealth; // For enemy hp calculations

var bullets = [];

var hitAlpha = 0; // Alpha value for red screen after hit
var hitDuration = 30; // Duration of red screen effect
var enemySwingSpeed = 2; // Speed of enemy swinging
var enemySwingDirection = 1; // Direction of enemy swinging

var powerUpChoices = ["Speed Up", "Damage Increase", "Health Up"]; // Available power-up choices
var selectedPowerUp = null; // Currently selected power-up

var backgroundMusic;
var fft;

var playerImg;
var asteroids = [];

// Load background music and player image
function preload() {
  backgroundMusic = loadSound('bgm.mp3');
  playerImg = loadImage('playerShip.png');
}

function setup() {
  createCanvas(600, 400);
  playerX = width / 2;
  playerY = height - 50;

  // Initialize FFT object
  fft = new p5.FFT();
  
  // Play background music and loop it
  backgroundMusic.loop();

  // Initialize asteroids
  for (var i = 0; i < 50; i++) {
    asteroids.push({
      x: random(width),
      y: random(-height, 0),
      size: random(5, 15),
      speed: random(1, 3)
    });
  }
}

function draw() {
  if (screen == 0) {
    startScreen();
  } else if (screen == 1) {
    gameOn();
  } else if (screen == 2) {
    endScreen();
  } else if (screen == 3) {
    powerUpSelectionScreen();
  }
}

function startScreen() {
  background(96, 157, 255);
  fill(255);
  textAlign(CENTER);
  textSize(20);
  text("WELCOME TO CATCH THE ENEMY!", width / 2, height / 2 - 20);
  text("Click to start", width / 2, height / 2 + 20);
  reset();
}

function gameOn() {
  background(0);
  textSize(20);
  fill(255);
  text("Score: " + score, 30, 30);
  text("Lives: " + lives, 530, 30);

  // Move player within screen boundaries
  if (keyIsDown(LEFT_ARROW) && playerX > playerSize / 2) {
    playerX -= playerSpeed;
  }
  if (keyIsDown(RIGHT_ARROW) && playerX < width - playerSize / 2) {
    playerX += playerSpeed;
  }

  // Draw asteroids
  for (var i = 0; i < asteroids.length; i++) {
    var asteroid = asteroids[i];
    fill(100);
    noStroke();
    ellipse(asteroid.x, asteroid.y, asteroid.size);
    asteroid.y += asteroid.speed;

    // Reset asteroid position if it goes off screen
    if (asteroid.y > height) {
      asteroid.x = random(width);
      asteroid.y = random(-height, 0);
      asteroid.size = random(5, 15);
      asteroid.speed = random(1, 3);
    }
  }

  // Move enemy side to side
  enemyX += enemySwingSpeed * enemySwingDirection;

  // Reverse direction if enemy reaches screen edge
  if (enemyX < 0 || enemyX > width) {
    enemySwingDirection *= -1;
  }

  // Draw player
  image(playerImg, playerX - playerSize / 2, playerY - playerSize / 2, playerSize, playerSize);

  // Draw bullets
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].y -= 10;
    fill(0, 0, 255);
    ellipse(bullets[i].x, bullets[i].y, 5, 10); // Draw bullet as a small ellipse

    // Check for collision with enemy
    if (
      dist(
        bullets[i].x,
        bullets[i].y,
        enemyX + enemySize / 2,
        enemyY + enemySize / 2
      ) <
      (5 + enemySize) / 2
    ) {
      // enemy Hp higher than 0 decrease hp based on bulletDamage
      if (enemyHP > 0) {
        enemyHP -= bulletDamage; // Decrease enemy health
        bullets.splice(i, 1); // Remove bullet
      }
      if (enemyHP <= 0) {
        score += 1;
        resetEnemy();
        bullets.splice(i, 1);
        enemyHP = enemyHealth; // Reset enemy health

        // Display power-up choices
        if (score % 7 == 0) {
          screen = 3; // Show power-up selection screen
        }

        // Change enemy health for every nth score
        if (score % 10 == 0) {
          enemyHealth += 2;
        }
      }
    }

    // Remove bullet if out of screen
    if (bullets[i] && bullets[i].y < 0) {
      bullets.splice(i, 1);
    }
  }

  // Draw enemy
  fill(0, 255, 0);
  rect(enemyX, enemyY, enemySize, enemySize);

  // Move enemy down
  enemyY += 0.5;

  // Check for collision with player
  if (
    dist(playerX, playerY, enemyX + enemySize / 2, enemyY + enemySize / 2) <
    (playerSize + enemySize) / 2
  ) {
    lives -= 1;
    if (lives == 0) {
      screen = 2; // Game over
    } else {
      hitAlpha = 255; // Set alpha value for red screen
      resetEnemy(); // Reset enemy position
    }
  }

  // Update and draw red screen after hit
  if (hitAlpha > 0) {
    fill(255, 0, 0, hitAlpha); // Red with variable alpha
    rect(0, 0, width, height); // Draw red screen
    hitAlpha = max(0, hitAlpha - 255 / hitDuration); // Decrease alpha gradually
  }

  // Check if enemy is out of bounds
  if (enemyY > height) {
    lives -= 1;
    if (lives == 0) {
      screen = 2; // Game over
    } else {
      hitAlpha = 255; // Set alpha value for red screen
      resetEnemy(); // Reset enemy position
    }
  }
}

function endScreen() {
  background(150);
  fill(255);
  textAlign(CENTER);
  textSize(20);
  text("GAME OVER", width / 2, height / 2 - 20);
  text("SCORE: " + score, width / 2, height / 2 + 20);
  text("Click to play again", width / 2, height / 2 + 60);
}

function powerUpSelectionScreen() {
  background(200);
  fill(0);
  textAlign(CENTER);
  textSize(20);
  text("Choose a power-up:", width / 2, height / 2 - 20);
  var boxHeight = 30;
  var boxWidth = 200;
  var boxSpacing = 40;
  for (var i = 0; i < powerUpChoices.length; i++) {
    var x = width / 2 - boxWidth / 2;
    var y = height / 2 + i * boxSpacing;
    // Check if mouse is hovering over the button
    if (
      mouseX >= x &&
      mouseX <= x + boxWidth &&
      mouseY >= y &&
      mouseY <= y + boxHeight
    ) {
      // Change appearance of button when hovered
      fill(150); // Change button fill color
    } else {
      fill(255); // Default button fill color
    }
    // Draw rectangle around the text
    stroke(0);
    strokeWeight(2);
    rect(x, y, boxWidth, boxHeight);
    // Draw text
    fill(0);
    noStroke();
    text(powerUpChoices[i], width / 2, y + boxHeight / 2);
  }
}

function mousePressed() {
  if (screen == 0) {
    screen = 1; // Start game
  } else if (screen == 2) {
    screen = 0; // Restart game
  } else if (screen == 3) {
    var boxHeight = 30;
    var boxWidth = 200;
    var boxSpacing = 40;
    for (var i = 0; i < powerUpChoices.length; i++) {
      var x = width / 2 - boxWidth / 2;
      var y = height / 2 + i * boxSpacing;
      if (
        mouseX >= x &&
        mouseX <= x + boxWidth &&
        mouseY >= y &&
        mouseY <= y + boxHeight
      ) {
        applyPowerUp(powerUpChoices[i]);
        screen = 1; // Resume game
        break;
      }
    }
  }
}

function keyPressed() {
  if (keyCode === 32) {
    // Spacebar to shoot
    bullets.push({ x: playerX, y: playerY });
  }
}

function reset() {
  score = 0; // Reset score
  lives = 3; // Reset lives
  bulletDamage = 1; // Reset Damage
  enemyHealth = 1; // Reset enemyHP
  playerSpeed = 5; // Reset speed
  resetEnemy(); // Reset enemy position
  bullets = []; // Clear bullets
}

function resetEnemy() {
  enemyX = random(width - enemySize);
  enemyY = 0 - enemySize;
}

function applyPowerUp(powerUp) {
  switch (powerUp) {
    case "Speed Up":
      if (playerSpeed >= 20) {
        playerSpeed = 20;
      } else {
        playerSpeed += 0.5; // Increase player speed
      }
      console.log("Player Speed set to: " + playerSpeed);
      break;

    case "Damage Increase":
      bulletDamage += 1;
      console.log("Bullet Damage set to: " + bulletDamage);
      break;
    case "Health Up":
      lives = 3; // Increase enemy health
      console.log("lives set to: " + lives);
      break;
    default:
      break;
  }
}
