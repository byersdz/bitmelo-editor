
import { combineReducers } from 'redux';

import activeNavigationTab from './activeNavigationTab';
import navigationPanelIsOpen from './navigationPanelIsOpen';
import referencePanelIsOpen from './referencePanelIsOpen';
import activeSoundTicTab from './activeSoundTicTab';
import tileEditor from './tileEditor';
import tilemapEditor from './tilemapEditor';
import soundEditor from './soundEditor';
import referenceTabTitle from './referenceTabTitle';
import play from './play';
import referenceRoutes from './referenceRoutes';
import colorPickerIsOpen from './colorPickerIsOpen';
import activePage from './activePage';
import modalCount from './modalCount';
import tileFlagsAreLocked from './tileFlagsAreLocked';
import showCircleTileFlags from './showCircleTileFlags';

export default combineReducers( {
  activeNavigationTab,
  navigationPanelIsOpen,
  referencePanelIsOpen,
  activeSoundTicTab,
  tileEditor,
  tilemapEditor,
  soundEditor,
  referenceTabTitle,
  play,
  referenceRoutes,
  colorPickerIsOpen,
  activePage,
  modalCount,
  tileFlagsAreLocked,
  showCircleTileFlags,
} );
