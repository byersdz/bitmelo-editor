
import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars as RCS } from 'react-custom-scrollbars';

import './Scrollbars.scss';

class Scrollbars extends React.Component {
  constructor( props ) {
    super( props );
    this.scrollComponent = null;
    this.updateStickToBottom = this.updateStickToBottom.bind( this );
  }

  componentDidMount() {
    const { stickToBottom } = this.props;
    if ( stickToBottom ) {
      this.updateStickToBottom();
    }
  }

  componentDidUpdate( prevProps ) {
    const { stickToBottom } = this.props;

    if ( stickToBottom && !prevProps.stickToBottom ) {
      this.updateStickToBottom();
    }
  }

  updateStickToBottom() {
    const { stickToBottom } = this.props;
    if ( stickToBottom && this.scrollComponent ) {
      this.scrollComponent.scrollToBottom();
      requestAnimationFrame( this.updateStickToBottom );
    }
  }

  render() {
    const { children, className } = this.props;
    return (
      <RCS
        className={ className }
        ref={ c => {
          this.scrollComponent = c;
        } }
        renderTrackVertical={ p => <div { ...p } className="track-vertical" /> }
        renderThumbVertical={ p => <div { ...p } className="thumb-vertical" /> }
      >
        { children }
      </RCS>
    );
  }
}

Scrollbars.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  stickToBottom: PropTypes.bool,
};

Scrollbars.defaultProps = {
  className: '',
  stickToBottom: false,
};

export default Scrollbars;
