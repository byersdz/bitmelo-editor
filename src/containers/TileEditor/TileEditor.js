
import React from 'react';

import TileToolSettings from 'Containers/TileEditor/TileToolSettings/TileToolSettings';
import TileToolPicker from 'Containers/TileEditor/TileToolPicker/TileToolPicker';
import TilePixelEditor from 'Containers/TileEditor/TilePixelEditor/TilePixelEditor';

import './TileEditor.scss';

class TileEditor extends React.Component {
  render() {
    return (
      <div className="tile-editor">
        <TileToolSettings />
        <TileToolPicker />
        <TilePixelEditor />
      </div>
    );
  }
}

export default TileEditor;
