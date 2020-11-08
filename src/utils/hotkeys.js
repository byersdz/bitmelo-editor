
export const SELECT_ALL = 'SELECT_ALL';
export const DESELECT_SELECTION = 'DESELECT_SELECTION';
export const SAVE_PROJECT = 'SAVE_PROJECT';
export const TOGGLE_PANELS = 'TOGGLE_PANELS';
export const TOGGLE_PANEL_1 = 'TOGGLE_PANEL_1';
export const TOGGLE_PANEL_2 = 'TOGGLE_PANEL_2';
export const TOGGLE_PANEL_3 = 'TOGGLE_PANEL_3';
export const TOGGLE_PANEL_4 = 'TOGGLE_PANEL_4';
export const TOGGLE_REFERENCE = 'TOGGLE_REFERENCE';
export const TOGGLE_NAVIGATION = 'TOGGLE_NAVIGATION';

const keys = {};

function addHotkey( name, key, shift, ctrl, alt ) {
  keys[name] = {
    key,
    shift,
    ctrl,
    alt,
  };
}

addHotkey( SELECT_ALL, 65, false, true, false ); // a
addHotkey( DESELECT_SELECTION, 68, false, true, false ); // d
addHotkey( SAVE_PROJECT, 83, false, true, false ); // s
addHotkey( TOGGLE_PANELS, 192, false, false, false ); // `
addHotkey( TOGGLE_PANEL_1, 49, false, false, true ); // 1
addHotkey( TOGGLE_PANEL_2, 50, false, false, true ); // 2
addHotkey( TOGGLE_PANEL_3, 51, false, false, true ); // 3
addHotkey( TOGGLE_PANEL_4, 52, false, false, true ); // 4
addHotkey( TOGGLE_REFERENCE, 82, false, false, true ); // r
addHotkey( TOGGLE_NAVIGATION, 78, false, false, true ); // n

export function eventMatchesHotkey( event, hotkey ) {
  const keyInfo = keys[hotkey];
  if ( !keyInfo ) {
    return false;
  }

  if ( event.which !== keyInfo.key ) return false;
  if ( event.shiftKey !== keyInfo.shift ) return false;
  if ( event.ctrlKey !== keyInfo.ctrl ) return false;
  if ( event.altKey !== keyInfo.alt ) return false;

  return true;
}
