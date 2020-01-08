

# Piskel-clone

🚀Task in RS School on Stage #2

[![Paper](https://api.monosnap.com/file/download?id=Pkgq8oP7ulJg591OxK1uTFr9tHbXJL)]()

✅ Live Preview: <a href="https://simple-piskel.netlify.com/" target="_BLANK">https://simple-piskel.netlify.com/</a>

## Functional requirements
Tasj a simplified clone of the https://www.piskelapp.com/, a web-based tool for Spriting and Pixel art.

#### Functional scope DONE
- Canvas sizes: 32x32 / 64x64 / 128x128 user-defined units
- Tools
    - Pen. Required size is 1 unit. Other unit sizes (2, 3, 4) are optional.
    - Color select (Primary/Secondary)
    - Paint bucket should fill closed areas (flood fill)
    - Eraser
    - Stroke (to draw straight lines)
    - Ability to add frame

Functionality in development
 - Paint all pixels of the same color
- Preview
    - Small animation preview window in the top right corner 
    - Full screen mode
- Frames
    - Ability to delete a frame
    - Ability to reorder a frame via Drag and Drop
    - Ability to duplicate a frame
- Export the final result 
    - to local file system in any format (.gif / .apng)
- User session 
  - Current session should be saved and be accessible when user opens up the page again.
- Landing page. This page should include the following information:
   - Screenshots
   - Animation examples
   - Implemented functionality overview
   - Link to the editor itself
   - Information about the author
- Keyboard shortcuts 
  - All actions should be available via keyboard shortcuts
    - tools
    - export
    - add / delete / create frame
  - Keyboard shortcuts should be available on hover 
  - Modal window to change keyboard shortcuts

## Technical implementation:
1) Browser support: latest version of Google **Chrome**.
2) Usage of **JS/ES2015+** 
3) Have to use browser's Canvas API to draw frames.

#### Useful links:
- piskel app source files - https://github.com/piskelapp/piskel (for information!)
- some canvas tricks
  - https://developer.mozilla.org/ru/docs/Web/API/CanvasRenderingContext2D/drawImage
- animation
  - https://developer.mozilla.org/ru/docs/DOM/window.requestAnimationFrame
  - https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations
  - https://learn.javascript.ru/js-animation
  - https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe ( thanks @fomenkogregory)
- login
  - google - https://firebase.google.com/docs/auth/web/google-signin#handle_the_sign-in_flow_with_the_firebase_sdk
- canvas libs
  - http://fabricjs.com/
- previous videos
  - animation player bootstrap - https://www.youtube.com/watch?v=KpvMSDQGmpY
- full screen - http://qnimate.com/full-screen-api-tutorial-with-demo/
- refactorings
  - [magic number](https://ru.wikipedia.org/wiki/%D0%9C%D0%B0%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B5_%D1%87%D0%B8%D1%81%D0%BB%D0%BE_(%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5))  
- unit tests

  - [full coverage](https://github.com/davojta/2019q1-base-project-bootstrap/commit/1c5a7d801d1475ddec7d2d18c3a265923dd12b73)

### Lecture materials from @davojta analyzing the common mistakes appearing in the process 
- https://github.com/rolling-scopes-school/lectures/blob/master/lectures/refactoring.md

  <p align="center">
   Made with ❤️ by <a href="https://twitter.com/shebeko"><img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/shebeko?style=social"> </a>
  </p>
