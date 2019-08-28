
import React from 'react';

import Snippet from '../Snippet/Snippet';

import './AudioSnippets.scss';

class AudioSnippets extends React.Component {
  render() {
    return (
      <div className="api-screen-snippets">
        <h3>Sounds</h3>
        <Snippet
          text={
            `
// Play a sound
engine.audio.playSound(
  0,                  // sound index
  bitmelo.Notes.C4,   // note
  32,                 // duration
  0.75,               // volume
  0                   // speed
);

// Play a sound infinitely
engine.audio.playInfiniteSound(
  0,                  // sound index
  bitmelo.Notes.C4,   // note
  0.75,               // volume
  0                   // speed
);

// Stop an infinite sound
engine.audio.stopInfiniteSound( 0 );

// Stop all infinite sounds
engine.audio.stopAllInfiniteSounds();
            `
          }
        />
      </div>
    );
  }
}

export default AudioSnippets;
