import React from 'react';
import { PhotoshopPicker } from 'react-color';

import './ColorEditor.scss';

class ColorEditor extends React.Component {
  render() {
    return (
      <div className="color-editor">
        <PhotoshopPicker />
      </div>
    );
  }
}

export default ColorEditor;
