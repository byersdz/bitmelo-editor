
import { combineReducers } from 'redux';

import scripts from './scripts';
import activeIndex from './activeIndex';

export default combineReducers( {
  scripts,
  activeIndex,
} );
