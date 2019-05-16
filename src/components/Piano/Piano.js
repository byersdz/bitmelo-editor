
import React from 'react';
import PropTypes from 'prop-types';

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

  render() {
    return (
      <div className="piano">
        Piano
      </div>
    );
  }
}

Piano.propTypes = {
  onKeyDown: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired,
};

export default Piano;
