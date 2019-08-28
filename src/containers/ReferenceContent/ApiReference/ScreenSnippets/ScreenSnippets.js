
import React from 'react';

import Snippet from '../Snippet/Snippet';

import './ScreenSnippets.scss';

// pixels
// line
// rectangle
// circle
// text
// Tiles
// Tilemap
// Palette

class ScreenSnippets extends React.Component {
  render() {
    return (
      <div className="api-screen-snippets">
        Screen Snippets
        <Snippet
          text={
            `
            This is a test snippet

            `
          }
        />
      </div>
    );
  }
}

export default ScreenSnippets;
