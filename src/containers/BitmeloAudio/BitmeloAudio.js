
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
} from '../../state/Sound/audioEvents';
import { addedSoundToAudioEngine } from '../../state/Sound/sounds';
import { SOUND_TAB } from '../../state/Layout/activeNavigationTab';
import { setLastSoundTics } from '../../state/Layout/soundEditor';

class BitmeloAudio extends React.Component {
  constructor( props ) {
    super( props );

    this.resumeAudio = this.resumeAudio.bind( this );
    this.processEvent = this.processEvent.bind( this );
    this.addSoundData = this.addSoundData.bind( this );
    this.updateLoop = this.updateLoop.bind( this );

    this.state = {
      lastPlayedNote: -1,
      isPlayingNote: false,
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
      _clearEvents,
      activeSound,
      sounds,
    } = this.props;

    for ( let i = 0; i < events.length; i += 1 ) {
      this.processEvent( events[i] );
    }

    if ( events.length > 0 ) {
      _clearEvents();
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
    const { _setLastSoundTics } = this.props;
    const { isPlayingNote } = this.state;

    this.audio.update();

    if ( isPlayingNote ) {
      _setLastSoundTics(
        this.audio.sounds[0].lastVolumeTic,
        this.audio.sounds[0].lastPitchTic,
        this.audio.sounds[0].lastArpTic,
      );
    }

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
    const {
      activeNavigationTab,
      soundPianoSpeed,
      soundPianoVolume,
      _setLastSoundTics,
    } = this.props;

    let speed = 0;
    let volume = 1;

    if ( activeNavigationTab === SOUND_TAB ) {
      speed = soundPianoSpeed;
      volume = soundPianoVolume;
    }

    if ( event.type === PIANO_KEY_DOWN ) {
      const key = event.payload;
      this.setState( { lastPlayedNote: key, isPlayingNote: true } );
      this.audio.playSound( 0, key, -1, volume, speed );
      _setLastSoundTics( -1, -1, -1 );
    }
    else if ( event.type === PIANO_KEY_UP ) {
      const key = event.payload;
      if ( lastPlayedNote === key ) {
        this.audio.stopInfiniteSound( 0 );
        this.setState( { isPlayingNote: false } );
        _setLastSoundTics( -1, -1, -1 );
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
  _clearEvents: PropTypes.func.isRequired,
  activeSound: PropTypes.number.isRequired,
  sounds: PropTypes.arrayOf( PropTypes.object ).isRequired,
  _addedSoundToAudioEngine: PropTypes.func.isRequired,
  activeNavigationTab: PropTypes.string.isRequired,
  soundPianoSpeed: PropTypes.number.isRequired,
  soundPianoVolume: PropTypes.number.isRequired,
  _setLastSoundTics: PropTypes.func.isRequired,
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
    _clearEvents: clearAudioEvents,
    _addedSoundToAudioEngine: addedSoundToAudioEngine,
    _setLastSoundTics: setLastSoundTics,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( BitmeloAudio );
