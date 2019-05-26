
import React from 'react';

import TileToolSettings from 'Containers/TileEditor/TileToolSettings/TileToolSettings';
import TileToolPicker from 'Containers/TileEditor/TileToolPicker/TileToolPicker';
import TilePixelEditor from 'Containers/TileEditor/TilePixelEditor/TilePixelEditor';
import PalettePicker from 'Containers/PalettePicker/PalettePicker';

import './TileEditor.scss';

class TileEditor extends React.Component {
  render() {
    return (
      <div className="tile-editor">
        <TileToolSettings />
        <TileToolPicker />
        <div className="editor-section">
          <TilePixelEditor />
          <PalettePicker />
        </div>
        <div className="data-section" />
      </div>
    );
  }
}

export default TileEditor;
