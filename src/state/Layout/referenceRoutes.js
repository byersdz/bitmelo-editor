
import { PIXEL_TUTORIALS } from 'Utils/articles';

import {
  ABOUT_TAB,
  PROJECT_TAB,
  PLAY_TAB,
  CODE_TAB,
  TILE_TAB,
  TILEMAP_TAB,
  SOUND_TAB,
} from './activeNavigationTab';

export const CONSOLE = 'CONSOLE';
export const ARTICLES = 'ARTICLES';
export const API = 'API';

// Actions
export const SET_REFERENCE_ROUTE = 'SET_REFERENCE_ROUTE';

// Reducer
const initialState = {};

function addInitialStateItem( section, route = [] ) {
  const cached = {};
  if ( route.length > 0 ) {
    cached[route[0]] = route;
  }
  initialState[section] = {
    current: route,
    cached, // save the routes of each item in the bottom bar tab in the reference panel
  };
}

addInitialStateItem( ABOUT_TAB );
addInitialStateItem( PROJECT_TAB );
addInitialStateItem( PLAY_TAB, [CONSOLE] );
addInitialStateItem( CODE_TAB, [API] );
addInitialStateItem( TILE_TAB, [ARTICLES, PIXEL_TUTORIALS] );
addInitialStateItem( TILEMAP_TAB, [ARTICLES, PIXEL_TUTORIALS] );
addInitialStateItem( SOUND_TAB );


export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case SET_REFERENCE_ROUTE: {
      const { section, route } = action.payload;
      const newState = { ...state };
      const newRouteSection = { ...state[section] };
      newRouteSection.current = [...route];
      newRouteSection.cached = { ...newRouteSection.cached };
      if ( route.length > 0 ) {
        newRouteSection.cached[route[0]] = [...route];
      }
      newState[section] = newRouteSection;
      return newState;
    }
    default: return state;
  }
}

// Action Creators
export function setReferenceRoute( section, route ) {
  return {
    type: SET_REFERENCE_ROUTE,
    payload: { section, route },
  };
}
