
import { combineReducers } from 'redux';

import activeNavigationTab from './activeNavigationTab';
import navigationPanelIsOpen from './navigationPanelIsOpen';

export default combineReducers( {
  activeNavigationTab,
  navigationPanelIsOpen,
} );
