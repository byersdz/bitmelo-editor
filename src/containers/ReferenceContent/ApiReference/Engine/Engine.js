
import React from 'react';

import { renderProperty, renderMethod } from 'Utils/renderAPI';

import './Engine.scss';

class Engine extends React.Component {
  render() {
    return (
      <div className="api-engine">
        <div className="description">
          {
`An instance of Engine is your main interaction point for the Bitmelo game engine.
It maintains instances of the Screen, Input, Audio, TileData, FontData, and MapData components,
as well configuration settings.

The Bitmelo Editor will automatically create an instance of the Engine for you in the global scope named "engine".
`
          }
        </div>
        <h2>Properties</h2>
        <h3>Callback Functions</h3>
        {
          renderProperty( 'engine.onInit',
            'Function',
            'Function to be called when the engine is initialized.',
            `
engine.onInit = () => {
  console.log( 'The engine has initialized!' );
}
` )
        }
        {
          renderProperty( 'engine.onUpdate',
            'Function',
            'Function to be called every update of the engine. Perform game logic and rendering here.',
            `
engine.onUpdate = () => {
  // game logic
  // drawing code
}
` )
        }
        {
          renderProperty( 'engine.onDrawStartScreen',
            'Function',
            'Function to draw the initial screen when the engine loads. Only seen when clickToBegin is true.',
            `
engine.onDrawStartScreen = () => {
  // drawing logic here
}
` )
        }
        {
          renderProperty( 'engine.onUpdateStartTransition',
            'Function',
            'Function to draw the transition frames after start click. Only seen when clickToBegin is true.',
            `
engine.onUpdateStartTransition = () => {
  // drawing logic here
}
` )
        }
        <h3>Components</h3>
        {
          renderProperty( 'engine.screen',
            'bitmelo.Screen',
            'Instance of the Screen class used by the Engine. Automatically created by the engine.',
            `
// Draw palette color 3 at pixel:
// X: 10, Y: 20
engine.screen.setPixel( 10, 20, 3 );
` )
        }
        {
          renderProperty( 'engine.input',
            'bitmelo.Input',
            'Instance of the Input class used by the Engine. Automatically created by the engine.',
            `
if ( engine.input.mouse.left.down ) {
  console.log( 'Left mouse button clicked!' );
}
` )
        }
        {
          renderProperty( 'engine.audio',
            'bitmelo.Audio',
            'Instance of the Audio class used by the Engine. Automatically created by the engine.',
            `
// Play the sound at index 0
engine.audio.playSound(
  0,                // index
  bitmelo.Notes.C4, // note
  32,               // duration
  0.5,              // volume
  2                 // speed
);
` )
        }
        {
          renderProperty( 'engine.tileData',
            'bitmelo.TileData',
            'Instance of the TileData class used by the Engine. Automatically created by the engine.',
            `
engine.onInit = () => {
  // you should only add tile sets in onInit!
  engine.tileData.addTileset( myTilesetData );
}
` )
        }
        {
          renderProperty( 'engine.mapData',
            'bitmelo.MapData',
            'Instance of the MapData class used by the Engine. Automatically created by the engine',
            `
// Get the tile GID of a tile in a tilemap
const tile = engine.mapData.getTile(
  0, // X position on the map
  0, // Y position on the map
  0, // The tilemap index
  0  // The layer on the tilemap
);
` )
        }
        {
          renderProperty( 'engine.fontData',
            'bitmelo.FontData',
            `Instance of the FontData class used by the Engine.
Automatically created by the engine.
The Standard font is automatically added at index 0.
The Small font is automatically added at index 1.`,
            `
engine.fontData.addFont( myCoolFont );
` )
        }
        <h3>Configuration</h3>
        {
          renderProperty( 'engine.clickToBegin',
            'boolean',
            `Should we require the user to click the screen before the game starts?
            This stops a game from automatically starting in a web page which can be annoying.`,
            `
engine.clickToBegin = true;
` )
        }
        {
          renderProperty( 'engine.containerId',
            'string',
            'The id of the div that the engine will be contained by.',
            `
engine.containerId = 'bitmelo-container';
` )
        }
        {
          renderProperty( 'engine.startTransitionFrames',
            'number',
            'Number of frames to show after begin click before the game starts. Only relevant when clickToBegin is true.', // eslint-disable-line
            `
// Make the start transition last 2 seconds
// at 60 fps
engine.startTransitionFrames = 120;
` )
        }
        <h2>Methods</h2>
        {
          renderMethod( 'engine.begin',
            null,
            `Begin running the engine.
            This will perform initial setup, call the onInit function, and begin the game loop.
            This is automatically called by the Bitmelo Editor`,
            `
engine.begin();
            ` )
        }
      </div>
    );
  }
}

export default Engine;
