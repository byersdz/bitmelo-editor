
export const SELECT_ALL = 'SELECT_ALL';

const keys = {};

function addHotkey( name, key, shift, ctrl, alt ) {
  keys[name] = {
    key,
    shift,
    ctrl,
    alt,
  };
}

addHotkey( SELECT_ALL, 65, false, true, false );

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
