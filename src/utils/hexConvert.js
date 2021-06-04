
export function colorToHex( color ) {
  const hex = color.toString( 16 );
  return hex.length === 1 ? `0${ hex }` : hex;
}

export function rgbToHex( r, g, b ) {
  return `${ colorToHex( r ) }${ colorToHex( g ) }${ colorToHex( b ) }`;
}

export function hexToRgb( hexString ) {
  const r = Number.parseInt( hexString.slice( 0, 2 ), 16 );
  const g = Number.parseInt( hexString.slice( 2, 4 ), 16 );
  const b = Number.parseInt( hexString.slice( 4 ), 16 );

  return { r, g, b };
}
