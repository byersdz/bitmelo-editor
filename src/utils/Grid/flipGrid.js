import cloneDeep from 'lodash/cloneDeep';

export function flipGridHorizontal( grid, width, height ) {
  const newGrid = cloneDeep( grid );

  for ( let y = 0; y < height; y += 1 ) {
    for ( let x = 0; x < width; x += 1 ) {
      const sourceIndex = y * width + x;
      const destIndex = y * width + ( width - x - 1 );
      newGrid[destIndex] = grid[sourceIndex];
    }
  }
  return newGrid;
}

export function flipGridVertical( grid, width, height ) {
  const newGrid = cloneDeep( grid );

  for ( let y = 0; y < height; y += 1 ) {
    for ( let x = 0; x < width; x += 1 ) {
      const sourceIndex = y * width + x;
      const destIndex = ( height - y - 1 ) * width + x;
      newGrid[destIndex] = grid[sourceIndex];
    }
  }
  return newGrid;
}

export default function flipGrid( grid, width, height, horizontal, vertical ) {
  let newGrid = grid;

  if ( horizontal ) {
    newGrid = flipGridHorizontal( newGrid, width, height );
  }

  if ( vertical ) {
    newGrid = flipGridVertical( newGrid, width, height );
  }

  return newGrid;
}
