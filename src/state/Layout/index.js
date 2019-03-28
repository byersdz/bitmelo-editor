
import { combineReducers } from 'redux';

import activeNavigationTab from './activeNavigationTab';
import navigationPanelIsOpen from './navigationPanelIsOpen';
import referencePanelIsOpen from './referencePanelIsOpen';

export default combineReducers( {
  activeNavigationTab,
  navigationPanelIsOpen,
  referencePanelIsOpen,
} );
