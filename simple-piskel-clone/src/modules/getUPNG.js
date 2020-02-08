import getFps from './utils';

const UPNG = require('upng-js');
const download = require('downloadjs');

export default function getUPNG(fileName, arrayBuffer, fps, width, height) {
  let name = fileName;
  if (fileName === '') {
    name = 'Sprite';
  }

  if (arrayBuffer === undefined) {
    return false;
  }
  const fpsApng = Array(arrayBuffer.length);
  for (let i = 0; i < fpsApng.length; i++) {
    fpsApng[i] = getFps(fps);
  }
  const test = UPNG.encode(arrayBuffer, width, height, 0, fpsApng);
  download(test, `${name}.apng`, 'apng');
  return true;
}
