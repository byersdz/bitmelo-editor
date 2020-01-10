
import React from 'react';

import PixelToolSettings from '../PixelEditor/PixelToolSettings/PixelToolSettings';
import PixelToolPicker from '../PixelEditor/PixelToolPicker/PixelToolPicker';
import TilePixelEditor from './TilePixelEditor/TilePixelEditor';
import PalettePicker from '../PalettePicker/PalettePicker';
import TileStatusBar from './TileStatusBar/TileStatusBar';

import './TileEditor.scss';

class TileEditor extends React.Component {
  render() {
    return (
      <div className="tile-editor">
        <PixelToolSettings />
        <PixelToolPicker />
        <div className="editor-section">
          <TilePixelEditor />
          <PalettePicker />
        </div>
        <TileStatusBar />
      </div>
    );
  }
}

export default TileEditor;
