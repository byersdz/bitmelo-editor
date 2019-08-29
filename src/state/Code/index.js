
import { combineReducers } from 'redux';

import scripts from './scripts';
import activeIndex from './activeIndex';
import playLogs from './playLogs';

export default combineReducers( {
  scripts,
  activeIndex,
  playLogs,
} );
