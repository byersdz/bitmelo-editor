
import React from 'react';

import Snippet from '../Snippet/Snippet';

import './InputSnippets.scss';

class InputSnippets extends React.Component {
  render() {
    return (
      <div className="api-input-snippets">
        <h3>Default Button Mappings</h3>
        <Snippet
          text={
            `
Game Left: Left Arrow
Game Right: Right Arrow
Game Up: Up Arrow
Game Down: Down Arrow

Action 1: Z
Action 2: X
Action 3: A
Action 4: S

Left Trigger: Q
Right Trigger: W

Pause: P

Menu Left: Left Arrow
Menu Right: Right Arrow
Menu Up: Up Arrow
Menu Down: Down Arrow

Menu Confirm: X
Menu Back: Z
            `
          }
        />
        <h3>Quick Access</h3>
        <Snippet
          text={
            `
// Mouse Position
engine.input.mouse.position.x
engine.input.mouse.position.y
engine.input.mouse.isOffScreen

// Left Mouse Button
engine.input.mouse.left.pressed
engine.input.mouse.left.down
engine.input.mouse.left.up

// Right Mouse Button
engine.input.mouse.right.pressed
engine.input.mouse.right.down
engine.input.mouse.right.up


// Left Game Button
engine.input.left.pressed
engine.input.left.down
engine.input.left.up

// Right Game Button
engine.input.right.pressed
engine.input.right.down
engine.input.right.up

// Up Game Button
engine.input.up.pressed
engine.input.up.down
engine.input.up.up

// Down Game Button
engine.input.down.pressed
engine.input.down.down
engine.input.down.up

// Action 1
engine.input.action1.pressed
engine.input.action1.down
engine.input.action1.up

// Action 2
engine.input.action2.pressed
engine.input.action2.down
engine.input.action2.up

// Action 3
engine.input.action3.pressed
engine.input.action3.down
engine.input.action3.up

// Action 4
engine.input.action4.pressed
engine.input.action4.down
engine.input.action4.up

// Left Trigger
engine.input.leftTrigger.pressed
engine.input.leftTrigger.down
engine.input.leftTrigger.up

// Right Trigger
engine.input.rightTrigger.pressed
engine.input.rightTrigger.down
engine.input.rightTrigger.up

// Pause
engine.input.pause.pressed
engine.input.pause.down
engine.input.pause.up

// Menu Left
engine.input.menuLeft.pressed
engine.input.menuLeft.down
engine.input.menuLeft.up

// Menu Right
engine.input.menuRight.pressed
engine.input.menuRight.down
engine.input.menuRight.up

// Menu Up
engine.input.menuUp.pressed
engine.input.menuUp.down
engine.input.menuUp.up

// Menu Down
engine.input.menuDown.pressed
engine.input.menuDown.down
engine.input.menuDown.up

// Menu Confirm
engine.input.menuConfirm.pressed
engine.input.menuConfirm.down
engine.input.menuConfirm.up

// Menu Back
engine.input.menuBack.pressed
engine.input.menuBack.down
engine.input.menuBack.up
            `
          }
        />
        <h3>Buttons</h3>
        <Snippet
          text={
            `
engine.input.getButtonPressed( bitmelo.Input.GAME_ACTION_ONE )

engine.input.getButtonDown( bitmelo.Input.GAME_PAUSE )

engine.input.getButtonUp( bitmelo.Input.GAME_LEFT )
            `
          }
        />
        <h3>Keys</h3>
        <Snippet
          text={
            `
engine.input.getKeyPressed( bitmelo.Keys.ENTER )

engine.input.getKeyDown( bitmelo.Keys.FOUR )

engine.input.getKeyUp( bitmelo.Keys.J_KEY )
            `
          }
        />
      </div>
    );
  }
}

export default InputSnippets;
