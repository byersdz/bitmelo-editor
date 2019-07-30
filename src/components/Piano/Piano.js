
import React from 'react';
import PropTypes from 'prop-types';

import Button from 'Components/Button/Button';

import PianoKey from './PianoKey/PianoKey';

import './Piano.scss';

class Piano extends React.Component {
  constructor( props ) {
    super( props );

    this.keyDown = this.keyDown.bind( this );
    this.keyUp = this.keyUp.bind( this );
  }

  componentDidMount() {
    document.addEventListener( 'keydown', this.keyDown );
    document.addEventListener( 'keyup', this.keyUp );
  }

  componentWillUnmount() {
    document.removeEventListener( 'keydown', this.keyDown );
    document.removeEventListener( 'keyup', this.keyUp );
  }

  keyDown( event ) {
    if ( !event.repeat ) {
      const { onKeyDown } = this.props;
      const index = this.indexForCode( event.code );
      if ( index >= 0 ) {
        onKeyDown( index );
      }
    }
  }

  keyUp( event ) {
    const { onKeyUp } = this.props;
    const index = this.indexForCode( event.code );
    if ( index >= 0 ) {
      onKeyUp( index );
    }
  }

  indexForCode( code ) {
    switch ( code ) {
      case 'KeyZ':
        return 0;
      default:
        return -1;
    }
  }

  renderOctave( octaveNumber ) {
    const keysRender = [];

    for ( let i = 0; i < 12; i += 1 ) {
      keysRender.push( (
        <PianoKey
          key={ `${ octaveNumber }_${ i }` }
          note={ i }
        />
      ) );
    }

    return (
      <div
        key={ `o${ octaveNumber }` }
        className="octave"
      >
        { keysRender }
      </div>
    );
  }

  render() {
    const { octave, onOctaveChange } = this.props;

    const octavesRender = [];

    for ( let i = 0; i < 8; i += 1 ) {
      octavesRender.push( this.renderOctave( i ) );
    }

    const offsetDistance = -octave * 350;
    const containerStyle = {
      left: offsetDistance,
    };
    return (
      <div className="piano">
        <Button
          title="left"
          click={ () => {
            if ( octave > 0 ) {
              onOctaveChange( octave - 1 );
            }
          } }
          icon="play"
          className="octave-btn left"
          hideTitle
        />
        <div className="scroll-container">
          <div className="keys-container" style={ containerStyle }>
            { octavesRender }
          </div>
        </div>
        <Button
          title="right"
          click={ () => {
            if ( octave < 7 ) {
              onOctaveChange( octave + 1 );
            }
          } }
          icon="play"
          className="octave-btn right"
          hideTitle
        />
      </div>
    );
  }
}


Piano.propTypes = {
  onKeyDown: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired,
  octave: PropTypes.number.isRequired,
  onOctaveChange: PropTypes.func.isRequired,
};

export default Piano;
