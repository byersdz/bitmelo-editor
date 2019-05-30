
function getLowLinePositions( x1, y1, x2, y2 ) {
  const positions = [];
  const dx = x2 - x1;
  let dy = y2 - y1;
  let yIncrement = 1;
  if ( dy < 0 ) {
    yIncrement = -1;
    dy = -dy;
  }

  let decision = 2 * dy - dx;
  let y = y1;

  for ( let x = x1; x <= x2; x += 1 ) {
    positions.push( { x, y } );

    if ( decision > 0 ) {
      y += yIncrement;
      decision = decision - ( 2 * dx );
    }

    decision = decision + ( 2 * dy );
  }

  return positions;
}

function getHighLinePositions( x1, y1, x2, y2 ) {
  const positions = [];

  let dx = x2 - x1;
  const dy = y2 - y1;
  let xIncrement = 1;
  if ( dx < 0 ) {
    xIncrement = -1;
    dx = -dx;
  }

  let decision = 2 * dx - dy;
  let x = x1;

  for ( let y = y1; y <= y2; y += 1 ) {
    positions.push( { x, y } );

    if ( decision > 0 ) {
      x += xIncrement;
      decision = decision - ( 2 * dy );
    }

    decision = decision + ( 2 * dx );
  }

  return positions;
}

export function getLinePositions( x1, y1, x2, y2 ) {
  const positions = [];

  if ( x1 === x2 && y1 === y2 ) {
    // same coordinate, single pixel
    positions.push( { x: x1, y: y1 } );
    return positions;
  }

  if ( x1 === x2 ) {
    // vertical line
    const startY = y1 < y2 ? y1 : y2;
    const finishY = y1 < y2 ? y2 : y1;

    for ( let currentY = startY; currentY <= finishY; currentY += 1 ) {
      positions.push( { x: x1, y: currentY } );
    }

    return positions;
  }

  if ( y1 === y2 ) {
    // horizontal line
    const startX = x1 < x2 ? x1 : x2;
    const finishX = x1 < x2 ? x2 : x1;

    for ( let currentX = startX; currentX <= finishX; currentX += 1 ) {
      positions.push( { x: currentX, y: y1 } );
    }

    return positions;
  }

  if ( Math.abs( y2 - y1 ) < Math.abs( x2 - x1 ) ) {
    // slope is less than 1
    if ( x1 > x2 ) {
      return getLowLinePositions( x2, y2, x1, y1 );
    }
    else {
      return getLowLinePositions( x1, y1, x2, y2 );
    }
  }
  else {
    // slope is greater than 1
    if ( y1 > y2 ) {
      return getHighLinePositions( x2, y2, x1, y1 );
    }
    else {
      return getHighLinePositions( x1, y1, x2, y2 );
    }
  }
}
