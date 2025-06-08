const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

let leftY = canvas.height / 2 - paddleHeight / 2;
let rightY = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 3;

let playerControlled = true;
let flashTimer = 0;
let audioStarted = false;

// Use <audio> elements for better preload
const bgMusic = document.getElementById('bgMusic');
const paddleHitSound = document.getElementById('paddleHitSound');
const scoreSound = document.getElementById('scoreSound');

// Function to start audio context and play sounds
function startAudio() {
  if (audioStarted) return;
  bgMusic.play().catch(err => console.warn('bgMusic play prevented:', err));
  paddleHitSound.play().catch(err => console.warn('paddleHitSound play prevented:', err));
  scoreSound.play().catch(err => console.warn('scoreSound play prevented:', err));
  audioStarted = true;
}

// Listen for user gesture
document.addEventListener('keydown', (e) => {
  startAudio();
  if (e.key === 'ArrowUp') rightY = Math.max(0, rightY - 20);
  if (e.key === 'ArrowDown') rightY = Math.min(canvas.height - paddleHeight, rightY + 20);
  if (e.key === 't') playerControlled = !playerControlled;
});
document.addEventListener('click', startAudio);

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = (Math.random() > 0.5 ? 1 : -1) * 3;
  flashTimer = 20;
}

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawRetroGrid() {
  ctx.strokeStyle = 'rgba(255,255,255,0.1)';
  for (let x = 0; x < canvas.width; x += 20) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 20) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function draw() {
  if (flashTimer > 0) {
    drawRect(0, 0, canvas.width, canvas.height, flashTimer % 4 < 2 ? 'red' : 'black');
    flashTimer--;
  } else {
    drawRect(0, 0, canvas.width, canvas.height, 'black');
  }
  drawRetroGrid();
  drawRect(0, leftY, paddleWidth, paddleHeight, 'lime');
  drawRect(canvas.width - paddleWidth, rightY, paddleWidth, paddleHeight, 'cyan');
  drawRect(ballX, ballY, ballSize, ballSize, 'white');
}

function update() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY <= 0 || ballY + ballSize >= canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  leftY = ballY - paddleHeight / 2 + ballSize / 2;

  if (!playerControlled) {
    rightY = ballY - paddleHeight / 2 + ballSize / 2;
  } else {
    rightY = Math.max(0, Math.min(canvas.height - paddleHeight, rightY));
  }

  if (ballX <= paddleWidth) {
    if (ballY + ballSize >= leftY && ballY <= leftY + paddleHeight) {
      ballSpeedX = -ballSpeedX;
      paddleHitSound.play().catch(() => {});
    } else {
      scoreSound.play().catch(() => {});
      resetBall();
    }
  }

  if (ballX + ballSize >= canvas.width - paddleWidth) {
    if (ballY + ballSize >= rightY && ballY <= rightY + paddleHeight) {
      ballSpeedX = -ballSpeedX;
      paddleHitSound.play().catch(() => {});
    } else {
      scoreSound.play().catch(() => {});
      resetBall();
    }
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();