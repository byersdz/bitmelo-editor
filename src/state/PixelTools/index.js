
import { combineReducers } from 'redux';

import selectedTool from './selectedTool';
import selectedTileTool from './selectedTileTool';
import pixelToolSettings from './pixelToolSettings';

export default combineReducers( {
  selectedTool,
  selectedTileTool,
  pixelToolSettings,
} );
