
import React from 'react';

import PixelEditor from 'Containers/PixelEditor/PixelEditor';

import './TilePixelEditor.scss';

class TilePixelEditor extends React.Component {
  render() {
    const data = new Array( 128 * 64 );

    for ( let i = 0; i < data.length; i += 1 ) {
      if ( i % 5 === 0 ) {
        data[i] = 1;
      }
      else {
        data[i] = 0;
      }
    }
    const dataWidth = 128;
    const dataHeight = 64;

    return (
      <PixelEditor
        data={ data }
        dataWidth={ dataWidth }
        dataHeight={ dataHeight }
      />
    );
  }
}

export default TilePixelEditor;
