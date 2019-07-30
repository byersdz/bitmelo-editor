
import React from 'react';
import PropTypes from 'prop-types';

import './PianoKey.scss';

class PianoKey extends React.Component {
  render() {
    const { note, octave, showHotkey } = this.props;

    let className = 'piano-key ';
    let noteDisplay = '';
    let hotkey = '';

    switch ( note ) {
      case 0: {
        className += 'c white';
        noteDisplay = 'C';
        hotkey = 'Z';

        break;
      }
      case 1: {
        className += 'cs black';
        noteDisplay = 'C#';
        hotkey = 'S';

        break;
      }
      case 2: {
        className += 'd white';
        noteDisplay = 'D';
        hotkey = 'X';

        break;
      }
      case 3: {
        className += 'ds black';
        noteDisplay = 'D#';
        hotkey = 'D';

        break;
      }
      case 4: {
        className += 'e white';
        noteDisplay = 'E';
        hotkey = 'C';

        break;
      }
      case 5: {
        className += 'f white';
        noteDisplay = 'F';
        hotkey = 'V';

        break;
      }
      case 6: {
        className += 'fs black';
        noteDisplay = 'F#';
        hotkey = 'G';

        break;
      }
      case 7: {
        className += 'g white';
        noteDisplay = 'G';
        hotkey = 'B';

        break;
      }
      case 8: {
        className += 'gs black';
        noteDisplay = 'G#';
        hotkey = 'H';

        break;
      }
      case 9: {
        className += 'a white';
        noteDisplay = 'A';
        hotkey = 'N';

        break;
      }
      case 10: {
        className += 'as black';
        noteDisplay = 'A#';
        hotkey = 'J';

        break;
      }
      case 11: {
        className += 'b white';
        noteDisplay = 'B';
        hotkey = 'M';

        break;
      }
      default: break;
    }
    if ( !showHotkey ) {
      hotkey = null;
    }

    return (
      <div
        className={ className }
      >
        <div className="hotkey">
          { hotkey }
        </div>
        <div className="note">
          { noteDisplay }
        </div>
        <div className="o-number">
          { octave }
        </div>
      </div>
    );
  }
}

PianoKey.propTypes = {
  showHotkey: PropTypes.bool.isRequired,
  note: PropTypes.number.isRequired,
  octave: PropTypes.number.isRequired,
};


export default PianoKey;
