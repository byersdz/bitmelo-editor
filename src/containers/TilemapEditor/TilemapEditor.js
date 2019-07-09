
import React from 'react';

import TilemapToolSettings from './TilemapToolSettings/TilemapToolSettings';
import TilemapToolPicker from './TilemapToolPicker/TilemapToolPicker';

import './TilemapEditor.scss';

class TilemapEditor extends React.Component {
  render() {
    return (
      <div className="tilemap-editor">
        <TilemapToolSettings />
        <TilemapToolPicker />
        <div className="editor-section">
          TilemapEditor
        </div>
      </div>
    );
  }
}

export default TilemapEditor;
