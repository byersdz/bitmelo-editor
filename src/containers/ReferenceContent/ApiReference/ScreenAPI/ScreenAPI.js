
import React from 'react';

import Property from '../Property/Property';
import Method from '../Method/Method';

import './ScreenAPI.scss';

class ScreenAPI extends React.Component {
  render() {
    return (
      <div className="api-screen">
        <div className="description">
          {
`
Represents the game screen.
Has simple drawing functions using an indexed palette of a maximum of 256 colors.
The origin (0, 0) position of the screen is on the bottom left.
`
          }
        </div>
        <h2>Properties</h2>
        <Property
          name="screen.canvas"
          type="Canvas"
          description={
`
The DOM canvas used by this screen.
`
          }
        />
        <Property
          name="screen.conainerId"
          type="string"
          description={
`
The id of the container div to make the Screen a child of.
`
          }
        />
        <Property
          name="screen.container"
          type="object"
          description={
`
The dom object the Screen will be a child of.
`
          }
        />
        <Property
          name="screen.fontData"
          type="bitmelo.FontData"
          description={
`
Reference to an instance of FontData used by the screen.
`
          }
        />
        <Property
          name="screen.height"
          type="number"
          description={
`
How many pixels tall is the screen?
`
        }
        />
        <Property
          name="screen.hideCursor"
          type="boolean"
          description={
`
Should the cursor be hidden when placed over the screen?
`
        }
        />
        <Property
          name="screen.horizontalScaleCushion"
          type="number"
          description={
`
How many horizontal pixels to ignore when using a dynamic scale.
`
        }
        />
        <Property
          name="screen.mapData"
          type="bitmelo.MapData"
          description={
`
Reference to an instance of MapData used by the screen.
`
        }
        />
        <Property
          name="screen.maxScale"
          type="number"
          description={
`
Maximum scale of the screen.
`
        }
        />
        <Property
          name="screen.minScale"
          type="number"
          description={
`
Minimum scale of the screen.
`
        }
        />
        <Property
          name="screen.onScaleChange"
          type="function"
          description={
`
Callback that is called whenever the scale is changed. Used by the Engine to change values in the Input class.
`
          }
          example={
`
screen.onScaleChange = ( newScale ) => {
  console.log( newScale );
}
`
            }
        />
        <Property
          name="screen.rescaleOnWindowResize"
          type="boolean"
          description={
`
When using dynamic scaling, should we rescale when the window is resized?
`
        }
        />
        <Property
          name="screen.scale"
          type="number"
          description={
`
The scale of the pixels in the screen.
`
        }
        />
        <Property
          name="screen.scaleMode"
          type="number"
          description={
`
The scale mode of the screen.
`
          }
          example={
`// Screen.SCALE_CONSTANT = 1
// Screen.SCALE_FIT_WINDOW = 2

screen.scaleMode = bitmelo.Screen.SCALE_FIT_WINDOW;
`
          }
        />
        <Property
          name="screen.tileData"
          type="bitmelo.TileData"
          description={
`
Reference to an instance of TileData used by the screen.
`
        }
        />
        <Property
          name="screen.verticalScaleCushion"
          type="number"
          description={
`
How many vertical pixels to ignore when using a dynamic scale.
`
        }
        />
        <Property
          name="screen.width"
          type="number"
          description={
`
How many pixels wide is the screen?
`
        }
        />
        <h2>Methods</h2>
        <h3>Pixels</h3>
        <Method
          name="screen.getPixel"
          description={
`
Get the pallete index at a given position on the screen
`
          }
          params={
            [
              {
                name: 'x',
                type: 'number',
                description: 'The x position on the screen',
              },
              {
                name: 'y',
                type: 'number',
                description: 'The y position on the screen',
              },
            ]
          }
          example={
`
// get the palette id at position x: 10, y: 20
const color = screen.getPixel(
  10,
  20,
);
`
          }
        />
        <Method
          name="screen.setPixel"
          description={
`
Set a pixel on the screen. The origin (0, 0) of the screen is on the bottom left.
`
          }
          params={
            [
              {
                name: 'x',
                type: 'number',
                description: 'The x position on the screen',
              },
              {
                name: 'y',
                type: 'number',
                description: 'The y position on the screen',
              },
              {
                name: 'paletteId',
                type: 'number',
                description: 'palette color index',
              },
            ]
          }
          example={
`
//screen.setPixel(
  24, // x
  24, // y
  3,  // paletteId
);
`
          }
        />
        <Method
          name="screen.setPixelUnsafe"
          description={
`
Set a pixel on the screen, without doing any bounds checking
`
          }
          params={
            [
              {
                name: 'x',
                type: 'number',
                description: 'The x position on the screen',
              },
              {
                name: 'y',
                type: 'number',
                description: 'The y position on the screen',
              },
              {
                name: 'paletteId',
                type: 'number',
                description: 'palette color index',
              },
            ]
          }
          example={
`
screen.setPixelUnsafe(
  24, // x
  24, // y
  3,  // paletteId
);
`
          }
        />
        <h3>Primitives</h3>
        <Method
          name="screen.drawLine"
          description={
`
Draw a line between 2 positions.
`
          }
          params={
            [
              {
                name: 'x1',
                type: 'number',
                description: 'first x position',
              },
              {
                name: 'y1',
                type: 'number',
                description: 'first y position',
              },
              {
                name: 'x2',
                type: 'number',
                description: 'second x position',
              },
              {
                name: 'y2',
                type: 'number',
                description: 'second y position',
              },
              {
                name: 'paletteId',
                type: 'number',
                description: 'palette color index to draw',
              },
            ]
          }
          example={
`
// draw a line from the bottom left of the screen
// to the top right
screen.drawLine(
  0,                  // x1
  0,                  // y1
  screen.width - 1,   // x2
  screen.height - 1,  // y2
  1,                  // paletteId
);
`
          }
        />
        <Method
          name="screen.drawRect"
          description={
`
Draw a filled rectangle.
`
          }
          params={
            [
              {
                name: 'x',
                type: 'number',
                description: 'bottom left x position ',
              },
              {
                name: 'y',
                type: 'number',
                description: 'bottom left y position',
              },
              {
                name: 'width',
                type: 'number',
                description: 'width of the rectangle',
              },
              {
                name: 'height',
                type: 'number',
                description: 'height of the rectangle',
              },
              {
                name: 'paletteId',
                type: 'number',
                description: 'palette color index to draw',
              },
            ]
          }
          example={
`
const block = {
  x: 10,
  y: 20,
};

screen.drawRect(
  block.x,  // x
  block.y,  // y
  24,       // width
  24,       // height
  3,        // paletteId
);
`
          }
        />
        <Method
          name="screen.drawRectBorder"
          description={
`
Draw a rectangle border
`
          }
          params={
            [
              {
                name: 'x',
                type: 'number',
                description: 'bottom left x position ',
              },
              {
                name: 'y',
                type: 'number',
                description: 'bottom left y position',
              },
              {
                name: 'width',
                type: 'number',
                description: 'width of the rectangle',
              },
              {
                name: 'height',
                type: 'number',
                description: 'height of the rectangle',
              },
              {
                name: 'paletteId',
                type: 'number',
                description: 'palette color index to draw',
              },
            ]
          }
          example={
`
const block = {
  x: 10,
  y: 20,
};

screen.drawRectBorder(
  block.x,  // x
  block.y,  // y
  24,       // width
  24,       // height
  3,        // paletteId
);
`
          }
        />
        <Method
          name="screen.drawCircle"
          description={
`
Draw a filled circle
`
          }
          params={
            [
              {
                name: 'centerX',
                type: 'number',
                description: 'the x coordinate of the center of the circle',
              },
              {
                name: 'centerY',
                type: 'number',
                description: 'the y coordinate of the center of the circle',
              },
              {
                name: 'radius',
                type: 'number',
                description: 'the radius of the circle',
              },
              {
                name: 'paletteId',
                type: 'number',
                description: 'palette color index to draw',
              },
            ]
          }
          example={
`
const whiteColor = 2;
const irisColor = 1;

const eyePosition = {
  x: 30,
  y: 40,
}

// draw the white of the eye
screen.drawCircle(
  eyePosition.x,
  eyePosition.y,
  12,
  whiteColor
);

// draw the iris of the eye
screen.drawCircle(
  eyePosition.x,
  eyePosition.y,
  4,
  irisColor
);
`
          }
        />
        <Method
          name="screen.drawCircleBorder"
          description={
`
Draw a circle border
`
          }
          params={
            [
              {
                name: 'centerX',
                type: 'number',
                description: 'the x coordinate of the center of the circle',
              },
              {
                name: 'centerY',
                type: 'number',
                description: 'the y coordinate of the center of the circle',
              },
              {
                name: 'radius',
                type: 'number',
                description: 'the radius of the circle',
              },
              {
                name: 'paletteId',
                type: 'number',
                description: 'palette color index to draw',
              },
            ]
          }
          example={
`
const hoopPosition = {
  x: 50,
  y: 40,
}

screen.drawCircleBorder(
  hoopPosition.x,
  hoopPosition.y,
  9,
  4
);
`
          }
        />
        <h3>Text</h3>
        <h3>Tiles</h3>
        <h3>Palette</h3>
        <h3>Other</h3>
      </div>
    );
  }
}

export default ScreenAPI;
