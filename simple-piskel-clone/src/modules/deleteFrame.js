document.querySelector('.frame-list').addEventListener('click', () => {
  allFrames.forEach(item => {
    item.addEventListener('click', event => {
      deleteFrame(event, allFrames);
      copyFrame(event);
      switchFrame(event, item);
    });
  });
});

export default function deleteFrame(event, allFrames) {
  console.log(event.target.parentNode);
  if (event.target.classList.value === 'del-frame') event.target.parentNode.remove();
  allFrames.forEach(item => {
    item.classList.remove('selected_canvas');
  });
  document.querySelector('.frame-title:last-child').classList.add('selected_canvas');
}
