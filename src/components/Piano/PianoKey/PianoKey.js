
import React from 'react';
import PropTypes from 'prop-types';

import './PianoKey.scss';

class PianoKey extends React.Component {
  render() {
    const { note } = this.props;

    let className = 'piano-key ';

    switch ( note ) {
      case 0: {
        className += 'c white';
        break;
      }
      case 1: {
        className += 'cs black';
        break;
      }
      case 2: {
        className += 'd white';
        break;
      }
      case 3: {
        className += 'ds black';
        break;
      }
      case 4: {
        className += 'e white';
        break;
      }
      case 5: {
        className += 'f white';
        break;
      }
      case 6: {
        className += 'fs black';
        break;
      }
      case 7: {
        className += 'g white';
        break;
      }
      case 8: {
        className += 'gs black';
        break;
      }
      case 9: {
        className += 'a white';
        break;
      }
      case 10: {
        className += 'as black';
        break;
      }
      case 11: {
        className += 'b white';
        break;
      }
      default: break;
    }

    return (
      <div
        className={ className }
      />
    );
  }
}

PianoKey.propTypes = {
  note: PropTypes.number.isRequired,
};


export default PianoKey;
