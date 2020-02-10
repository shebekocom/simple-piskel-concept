import './css/style.css';
import './scss/style.scss';
import '@babel/polyfill';
import colorTool from './modules/colorTool'; // color tools
import fillTool from './modules/fillTool'; // fill bucket tools
import drawImage from './modules/drawImage'; // stroke tools
import addNewFrame from './modules/addNewFrame'; // add New Frame
import previewAnimation from './modules/previewAnimation'; // previe Animation
import getUPNG from './modules/getUPNG';
import getGIF from './modules/getGIF';
import login from './modules/login';
import { openFullscreen, closeFullscreen } from './modules/fullscreen';

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
let canvasFmame = document.querySelector('.frame-canvas');
let ctxFrame = canvasFmame.getContext('2d');
const previewCanvas = document.querySelector('.preview-container');
const ctxPreview = previewCanvas.getContext('2d');
let isMouseDown = false;
let isFullScreen = false;
let pos0 = [];
let pos1 = [];
let curTool = 'pensil';
let curColor = '#000000';
ctx.fillStyle = curColor;
let fps = document.querySelector('.range-fps').value;
// let prevColor = 'red';
let canvasSize = [32, 32];
[canvas.width, canvas.height] = canvasSize;
[canvasFmame.width, canvasFmame.height] = canvasSize;
[previewCanvas.width, previewCanvas.height] = canvasSize;

let pixelSize = 1;
const arrFrames = [canvasFmame.toDataURL()];
const arrBuffer = [canvasFmame.toDataURL()];

// переносим изображение на маленький фрейм
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
      break;

    case 'fillpixel':
      console.log('парсер цвета с учётом прозрачности');
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
      break;

    case 'stroke':
      pos1 = [x, y];
      drawImage(pos0, pos1, ctx, curColor, pixelSize);
      break;

    default:
      console.log('дефолтовый инструмент');
  }
}

// listener function

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
  canvasSize = [Number(item.dataset.canvasSize), Number(item.dataset.canvasSize)];
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const imageDataFrame = ctx.getImageData(0, 0, canvasFmame.width, canvasFmame.height);
  const imageDataPreview = ctx.getImageData(0, 0, previewCanvas.width, previewCanvas.height);
  [canvas.width, canvas.height] = canvasSize;
  [canvasFmame.width, canvasFmame.height] = canvasSize;
  [previewCanvas.width, previewCanvas.height] = canvasSize;
  ctx.putImageData(imageData, 0, 0);
  ctxFrame.putImageData(imageDataFrame, 0, 0);
  ctxPreview.putImageData(imageDataPreview, 0, 0);
}

function switchFrame(event, item) {
  document.querySelector('[data-title-name].selected_canvas').classList.toggle('selected_canvas');
  item.classList.toggle('selected_canvas');
}

function switchCanvas(event) {
  canvasFmame = document.querySelector(`[data-canvas-count='${event.target.dataset.canvasCount}']`);
  ctxFrame = canvasFmame.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(canvasFmame, 0, 0);
}

