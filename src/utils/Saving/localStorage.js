
export const loadStateFromLocalStorage = () => {
  try {
    const state = localStorage.getItem( 'state' );
    if ( state === null ) {
      return undefined;
    }
    return JSON.parse( state );
  }
  catch ( e ) {
    return undefined;
  }
};

export const saveStateToLocalStorage = state => {
  try {
    const savedState = { ...state };

    // get rid of undo data
    savedState.tileset = savedState.tileset.present;
    savedState.tilemap = savedState.tilemap.present;

    const stateString = JSON.stringify( savedState );
    localStorage.setItem( 'state', stateString );
  }
  catch ( e ) {
    // ignore errors
  }
};
