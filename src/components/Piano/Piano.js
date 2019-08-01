
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from 'Components/Button/Button';

import PianoKey from './PianoKey/PianoKey';

import './Piano.scss';

const numberOfKeys = 108;
class Piano extends React.Component {
  constructor( props ) {
    super( props );

    const keyStates = new Array( 108 );
    keyStates.fill( false );

    const keyboardStates = new Array( 108 );
    keyboardStates.fill( false );

    this.state = {
      width: 720,
      keyStates, // piano keys
      keyboardStates, // keyboard keys
    };

    this.keyDown = this.keyDown.bind( this );
    this.keyUp = this.keyUp.bind( this );
    this.updateDimensions = this.updateDimensions.bind( this );

    this.scrollContainerRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener( 'resize', this.updateDimensions );
    document.addEventListener( 'keydown', this.keyDown );
    document.addEventListener( 'keyup', this.keyUp );

    this.updateDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener( 'resize', this.updateDimensions );
    document.removeEventListener( 'keydown', this.keyDown );
    document.removeEventListener( 'keyup', this.keyUp );
  }

  componentDidUpdate( prevProps, prevState ) {
    const {
      navigationPanelIsOpen,
      referencePanelIsOpen,
      onKeyDown,
      onKeyUp,
      octave,
    } = this.props;

    if (
      prevProps.navigationPanelIsOpen !== navigationPanelIsOpen
      || prevProps.referencePanelIsOpen !== referencePanelIsOpen
    ) {
      this.updateDimensions();
    }

    const { keyStates: prevKeyStates, keyboardStates: prevKeyboardStates } = prevState;
    const { keyStates, keyboardStates } = this.state;

    for ( let i = 0; i < numberOfKeys; i += 1 ) {
      const prevKeyState = prevKeyStates[i] || prevKeyboardStates[i];
      const currentKeyState = keyStates[i] || keyboardStates[i];

      if ( prevKeyState !== currentKeyState ) {
        if ( currentKeyState ) {
          // key down
          console.log( `${ i } down` );
          onKeyDown( i );
        }
        else {
          // key up
          console.log( `${ i } up` );
          onKeyUp( i );
        }
      }
    }

    if ( prevProps.octave !== octave ) {
      const newKeyStates = new Array( numberOfKeys );
      const newKeyboardStates = new Array( numberOfKeys );
      newKeyStates.fill( false );
      newKeyboardStates.fill( false );

      this.setState( { keyStates: newKeyStates, keyboardStates: newKeyboardStates } );
    }

  }

  updateDimensions() {
    this.setState( {
      width: this.scrollContainerRef.current.offsetWidth,
    } );
  }

  keyDown( event ) {
    if ( !event.repeat ) {
      const index = this.indexForCode( event.code );
      if ( index >= 0 ) {
        const { keyboardStates } = this.state;
        if ( !keyboardStates[index] ) {
          const newState = [...keyboardStates];
          newState[index] = true;
          this.setState( { keyboardStates: newState } );
        }
      }
    }
  }

  keyUp( event ) {
    const index = this.indexForCode( event.code );
    if ( index >= 0 ) {
      const { keyboardStates } = this.state;
      if ( keyboardStates[index] ) {
        const newState = [...keyboardStates];
        newState[index] = false;
        this.setState( { keyboardStates: newState } );
      }
    }
  }

  handleKeyStateChange( value, keyIndex ) {
    const { keyStates } = this.state;
    const newState = [...keyStates];
    newState[keyIndex] = value;
    this.setState( { keyStates: newState } );
  }

  indexForCode( code ) {
    const { octave } = this.props;
    let keyNumber = 0;

    switch ( code ) {
      case 'KeyZ':
        keyNumber = 0;
        break;

      case 'KeyS':
        keyNumber = 1;
        break;

      case 'KeyX':
        keyNumber = 2;
        break;

      case 'KeyD':
        keyNumber = 3;
        break;

      case 'KeyC':
        keyNumber = 4;
        break;

      case 'KeyV':
        keyNumber = 5;
        break;

      case 'KeyG':
        keyNumber = 6;
        break;

      case 'KeyB':
        keyNumber = 7;
        break;

      case 'KeyH':
        keyNumber = 8;
        break;

      case 'KeyN':
        keyNumber = 9;
        break;

      case 'KeyJ':
        keyNumber = 10;
        break;

      case 'KeyM':
        keyNumber = 11;
        break;

      default:
        return -1;
    }

    return octave * 12 + keyNumber;
  }

  renderOctave( octaveNumber ) {
    const { keyStates, keyboardStates } = this.state;
    const { octave } = this.props;

    const keysRender = [];
    const showHotkey = octave === octaveNumber;

    for ( let i = 0; i < 12; i += 1 ) {
      const keyIndex = octaveNumber * 12 + i;

      keysRender.push( (
        <PianoKey
          key={ `${ octaveNumber }_${ i }` }
          note={ i }
          octave={ octaveNumber }
          showHotkey={ showHotkey }
          isActive={ keyStates[keyIndex] }
          keyboardIsActive={ keyboardStates[keyIndex] }
          onStateChange={ v => this.handleKeyStateChange( v, keyIndex ) }
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
    const { width } = this.state;
    const { octave, onOctaveChange } = this.props;

    const octavesRender = [];

    for ( let i = 0; i < 9; i += 1 ) {
      octavesRender.push( this.renderOctave( i ) );
    }

    let offsetDistance = -octave * 350;
    offsetDistance += width / 2;
    offsetDistance -= 175; // half of the octave width

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
        <div className="scroll-container" ref={ this.scrollContainerRef }>
          <div className="keys-container" style={ containerStyle }>
            { octavesRender }
          </div>
        </div>
        <Button
          title="right"
          click={ () => {
            if ( octave < 8 ) {
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
  navigationPanelIsOpen: PropTypes.bool.isRequired,
  referencePanelIsOpen: PropTypes.bool.isRequired,
};

function mapStateToProps( state ) {
  return {
    navigationPanelIsOpen: state.layout.navigationPanelIsOpen,
    referencePanelIsOpen: state.layout.referencePanelIsOpen,
  };
}

export default connect( mapStateToProps )( Piano );
