
import compressProjectState from '../Convert/compressProjectState';

export const loadStateFromLocalStorage = () => {
  try {
    const state = localStorage.getItem( 'state' );
    const currentUser = localStorage.getItem( 'currentUser' );
    const currentProject = localStorage.getItem( 'currentProject' );

    if ( state === null ) {
      return undefined;
    }

    const stateData = JSON.parse( state );
    stateData.user = {};

    if ( currentUser ) {
      stateData.user.currentUser = JSON.parse( currentUser );
    }

    if ( currentProject ) {
      stateData.user.currentProject = JSON.parse( currentProject );
    }

    return stateData;
  }
  catch ( e ) {
    return undefined;
  }
};

export const saveStateToLocalStorage = state => {
  try {
    const savedState = compressProjectState( state );

    const currentUser = savedState.user.currentUser;
    const currentProject = savedState.user.currentProject;

    delete savedState.user;
    delete currentProject.publishedGame;

    const stateString = JSON.stringify( savedState );
    localStorage.setItem( 'state', stateString );
    localStorage.setItem( 'currentUser', JSON.stringify( currentUser ) );
    localStorage.setItem( 'currentProject', JSON.stringify( currentProject ) );
  }
  catch ( e ) {
    // ignore errors
  }
};
