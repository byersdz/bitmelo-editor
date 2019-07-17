
import { combineReducers } from 'redux';

import selectedTool from './selectedTool';
import selectedTileTool from './selectedTileTool';

export default combineReducers( {
  selectedTool,
  selectedTileTool,
} );
