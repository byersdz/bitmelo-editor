
import React from 'react';

import ToolPicker from 'Components/ToolPicker/ToolPicker';

import './TilemapToolPicker.scss';

class TilemapToolPicker extends React.Component {
  render() {
    const tools = [
      { key: 'one', title: 'Draw', icon: 'play' },
      { key: 'two', title: 'Eraser', icon: 'play' },
    ];

    return (
      <ToolPicker
        tools={ tools }
        selectedTool="one"
        onSelectedToolChange={ () => console.log( 'tilemap tool change' ) }
      />
    );
  }
}

export default TilemapToolPicker;
