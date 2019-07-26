
import React from 'react';
import PropTypes from 'prop-types';

import Button from 'Components/Button/Button';

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
    const whiteKeysRender = [];

    for ( let i = 0; i < 7; i += 1 ) {
      // render the white keys
      whiteKeysRender.push( (
        <div
          key={ `${ octaveNumber }-w-${ i }` }
          className="white-key"
        />
      ) );
    }

    return (
      <div
        key={ `o${ octaveNumber }` }
        className="octave"
      >
        { whiteKeysRender }
      </div>
    );
  }

  render() {
    const octavesRender = [];

    for ( let i = 0; i < 8; i += 1 ) {
      octavesRender.push( this.renderOctave( i ) );
    }

    return (
      <div className="piano">
        <Button
          title="left"
          click={ () => console.log( 'left' ) }
          icon="play"
          className="octave-btn left"
          hideTitle
        />
        <div className="scroll-container">
          <div className="keys-container">
            { octavesRender }
          </div>
        </div>
        <Button
          title="right"
          click={ () => console.log( 'right' ) }
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
};

export default Piano;
