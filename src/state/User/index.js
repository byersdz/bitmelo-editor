
import { combineReducers } from 'redux';

import currentUser from './currentUser';
import currentProject from './currentProject';

export default combineReducers( {
  currentUser,
  currentProject,
} );
