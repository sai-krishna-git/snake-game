import {
  SNAKE_SPEED,
  update as updateSnake,
  draw as drawSnake,
  snakeIntersection,
  getSnakeHead,
} from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';

let lastRenderTime = 0;

const gameBoard = document.getElementById('game-board');
let gameOver = false;

function main(CurrentTime) {
  console.log(gameOver);
  if (gameOver) {
    if (confirm('You lost. Press ok to restart.')) {
      window.location = '/';
    }
    return;
  }
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (CurrentTime - lastRenderTime) / 1000;
  //console.log(secondsSinceLastRender);
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  lastRenderTime = CurrentTime;

  update();
  draw();
}
window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = '';
  drawSnake(gameBoard);
  drawFood(gameBoard);
}
function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
