
import React from 'react';
import { connect } from 'react-redux';
import { Audio } from 'bitmelo';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { clearAudioEvents } from 'State/Sound/audioEvents';

class BitmeloAudio extends React.Component {
  constructor( props ) {
    super( props );

    this.resumeAudio = this.resumeAudio.bind( this );
    this.processEvent = this.processEvent.bind( this );
  }

  componentWillMount() {
    this.audio = new Audio();
    this.audio.init();
    document.addEventListener( 'click', this.resumeAudio );
  }

  shouldComponentUpdate( props ) {
    const { events } = props;
    if ( events.length > 0 ) {
      return true;
    }
    return false;
  }

  componentWillUpdate( props ) {
    const { events, clearEvents } = props;
    for ( let i = 0; i < events.length; i += 1 ) {
      this.processEvent( events[i] );
    }
    clearEvents();
  }

  componentWillUnmount() {
    document.removeEventListener( 'click', this.resumeAudio );
  }

  resumeAudio() {
    if ( this.audio.context.state === 'suspended' ) {
      this.audio.context.resume();
    }
  }

  processEvent( event ) {
    console.log( event );
  }

  render() {
    return null;
  }
}

BitmeloAudio.propTypes = {
  events: PropTypes.arrayOf( PropTypes.object ).isRequired,
  clearEvents: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    events: state.sound.audioEvents,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    clearEvents: clearAudioEvents,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( BitmeloAudio );
