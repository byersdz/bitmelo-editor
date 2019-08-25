
import { RESET_PROJECT, IMPORT_PROJECT_DATA } from 'State/globalActions';

// Actions
export const SET_SCRIPT = 'SET_SCRIPT';

// validation
export function validate( state ) {
  if ( !Array.isArray( state ) ) {
    return false;
  }

  for ( let i = 0; i < state.length; i += 1 ) {
    if ( typeof state[i] !== 'object' ) {
      return false;
    }

    if ( typeof state[i].text !== 'string' ) {
      return false;
    }
  }

  return true;
}

// Reducer
const initialState = [
  {
    text: `
const player = {
  x: 0,
  y: 0,
  color: 7,
};

engine.onInit = () => {
  player.x = engine.screen.width / 2;
  player.y = engine.screen.height / 2;
};

engine.onUpdate = () => {
  engine.screen.clear( 1 );

  if ( engine.input.left.pressed ) {
    player.x -= 1;
  }
  if ( engine.input.right.pressed ) {
    player.x += 1;
  }
  if ( engine.input.up.pressed ) {
   player.y += 1;
  }
  if ( engine.input.down.pressed ) {
    player.y -= 1;
  }

  if ( engine.input.action1.down ) {
    player.color = 9;
  }
  else if ( engine.input.action1.up ) {
    player.color = 7;
  }

  engine.screen.drawRect(
   player.x,      // x
    player.y,     // y
    8,            // width
    8,            // height
    player.color  // palette index
  );

  engine.screen.drawText(
    'Welcome to Bitmelo!',          // text
    engine.screen.width / 2 - 48,   // x
    engine.screen.height / 2 + 16,  // y
    2,                              // main palette index
    4,                              // outline palette index
    0                               // font
  );
};
`,
    cursorRow: 0,
    cursorColumn: 0,
  },

];

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return initialState;
    }
    case IMPORT_PROJECT_DATA: {
      try {
        const importedState = action.payload.code.scripts;
        if ( validate( importedState ) ) {
          return [...importedState];
        }
        return state;
      }
      catch ( e ) {
        return state;
      }
    }
    case SET_SCRIPT: {
      const { scriptIndex, script } = action.payload;
      const newState = [...state];
      newState[scriptIndex] = { ...script };
      return newState;
    }

    default:
      return state;
  }
}


// Action Creators
export function setScript( scriptIndex, script ) {
  return {
    type: SET_SCRIPT,
    payload: {
      scriptIndex,
      script,
    },
  };
}
