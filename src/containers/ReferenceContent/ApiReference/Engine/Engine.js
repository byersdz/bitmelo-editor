
import React from 'react';

import Property from '../Property/Property';
import Method from '../Method/Method';

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
        <Property
          name="engine.realTimeSinceInit"
          type="number"
          description={
`
The number of seconds since init was called.
`
          }
        />
        <Property
          name="engine.realTimeSinceGameStart"
          type="number"
          description={
`
The number of seconds since the game was started.
`
          }
        />
        <h3>Callback Functions</h3>
        <Property
          name="engine.onConfigure"
          type="Function"
          description={
`
Function to be called to do engine configuration before initialization.
`
          }
          example={
`
engine.onConfigure = () => {
  console.log( 'Make configuration changes here' );
}
`
          }
        />
        <Property
          name="engine.onInit"
          type="Function"
          description={
`
Function to be called when the engine is initialized.
`
          }
          example={
`
engine.onInit = () => {
  console.log( 'The engine has initialized!' );
}
`
          }
        />
        <Property
          name="engine.onUpdate"
          type="Function"
          description={
`
Function to be called every update of the engine. Perform game logic and rendering here.
`
          }
          example={
`
engine.onUpdate = () => {
  // game logic
  // drawing code
}
`
          }
        />
        <Property
          name="engine.onDrawStartScreen"
          type="Function"
          description={
`
Function to draw the initial screen when the engine loads. Only seen when clickToBegin is true.
`
          }
          example={
`
engine.onDrawStartScreen = () => {
  // drawing logic here
}
`
          }
        />
        <Property
          name="engine.onUpdateStartTransition"
          type="Function"
          description={
`
Function to draw the transition frames after start click. Only seen when clickToBegin is true.
`
          }
          example={
`
engine.onUpdateStartTransition = () => {
  // drawing logic here
}
`
          }
        />
        <h3>Components</h3>
        <Property
          name="engine.screen"
          type="bitmelo.Screen"
          description={
`
Instance of the Screen class used by the Engine. Automatically created by the engine.
`
          }
          example={
`
// Draw palette color 3 at pixel:
// X: 10, Y: 20
engine.screen.setPixel( 10, 20, 3 );
`
          }
        />
        <Property
          name="engine.input"
          type="bitmelo.Input"
          description={
`
Instance of the Input class used by the Engine. Automatically created by the engine.
`
          }
          example={
`
if ( engine.input.mouse.left.down ) {
  console.log( 'Left mouse button clicked!' );
}
`
          }
        />
        <Property
          name="engine.audio"
          type="bitmelo.Audio"
          description={
`
Instance of the Audio class used by the Engine. Automatically created by the engine.
`
          }
          example={
`
// Play the sound at index 0
engine.audio.playSound(
  0,                // index
  bitmelo.Notes.C4, // note
  32,               // duration
  0.5,              // volume
  2                 // speed
);
`
          }
        />
        <Property
          name="engine.tileData"
          type="bitmelo.TileData"
          description={
`
Instance of the TileData class used by the Engine. Automatically created by the engine.
`
          }
          example={
`
engine.onInit = () => {
  // you should only add tilesets in onInit!
  engine.tileData.addTileset( myTilesetData );
}
`
          }
        />
        <Property
          name="engine.mapData"
          type="bitmelo.MapData"
          description={
`
Instance of the MapData class used by the Engine. Automatically created by the engine.
`
          }
          example={
`
// Get the tile GID of a tile in a tilemap
const tile = engine.mapData.getTile(
  0, // X position on the map
  0, // Y position on the map
  0, // The tilemap index
  0  // The layer on the tilemap
);
`
          }
        />
        <Property
          name="engine.fontData"
          type="bitmelo.FontData"
          description={
`
Instance of the FontData class used by the Engine.
Automatically created by the engine.
The Standard font is automatically added at index 0.
The Small font is automatically added at index 1.
`
          }
          example={
`
engine.fontData.addFont( myCoolFont );
`
          }
        />
        <h3>Configuration</h3>
        <Property
          name="engine.clickToBegin"
          type="boolean"
          description={
`
Should we require the user to click the screen before the game starts?
This stops a game from automatically starting in a web page which can be annoying.
`
          }
          example={
`
engine.clickToBegin = true;
`
          }
        />
        <Property
          name="engine.containerId"
          type="string"
          description={
`
The id of the div that the engine will be contained by.
`
          }
          example={
`
engine.containerId = 'bitmelo-container';
`
          }
        />
        <Property
          name="engine.startTransitionFrames"
          type="number"
          description={
`
Number of frames to show after begin click before the game starts. Only relevant when clickToBegin is true.
`
          }
          example={
`
// Make the start transition last 2 seconds
// at 60 fps
engine.startTransitionFrames = 120;
`
          }
        />
        <h2>Methods</h2>
        <Method
          name="engine.begin"
          description={
`
Begin running the engine.
This will perform initial setup, call the onInit function, and begin the game loop.
This is automatically called by the Bitmelo Editor.
`
          }
          example={
`
engine.begin();
`
          }
        />
      </div>
    );
  }
}

export default Engine;
