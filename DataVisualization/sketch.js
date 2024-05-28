let table;
let gamesData = [];
let maxHeight = 400; // Maximum height of the bars

function preload() {
  // Load the CSV file
  table = loadTable('PeakPlayerCountOnGames.csv', 'csv', 'header');
}

function setup() {
  createCanvas(1000, maxHeight + 100); // Adjust canvas height to accommodate bars
  background(28);

  // Process the table and store the data in an array
  for (let i = 0; i < table.getRowCount(); i++) {
    let gameName = table.getString(i, 'Game Name');
    let peakPlayers = table.getString(i, 'Peak Players');
    // Remove commas from the peakPlayers string and convert it to a number
    peakPlayers = int(peakPlayers.replace(/,/g, ''));
    gamesData.push({ gameName, peakPlayers });
  }

  // Log the array to the console to verify
  console.log(gamesData);

  drawBars();
}

function drawBars() {
  let barWidth = width / gamesData.length;
  let maxData = max(gamesData.map(data => data.peakPlayers));
  
  // Draw the title at the top center of the canvas
  fill(255);
  textSize(24);
  textAlign(CENTER);
  text("PEAK PLAYERS GRAPH ON POPULAR GAMES", width / 2, 30);
  
  // Define color gradient
  let minColor = color(0, 0, 255); // Lowest intensity (blue)
  let maxColor = color(255, 0, 0); // Highest intensity (red)
  
  // Draw bars
  for (let i = 0; i < gamesData.length; i++) {
    let barHeight = map(gamesData[i].peakPlayers, 0, maxData, 0, maxHeight); // Map data to maximum height
    let x = i * barWidth;
    let y = height - barHeight;
    
    // Map intensity to color gradient
    let intensity = map(gamesData[i].peakPlayers, 0, maxData, 0, 1);
    let barColor = lerpColor(minColor, maxColor, intensity);
    
    fill(barColor);
    rect(x, y, barWidth, barHeight);
    
    // Display data value on top of each bar
    fill(255);
    textSize(12);
    textAlign(CENTER);
    text(gamesData[i].peakPlayers, x + barWidth / 2, y - 5);
    
    // Display game name below each bar and rotate it vertically
    push();
    translate(x + barWidth / 2, height - 5);
    rotate(-HALF_PI); // Rotate 90 degrees counterclockwise
    textAlign(RIGHT);
    text(gamesData[i].gameName, 0, 0);
    pop();
  }
}
