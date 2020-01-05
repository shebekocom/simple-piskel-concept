import './css/style.css';
import './scss/style.scss';
import '@babel/polyfill';
import pensilTool from './modules/pensilTool'; // pensil tools
import colorTool from './modules/colorTool'; // color tools
import fillTool from './modules/fillTool'; // fill bucket tools
import eraserTool from './modules/eraserTool'; // eraser tools
import strokeTool from './modules/strokeTool'; // stroke tools
import drawImage from './modules/drawImage'; // stroke tools

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
console.log('ctx: ', ctx);
canvas.width = '512';
canvas.height = '512';
let isMouseDown = false;
let pos0 = [];
let pos1 = [];
let curTool = '';
let curColor = 'black';
ctx.fillStyle = curColor;
// let prevColor = 'red';
let pixelSize = 1;

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
      drawImage(pos0, pos1, ctx, pixelSize, curColor);
      pensilTool();
      break;

    case 'color':
      colorTool();
      break;

    case 'fill':
      fillTool();
      break;

    case 'eraser':
      eraserTool();
      break;

    case 'stroke':
      strokeTool();
      break;

    default:
      console.log('дефолтовый инструмент');
  }
}

function switchTool(event, item) {
  // if (event.target.tagName === 'UL') return;
  // document.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
  // event.target.closest('li').classList.add('selected');
  // curTool = event.target.closest('li').dataset.name;

  document.querySelector('[data-tool].selected').classList.toggle('selected');
  item.classList.toggle('selected');
  curTool = item.dataset.tool;
}

function switchLineSize(event, item) {
  document.querySelector('[data-line-size].selected').classList.toggle('selected');
  item.classList.toggle('selected');
  pixelSize = Number(item.dataset.lineSize);
}

function mouseDown(event) {
  isMouseDown = true;
  // const size = pixelSize;
  const x = Math.floor(event.offsetX / pixelSize) * pixelSize;
  const y = Math.floor(event.offsetY / pixelSize) * pixelSize;
  if (curTool !== 'pensil') return;
  pos0 = [x, y];
  pos1 = [x, y];
  ctx.fillStyle = curColor;
  ctx.fillRect(x, y, pixelSize, pixelSize);
  ctx.fill();
}

function mouseUp() {
  isMouseDown = false;
  ctx.beginPath();
}

function mouseMove(event) {
  // const size = pixelSize;
  const x = Math.floor(event.offsetX / pixelSize) * pixelSize;
  const y = Math.floor(event.offsetY / pixelSize) * pixelSize;
  if (isMouseDown) {
    setTool(x, y);
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
  // document.querySelector('.list_tools').addEventListener('click', event => switchTool(event));
  document.querySelectorAll('[data-tool]').forEach(item => {
    item.addEventListener('click', event => switchTool(event, item));
  });
  document.querySelectorAll('[data-line-size]').forEach(item => {
    item.addEventListener('click', event => switchLineSize(event, item));
  });
  document.querySelector('#color1').addEventListener('input', event => {
    curColor = event.target.value;
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
