import './css/style.css';
import './scss/style.scss';
import '@babel/polyfill';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let isMouseDown = false;
const pixelSize = 32;

canvas.width = '512';
canvas.height = '512';

// render app

function renderApp() {
  console.log('render app');
}

// bresenham algoritm

function drawImage(pos0, pos1) {
  let x0 = pos0[0];
  let y0 = pos0[1];
  const x1 = pos1[0];
  const y1 = pos1[1];
  const size = pixelSize;
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? size : -size;
  const sy = y0 < y1 ? size : -size;
  let err = dx - dy;

  while (true) {
    ctx.fillRect(x0, y0, size, size);
    ctx.fill();

    if (x0 === x1 && y0 === y1) {
      break;
    }
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
}

// listeners function app

function setUpListners() {
  let pos0 = [];
  let pos1 = [];
  canvas.addEventListener('mousedown', e => {
    isMouseDown = true;
    const size = pixelSize;
    const x = Math.floor(e.offsetX / size) * size;
    const y = Math.floor(e.offsetY / size) * size;

    pos0 = [x, y];
    pos1 = [x, y];
    ctx.fillRect(x, y, size, size);
    ctx.fill();
  });

  canvas.addEventListener('mouseup', () => {
    isMouseDown = false;
    ctx.beginPath();
  });

  canvas.addEventListener('mousemove', e => {
    const size = pixelSize;
    const x = Math.floor(e.offsetX / size) * size;
    const y = Math.floor(e.offsetY / size) * size;

    if (isMouseDown) {
      if (pos0[0] === undefined && pos0[1] === undefined) {
        pos0 = [x, y];
        pos1 = [x, y];
      } else {
        pos0 = [pos1[0], pos1[1]];
        pos1 = [x, y];
      }
      drawImage(pos0, pos1);
    }
  });

  canvas.addEventListener('mouseleave', () => {
    pos0 = [];
    pos1 = [];
  });
}

// init function

function init() {
  setUpListners();
  renderApp();
}
init();
