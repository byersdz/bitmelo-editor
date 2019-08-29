
export function applyWheelScroll( event, scrollAmount ) {
  let newAmount = scrollAmount + event.deltaY;
  let didScrollUp = false;
  let didScrollDown = false;

  let cutoff = 99;
  if ( event.deltaMode === 1 ) {
    cutoff = 2;
  }
  else if ( event.deltaMode === 2 ) {
    cutoff = 1;
  }

  if ( newAmount < -cutoff ) {
    didScrollUp = true;
    newAmount = 0;
  }
  else if ( newAmount > cutoff ) {
    didScrollDown = true;
    newAmount = 0;
  }

  return {
    scrollAmount: newAmount,
    didScrollUp,
    didScrollDown,
  };
}
