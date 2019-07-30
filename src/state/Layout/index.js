
import { combineReducers } from 'redux';

import activeNavigationTab from './activeNavigationTab';
import navigationPanelIsOpen from './navigationPanelIsOpen';
import referencePanelIsOpen from './referencePanelIsOpen';
import activeSoundTicTab from './activeSoundTicTab';
import tileSelectorIsOpen from './tileSelectorIsOpen';
import tilemapEditor from './tilemapEditor';
import soundEditor from './soundEditor';

export default combineReducers( {
  activeNavigationTab,
  navigationPanelIsOpen,
  referencePanelIsOpen,
  activeSoundTicTab,
  tileSelectorIsOpen,
  tilemapEditor,
  soundEditor,
} );
