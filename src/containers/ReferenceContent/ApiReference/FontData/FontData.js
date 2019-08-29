
import React from 'react';

import Property from '../Property/Property';
import Method from '../Method/Method';

import './FontData.scss';

class FontData extends React.Component {
  render() {
    return (
      <div className="api-font-data">
        <div className="description">
          {
`
Holds all of the font data
`
          }
        </div>
        <h2>Properties</h2>
        <Property
          name="fontData.fonts"
          type="[bitmelo.Font]"
          description={
`
Array of Font objects.
`
          }
        />
        <h2>Methods</h2>
        <Method
          name="fontData.addFont"
          description={
`
Add a bitmelo.Font to the fonts array from font data.
`
          }
          params={
            [
              {
                name: 'fontData',
                type: 'object',
                description: 'The font data',
              },
            ]
          }
        />
      </div>
    );
  }
}

export default FontData;
