
import React from 'react';
import { connect } from 'react-redux';
import { Audio } from 'bitmelo';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { clearAudioEvents, PIANO_KEY_DOWN, PIANO_KEY_UP } from 'State/Sound/audioEvents';
import { addedSoundToAudioEngine } from 'State/Sound/sounds';

class BitmeloAudio extends React.Component {
  constructor( props ) {
    super( props );

    this.resumeAudio = this.resumeAudio.bind( this );
    this.processEvent = this.processEvent.bind( this );
    this.addSoundData = this.addSoundData.bind( this );
    this.updateLoop = this.updateLoop.bind( this );
  }

  componentDidMount() {
    this.audio = new Audio();
    this.audio.init();
    document.addEventListener( 'click', this.resumeAudio );
    this.addSoundData();
    requestAnimationFrame( this.updateLoop );
  }

  shouldComponentUpdate( props ) {
    const { activeSound: lastActiveSound } = this.props;
    const { events, activeSound, sounds } = props;
    if ( events.length > 0 ) {
      return true;
    }

    if ( lastActiveSound !== activeSound ) {
      return true;
    }

    if ( sounds[activeSound].needToAddToAudioEngine ) {
      return true;
    }

    return false;
  }

  componentDidUpdate( prevProps ) {
    const { activeSound: prevActiveSound } = prevProps;
    const {
      events,
      clearEvents,
      activeSound,
      sounds,
    } = this.props;

    for ( let i = 0; i < events.length; i += 1 ) {
      this.processEvent( events[i] );
    }

    if ( events.length > 0 ) {
      clearEvents();
    }

    if ( activeSound !== prevActiveSound ) {
      this.addSoundData();
    }
    else if ( sounds[activeSound].needToAddToAudioEngine ) {
      this.addSoundData();
    }
  }

  componentWillUnmount() {
    document.removeEventListener( 'click', this.resumeAudio );
  }

  updateLoop() {
    this.audio.update();
    requestAnimationFrame( this.updateLoop );
  }

  addSoundData() {
    const { sounds, activeSound, _addedSoundToAudioEngine } = this.props;
    this.audio.stopAllInfiniteSounds();
    const newSound = sounds[activeSound];
    this.audio.sounds = [];
    this.audio.addSound( { ...newSound } );
    _addedSoundToAudioEngine( activeSound );
  }

  resumeAudio() {
    if ( this.audio.context.state === 'suspended' ) {
      this.audio.context.resume();
    }
  }

  processEvent( event ) {
    if ( event.type === PIANO_KEY_DOWN ) {
      this.audio.playSound( 0, 40, -1, 1, 0 );
    }
    else if ( event.type === PIANO_KEY_UP ) {
      this.audio.stopInfiniteSound( 0 );
    }
    console.log( event );
    console.log( this.audio );
  }

  render() {
    return null;
  }
}

BitmeloAudio.propTypes = {
  events: PropTypes.arrayOf( PropTypes.object ).isRequired,
  clearEvents: PropTypes.func.isRequired,
  activeSound: PropTypes.number.isRequired,
  sounds: PropTypes.arrayOf( PropTypes.object ).isRequired,
  _addedSoundToAudioEngine: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    events: state.sound.audioEvents,
    activeSound: state.sound.activeSound,
    sounds: state.sound.sounds,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    clearEvents: clearAudioEvents,
    _addedSoundToAudioEngine: addedSoundToAudioEngine,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( BitmeloAudio );
