
import React from 'react';

import Property from '../Property/Property';
import Method from '../Method/Method';

import './InputAPI.scss';

class InputAPI extends React.Component {
  render() {
    return (
      <div className="api-input">
        <div className="description">
          {
`
Handles game input. A set of standard game buttons are definied which represent a game controller.
They include 4 way directional input, four action buttons, left and right triggers, and a pause button.
In addition there are standard menu inputs of 4 way directions, menu confirm, and menu back.
`
          }
        </div>
        <h2>Properties</h2>
        <h3>Quick Access</h3>
        <pre className="quick-access">
          <code>
            {
`// Mouse Position
input.mouse.position.x
input.mouse.position.y
input.mouse.isOffScreen

// Left Mouse Button
input.mouse.left.pressed
input.mouse.left.down
input.mouse.left.up

// Right Mouse Button
input.mouse.right.pressed
input.mouse.right.down
input.mouse.right.up


// Left Game Button
input.left.pressed
input.left.down
input.left.up

// Right Game Button
input.right.pressed
input.right.down
input.right.up

// Up Game Button
input.up.pressed
input.up.down
input.up.up

// Down Game Button
input.down.pressed
input.down.down
input.down.up

// Action 1
input.action1.pressed
input.action1.down
input.action1.up

// Action 2
input.action2.pressed
input.action2.down
input.action2.up

// Action 3
input.action3.pressed
input.action3.down
input.action3.up

// Action 4
input.action4.pressed
input.action4.down
input.action4.up

// Left Trigger
input.leftTrigger.pressed
input.leftTrigger.down
input.leftTrigger.up

// Right Trigger
input.rightTrigger.pressed
input.rightTrigger.down
input.rightTrigger.up

// Pause
input.pause.pressed
input.pause.down
input.pause.up

// Menu Left
input.menuLeft.pressed
input.menuLeft.down
input.menuLeft.up

// Menu Right
input.menuRight.pressed
input.menuRight.down
input.menuRight.up

// Menu Up
input.menuUp.pressed
input.menuUp.down
input.menuUp.up

// Menu Down
input.menuDown.pressed
input.menuDown.down
input.menuDown.up

// Menu Confirm
input.menuConfirm.pressed
input.menuConfirm.down
input.menuConfirm.up

// Menu Back
input.menuBack.pressed
input.menuBack.down
input.menuBack.up`
            }
          </code>
        </pre>
        <Property
          name="input.canvas"
          type="Canvas"
          description={
`
Reference to the canvas used for mouse input. Automatically added by the Engine.
`
          }
        />
        <Property
          name="input.canvasScale"
          type="number"
          description={
`
The scale of the canvas, aka the pixel size. Added automatically by the Engine
`
          }
        />
        <Property
          name="input.screenHeight"
          type="number"
          description={
`
The height of the game screen. Not affected by this.canvasScale. Added automatically by the Engine.
`
          }
        />
        <Property
          name="input.screenWidth"
          type="number"
          description={
`
The width of the game screen. Not affected by this.canvasScale. Added automatically by the Engine.
`
          }
        />
        <h2>Methods</h2>
        <Method
          name="input.clearInput"
          description={
`
Clear out all of the input.
`
          }
        />
        <Method
          name="input.getButtonPressed"
          description={
`
return true if the standard game button is currently held down
`
          }
          params={
            [
              {
                name: 'buttonCode',
                type: 'number',
                description: 'The button to check',
              },
            ]
          }
          example={
`
// is the left game button being pressed?
const leftPressed = input.getButtonPressed(
  bitmelo.Input.GAME_LEFT
);
`
          }
        />
        <Method
          name="input.getButtonDown"
          description={
`
return true if the standard game button was pressed down this frame
`
          }
          params={
            [
              {
                name: 'buttonCode',
                type: 'number',
                description: 'The button to check',
              },
            ]
          }
          example={
`
// was the action 1 button pressed this frame?
const shouldJump = input.getButtonDown(
  bitmelo.Input.GAME_ACTION_ONE
);
`
          }
        />
        <Method
          name="input.getButtonUp"
          description={
`
return true if the standard game button was released this frame
`
          }
          params={
            [
              {
                name: 'buttonCode',
                type: 'number',
                description: 'The button to check',
              },
            ]
          }
          example={
`
// was the left trigger released this frame?
const shouldDrop = input.getButtonUp(
  bitmelo.Input.GAME_LEFT_TRIGGER
);
`
          }
        />
        <Method
          name="input.getKeyPressed"
          description={
`
return true if the keyboard key is currently held down
`
          }
          params={
            [
              {
                name: 'keyCode',
                type: 'number',
                description: 'The key to check',
              },
            ]
          }
          example={
`
// is the A key being pressed?
const aPressed = input.getKeyPressed(
  bitmelo.Keys.A_KEY
);
`
          }
        />
        <Method
          name="input.getKeyDown"
          description={
`
return true if the keyboard key was pressed down this frame
`
          }
          params={
            [
              {
                name: 'keyCode',
                type: 'number',
                description: 'The key to check',
              },
            ]
          }
          example={
`
// was the escape key pressed this frame?
const shouldPause = input.getKeyDown(
  bitmelo.Keys.ESCAPE
);
`
          }
        />
        <Method
          name="input.getKeyUp"
          description={
`
return true if the keyboard key was released this frame
`
          }
          params={
            [
              {
                name: 'keyCode',
                type: 'number',
                description: 'The key to check',
              },
            ]
          }
          example={
`
// was the enter key released this frame?
const shouldFlip = input.getKeyUp(
  bitmelo.Keys.ENTER
);
`
          }
        />
        <Method
          name="input.init"
          description={
`
Do initial setup. Add event listeners. Called automatically by the Engine.
`
          }
        />
        <Method
          name="input.pollInput"
          description={
`
Update the input, should be done first thing in the game loop. Called automatically by the Engine.
`
          }
        />
        <h2>Constants</h2>
        <pre className="quick-access">
          <code>
            {
`Input.GAME_LEFT           // 0
Input.GAME_RIGHT          // 1
Input.GAME_UP             // 2
Input.GAME_DOWN           // 3
Input.GAME_ACTION_ONE     // 4
Input.GAME_ACTION_TWO     // 5
Input.GAME_ACTION_THREE   // 6
Input.GAME_ACTION_FOUR    // 7
Input.GAME_PAUSE          // 8
Input.GAME_LEFT_TRIGGER   // 9
Input.GAME_RIGHT_TRIGGER  // 10

Input.MENU_LEFT           // 11
Input.MENU_RIGHT          // 12
Input.MENU_UP             // 13
Input.MENU_DOWN           // 14
Input.MENU_CONFIRM        // 15
Input.MENU_BACK           // 16`
            }
          </code>
        </pre>
      </div>
    );
  }
}

export default InputAPI;
