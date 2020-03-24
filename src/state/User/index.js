
import { combineReducers } from 'redux';

import currentUser from './currentUser';
import currentProject from './currentProject';
import projects from './projects';

export default combineReducers( {
  currentUser,
  currentProject,
  projects,
} );
