
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from 'Components/Button/Button';

import PianoKey from './PianoKey/PianoKey';

import './Piano.scss';

class Piano extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      width: 720,
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

  componentDidUpdate( prevProps ) {
    const { navigationPanelIsOpen, referencePanelIsOpen } = this.props;
    if (
      prevProps.navigationPanelIsOpen !== navigationPanelIsOpen
      || prevProps.referencePanelIsOpen !== referencePanelIsOpen
    ) {
      this.updateDimensions();
    }
  }

  updateDimensions() {
    this.setState( {
      width: this.scrollContainerRef.current.offsetWidth,
    } );
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
    const { octave } = this.props;

    const keysRender = [];
    const showHotkey = octave === octaveNumber;

    for ( let i = 0; i < 12; i += 1 ) {
      keysRender.push( (
        <PianoKey
          key={ `${ octaveNumber }_${ i }` }
          note={ i }
          octave={ octaveNumber }
          showHotkey={ showHotkey }
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
