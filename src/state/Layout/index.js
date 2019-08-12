
import { combineReducers } from 'redux';

import activeNavigationTab from './activeNavigationTab';
import navigationPanelIsOpen from './navigationPanelIsOpen';
import referencePanelIsOpen from './referencePanelIsOpen';
import activeSoundTicTab from './activeSoundTicTab';
import tileSelectorIsOpen from './tileSelectorIsOpen';
import tilemapEditor from './tilemapEditor';
import soundEditor from './soundEditor';
import referenceTabTitle from './referenceTabTitle';
import play from './play';
import tileEditor from './tileEditor';
import referenceRoutes from './referenceRoutes';

export default combineReducers( {
  activeNavigationTab,
  navigationPanelIsOpen,
  referencePanelIsOpen,
  activeSoundTicTab,
  tileSelectorIsOpen,
  tileEditor,
  tilemapEditor,
  soundEditor,
  referenceTabTitle,
  play,
  referenceRoutes,
} );
