
import React from 'react';

import Snippet from '../Snippet/Snippet';

import './QuickStart.scss';

class QuickStart extends React.Component {
  render() {
    return (
      <div className="api-quick-start">
        <h3>Engine</h3>
        <p>
          {
            `The Bitmelo engine uses
            Javascript as its programming language.
            `
          }
        </p>
        <p>
          {
            `
            The components of the Bitmelo engine
            are automatically added to the global scope for you by the editor in a global
            object named "bitmelo".
            `
          }
        </p>
        <p>
          {
            `
            In addition, an instance of bitmelo.Engine named "engine"
            is automatically created and begun for you by the editor. This "engine" object is
            what you will interact with to create your game.
            `
          }
        </p>
        <p>
          {
            `
            Use the "engine.onInit" callback function to perform initialization logic. This function is automatically
            called for you by the engine when it loads in a web page.
            `
          }
        </p>
        <p>
          {
            `
            Use the "engine.onUpdate" callback function to perform game and rendering logic.
            This function is automatically called for you by the engine once every frame in the game loop.
            `
          }
        </p>
        <h3>Screen</h3>
        <p>
          Bitmelo uses an indexed color palette with
          up to 256 colors. The origin( x = 0, y = 0 ) on the screen is on the bottom left. This differs
          from traditional screen coordinate systems which have the origin at the top left.
        </p>
        <h3>Input</h3>
        <p>
          Bitmelo has a standard input layout that contains the following buttons:
        </p>
        <Snippet
          text={
            `
Game Left: Left Arrow or J
Game Right: Right Arrow or L
Game Up: Up Arrow or I
Game Down: Down Arrow or K

Action 1: Z or Space
Action 2: X or D
Action 3: A or C
Action 4: S or V

Left Trigger: Q or Shift
Right Trigger: W or Alt

Pause: P or Enter

Menu Left: Left Arrow or J
Menu Right: Right Arrow or L
Menu Up: Up Arrow or I
Menu Down: Down Arrow or K

Menu Confirm: Z or Space
Menu Back: X or D
            `
          }
        />
        <p>
          In addition you can get the mouse position, left and right mouse button input, and keyboard input.
        </p>
        <h3>Tiles</h3>
        <p>
          {
            `
              You can draw a tile set in the Tile Editor. The size of a tile is defined in the Project tab.
              Be aware, if you change the tile size in the project tab it will delete all of your tile data.
              The "engine.screen.drawTile" function can be used to draw a tile.
            `
          }
        </p>
        <h3>Tilemaps</h3>
        <p>
          {
            `
              You can draw a tilemaps in the Tilemap Editor, using the tiles you created in the Tile Editor.
              The "engine.screen.drawMap" function can be used to draw a tilemap.
            `
          }
        </p>
        <h3>Sound</h3>
        <p>
          {
            `
              You can define up to 256 unique sounds in the Sound Editor.
              The "engine.audio.playSound" function can be used to play a sound.
            `
          }
        </p>

      </div>
    );
  }
}

export default QuickStart;
