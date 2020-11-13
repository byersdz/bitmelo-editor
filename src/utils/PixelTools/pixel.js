export function drawPixelToBuffer( x, y, width, height, paletteId, buffer ) {
  if ( x < 0 || x >= width || y < 0 || y >= height ) {
    return;
  }
  buffer[width * y + x] = paletteId; // eslint-disable-line
}
