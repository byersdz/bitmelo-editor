
import React from 'react';

import Snippet from '../Snippet/Snippet';

import './ScreenSnippets.scss';

// Palette

class ScreenSnippets extends React.Component {
  render() {
    return (
      <div className="api-screen-snippets">
        <h3>Pixels</h3>
        <Snippet
          text={
            `
// Draw a pixel
engine.screen.setPixel(
  0, // x
  0, // y
  2  // paletteId
);

// get a pixel's color from the screen
const color = engine.screen.getPixel(
  0, // x
  0  // y
);
            `
          }
        />
        <h3>Lines</h3>
        <Snippet
          text={
            `
// Draw a line
engine.screen.drawLine(
  0,    // x1
  0,    // y1
  10,   // x2
  20,   // y2
  6     // paletteId
);
            `
          }
        />
        <h3>Rectangles</h3>
        <Snippet
          text={
            `
// Draw a filled rectangle
engine.screen.drawRect(
  0,    // x
  0,    // y
  24,   // width
  16,   // height
  2     // paletteId
);

// Draw a rectangle border
engine.screen.drawRectBorder(
  32,    // x
  32,    // y
  16,    // width
  16,    // height
  4      // paletteId
);
            `
          }
        />
        <h3>Circles</h3>
        <Snippet
          text={
            `
// Draw a filled circle
engine.screen.drawCircle(
  32,    // centerX
  32,    // centerY
  9,     // radius
  2      // paletteId
);

// Draw a circle border
engine.screen.drawCircleBorder(
  64,    // centerX
  32,    // centerY
  9,     // radius
  2      // paletteId
);

            `
          }
        />
        <h3>Text</h3>
        <Snippet
          text={
            `
// Draw text
engine.screen.drawText(
  'Hello World!',    // text
  0,                // x
  0,                // y
  2,                // main paletteId
  4,                // outline paletteId
  0                 // font index
);
            `
          }
        />
        <h3>Tiles</h3>
        <Snippet
          text={
            `
// Draw a tile
engine.screen.drawTile(
  1,    // gid
  0,    // x
  0,    // y
  0    // flip
);
            `
          }
        />
        <h3>Tilemaps</h3>
        <Snippet
          text={
            `
// Draw a tilemap
engine.screen.drawMap(
  0,      // originX on map
  0,      // originY on map
  -1,     // width
  -1,     // height
  0,      // screenX
  0,      // screenY
  0       // tilemap index
);
            `
          }
        />
        <h3>Palette</h3>
        <Snippet
          text={
            `
// Change a single palette color
engine.screen.setPaletteColorAtIndex(
  '00aaff',     // hex color
  1             // palette index
);

// Change the entire palette
engine.screen.setPalette(
  [
    '000000',
    '000000',
    'ffffff',
    'ff0000',
    '00ff00',
    '0000ff'
  ]
);
            `
          }
        />
      </div>
    );
  }
}

export default ScreenSnippets;