// mouse action

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
  if (curTool === 'fillpixel') {
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
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  arrFrames.splice(arrFrames.length - 1, 1, imageData);
  arrBuffer.splice(arrBuffer.length - 1, 1, imageData.data.buffer);
  previewAnimation(canvas, previewCanvas, ctxPreview, arrFrames, fps);
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

// listeners function app

function setUpListners() {
  // tool selection
  document.querySelectorAll('[data-tool]').forEach(item => {
    item.addEventListener('click', event => switchTool(event, item));
  });
  // size line selection
  document.querySelectorAll('[data-line-size]').forEach(item => {
    item.addEventListener('click', event => switchLineSize(event, item));
  });

  // color selection
  document.querySelector('#color1').addEventListener('input', event => {
    curColor = event.target.value;
  });

  // canvas size selection
  document.querySelectorAll('[data-canvas-size]').forEach(item => {
    item.addEventListener('click', event => switchCanvasSize(event, item));
  });

  // frame selection
  document.querySelector('.add-frame-action').addEventListener('click', () => {
    addNewFrame();
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // arrFrames.push(canvas.toDataURL());
    arrFrames.push(imageData);
    arrBuffer.push(imageData.data.buffer);
    console.log('arrBuffer: ', arrBuffer);

    const frames = document.querySelectorAll('[data-canvas-count]');
    canvasFmame = document.querySelector(`[data-canvas-count='${frames.length - 1}']`);
    ctxFrame = canvasFmame.getContext('2d');
    // clear main fraim
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // frame selection
    document.querySelectorAll('[data-title-name]').forEach(item => {
      item.addEventListener('click', event => switchFrame(event, item));
    });

    document.querySelectorAll('[data-canvas-count]').forEach(item => {
      item.addEventListener('click', event => switchCanvas(event));
    });
  });

  document.querySelector('.gif').addEventListener('click', () => {
    fps = document.querySelector('.range-fps').value;
    getGIF(arrFrames, fps, canvas);
  });

  document.querySelector('.upng').addEventListener('click', () => {
    fps = document.querySelector('.range-fps').value;
    const fileName = 'upng';
    getUPNG(fileName, arrBuffer, fps, canvas.width, canvas.height);
  });

  document.querySelector('.login').addEventListener('click', login);
  document.querySelector('.sign-in').addEventListener('click', login);
  document.querySelector('.create-sprite').addEventListener('click', () => {
    document.querySelector('.header_landing').style.visibility = 'hidden';
    document.querySelector('.container').style.visibility = 'visible';
  });

  canvas.addEventListener('mousedown', mouseDown);
  canvas.addEventListener('mouseup', mouseUp);
  canvas.addEventListener('mousemove', mouseMove);
  canvas.addEventListener('mouseleave', mouseLeave);
}

// keybord shotcurts

const boardHotKey = {
  keyP: 80,
  keyB: 66,
  keyO: 79,
  keyE: 69,
  keyA: 65,
  keyL: 76,
  keyS: 83,
  keyD: 68,
  keyC: 67,
};
document.addEventListener('keydown', event => {
  if (event.keyCode === boardHotKey.keyE) {
    curTool = 'eraser';
    document.querySelectorAll('[data-tool]').forEach(item => item.classList.remove('selected'));
    document.querySelector('.eraser').classList.toggle('selected');
  } else if (event.keyCode === boardHotKey.keyP) {
    curTool = 'pensil';
    document.querySelectorAll('[data-tool]').forEach(item => item.classList.remove('selected'));
    document.querySelector('.pensil').classList.toggle('selected');
  } else if (event.keyCode === boardHotKey.keyL) {
    curTool = 'stroke';
    document.querySelectorAll('[data-tool]').forEach(item => item.classList.remove('selected'));
    document.querySelector('.stroke').classList.toggle('selected');
  } else if (event.keyCode === boardHotKey.keyB) {
    curTool = 'fill';
    document.querySelectorAll('[data-tool]').forEach(item => item.classList.remove('selected'));
    document.querySelector('.fill').classList.toggle('selected');
  } else if (event.keyCode === boardHotKey.keyO) {
    curTool = 'color';
    document.querySelectorAll('[data-tool]').forEach(item => item.classList.remove('selected'));
    document.querySelector('.color').classList.toggle('selected');
  } else if (event.keyCode === boardHotKey.keyA) {
    curTool = 'fillpixel';
    document.querySelectorAll('[data-tool]').forEach(item => item.classList.remove('selected'));
    document.querySelector('.fillpixel').classList.toggle('selected');
  }
});

// Full screen
const previewContainer = document.querySelector('.preview-container');
document.querySelector('.preview-container').addEventListener('click', () => {
  if (isFullScreen) {
    closeFullscreen();
    isFullScreen = false;
  } else {
    openFullscreen(previewContainer);
    isFullScreen = true;
  }
});

// init function

function init() {
  setUpListners();
}
init();
