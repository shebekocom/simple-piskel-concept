import './css/style.css';
import './scss/style.scss';
import '@babel/polyfill';
import pensilTool from './modules/pensilTool'; // pensil tools
import colorTool from './modules/colorTool'; // color tools
import fillTool from './modules/fillTool'; // fill bucket tools
import eraserTool from './modules/eraserTool'; // eraser tools
import strokeTool from './modules/strokeTool'; // stroke tools
import drawImage from './modules/drawImage'; // stroke tools

const canvas = document.querySelector('.canvas');
const canvasFmame = document.querySelector('.frame-canvas');
const ctxFrame = canvasFmame.getContext('2d');

console.log('ctxFrame: ', ctxFrame);
console.log('canvasFmame: ', canvasFmame);
const ctx = canvas.getContext('2d');
let isMouseDown = false;
let pos0 = [];
let pos1 = [];
let curTool = '';
let curColor = '#000000';
const borderColor = '#000000';
console.log('borderColor: ', borderColor);
ctx.fillStyle = curColor;
// let prevColor = 'red';
let canvasSize = 32;
canvas.width = canvasSize;
canvas.height = canvasSize;
canvasFmame.width = canvasSize;
canvasFmame.height = canvasSize;
let pixelSize = 1;
console.log('pixelSize: ', pixelSize);
function newFrame() {
  ctxFrame.drawImage(canvas, 0, 0);
}
function setTool(x, y) {
  switch (curTool) {
    case 'pensil':
      if (pos0[0] === undefined && pos0[1] === undefined) {
        pos0 = [x, y];
        pos1 = [x, y];
      } else {
        pos0 = [pos1[0], pos1[1]];
        pos1 = [x, y];
      }
      drawImage(pos0, pos1, ctx, curColor, pixelSize);
      pensilTool();
      break;

    case 'color':
      curColor = colorTool(ctx, x, y, canvas, curColor);
      break;

    case 'fill':
      fillTool(ctx, x, y, canvas, curColor);
      break;

    case 'eraser':
      if (pos0[0] === undefined && pos0[1] === undefined) {
        pos0 = [x, y];
        pos1 = [x, y];
      } else {
        pos0 = [pos1[0], pos1[1]];
        pos1 = [x, y];
      }
      drawImage(pos0, pos1, ctx, curColor, pixelSize);
      eraserTool();
      break;

    case 'stroke':
      pos1 = [x, y];
      drawImage(pos0, pos1, ctx, curColor, pixelSize);
      strokeTool();
      break;

    default:
      console.log('дефолтовый инструмент');
  }
}

function switchTool(event, item) {
  document.querySelector('[data-tool].selected').classList.toggle('selected');
  item.classList.toggle('selected');
  curTool = item.dataset.tool;
}

function switchLineSize(event, item) {
  document.querySelector('[data-line-size].selected').classList.toggle('selected');
  item.classList.toggle('selected');
  pixelSize = Number(item.dataset.lineSize);
}

function switchCanvasSize(event, item) {
  document.querySelector('[data-canvas-size].selected').classList.toggle('selected');
  item.classList.toggle('selected');
  canvasSize = Number(item.dataset.canvasSize);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const imageDataFrame = ctx.getImageData(0, 0, canvasFmame.width, canvasFmame.height);
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  canvasFmame.width = canvasSize;
  canvasFmame.height = canvasSize;
  ctx.putImageData(imageData, 0, 0);
  ctxFrame.putImageData(imageDataFrame, 0, 0);
}

function mouseDown(event) {
  isMouseDown = true;
  const x = Math.floor(event.offsetX / (canvas.clientWidth / canvas.width));
  const y = Math.floor(event.offsetY / (canvas.clientHeight / canvas.height));
  pos0 = [x, y];
  if (curTool === 'pensil' || curTool === 'eraser') {
    if (curTool === 'pensil') {
      ctx.globalCompositeOperation = 'source-over';
    } else {
      ctx.globalCompositeOperation = 'destination-out';
    }
    pos1 = [x, y];
    ctx.fillStyle = curColor;
    ctx.fillRect(x, y, pixelSize, pixelSize);
    ctx.fill();
  }
  if (curTool === 'fill') {
    setTool(x, y);
  }
  if (curTool === 'color') {
    setTool(x, y);
  }
}

function mouseUp(event) {
  if (curTool === 'stroke') {
    const x = Math.floor(event.offsetX / (canvas.clientWidth / canvas.width));
    const y = Math.floor(event.offsetY / (canvas.clientHeight / canvas.height));
    setTool(x, y);
  }

  isMouseDown = false;
  ctx.beginPath();
  newFrame();
}

function mouseMove(event) {
  const x = Math.floor(event.offsetX / (canvas.clientWidth / canvas.width));
  const y = Math.floor(event.offsetY / (canvas.clientHeight / canvas.height));
  if (curTool === 'pensil' || curTool === 'eraser') {
    if (isMouseDown) {
      setTool(x, y);
    }
  }
}

function mouseLeave() {
  pos0 = [];
  pos1 = [];
}

// render app

function renderApp() {
  console.log('render app');
}

// listeners function app

function setUpListners() {
  document.querySelectorAll('[data-tool]').forEach(item => {
    item.addEventListener('click', event => switchTool(event, item));
  });
  document.querySelectorAll('[data-line-size]').forEach(item => {
    item.addEventListener('click', event => switchLineSize(event, item));
  });
  document.querySelector('#color1').addEventListener('input', event => {
    curColor = event.target.value;
  });
  document.querySelectorAll('[data-canvas-size]').forEach(item => {
    item.addEventListener('click', event => switchCanvasSize(event, item));
  });
  canvas.addEventListener('mousedown', mouseDown);
  canvas.addEventListener('mouseup', mouseUp);
  canvas.addEventListener('mousemove', mouseMove);
  canvas.addEventListener('mouseleave', mouseLeave);
}

// init function

function init() {
  setUpListners();
  renderApp();
}
init();
