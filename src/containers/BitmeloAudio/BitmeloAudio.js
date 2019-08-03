
import React from 'react';
import { connect } from 'react-redux';
import { Audio } from 'bitmelo';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import {
  clearAudioEvents,
  PIANO_KEY_DOWN,
  PIANO_KEY_UP,
  STOP_ALL_AUDIO,
} from 'State/Sound/audioEvents';
import { addedSoundToAudioEngine } from 'State/Sound/sounds';
import { SOUND_TAB } from 'State/Layout/activeNavigationTab';

class BitmeloAudio extends React.Component {
  constructor( props ) {
    super( props );

    this.resumeAudio = this.resumeAudio.bind( this );
    this.processEvent = this.processEvent.bind( this );
    this.addSoundData = this.addSoundData.bind( this );
    this.updateLoop = this.updateLoop.bind( this );

    this.state = {
      lastPlayedNote: -1,
    };
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
    const { lastPlayedNote } = this.state;
    const { activeNavigationTab, soundPianoSpeed, soundPianoVolume } = this.props;

    let speed = 0;
    let volume = 1;

    if ( activeNavigationTab === SOUND_TAB ) {
      speed = soundPianoSpeed;
      volume = soundPianoVolume;
    }

    if ( event.type === PIANO_KEY_DOWN ) {
      const key = event.payload;
      this.setState( { lastPlayedNote: key } );
      this.audio.playSound( 0, key, -1, volume, speed );
    }
    else if ( event.type === PIANO_KEY_UP ) {
      const key = event.payload;
      if ( lastPlayedNote === key ) {
        this.audio.stopInfiniteSound( 0 );
      }
    }
    else if ( event.type === STOP_ALL_AUDIO ) {
      this.audio.stopAllInfiniteSounds();
    }
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
  activeNavigationTab: PropTypes.string.isRequired,
  soundPianoSpeed: PropTypes.number.isRequired,
  soundPianoVolume: PropTypes.number.isRequired,
};

function mapStateToProps( state ) {
  return {
    events: state.sound.audioEvents,
    activeSound: state.sound.activeSound,
    sounds: state.sound.sounds,
    activeNavigationTab: state.layout.activeNavigationTab,
    soundPianoSpeed: state.sound.piano.speed,
    soundPianoVolume: state.sound.piano.volume,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    clearEvents: clearAudioEvents,
    _addedSoundToAudioEngine: addedSoundToAudioEngine,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( BitmeloAudio );
