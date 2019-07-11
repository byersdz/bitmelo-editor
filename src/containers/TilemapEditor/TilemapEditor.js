
import React from 'react';

import TilemapToolSettings from './TilemapToolSettings/TilemapToolSettings';
import TilemapToolPicker from './TilemapToolPicker/TilemapToolPicker';
import TilemapPixelEditor from './TilemapPixelEditor/TilemapPixelEditor';

import './TilemapEditor.scss';

class TilemapEditor extends React.Component {
  render() {
    return (
      <div className="tilemap-editor">
        <TilemapToolSettings />
        <TilemapToolPicker />
        <div className="editor-section">
          <TilemapPixelEditor />
        </div>
      </div>
    );
  }
}

export default TilemapEditor;
