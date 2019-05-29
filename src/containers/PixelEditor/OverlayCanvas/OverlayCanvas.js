
import React from 'react';
import PropTypes from 'prop-types';

import './OverlayCanvas.scss';

class OverlayCanvas extends React.Component {
  render() {
    const {
      width,
      height,
      onPointerDown,
      onWheel,
    } = this.props;

    return (
      <canvas
        ref={ this.canvasRef }
        className="overlay-canvas"
        width={ width }
        height={ height }
        onPointerDown={ onPointerDown }
        onWheel={ onWheel }
        onContextMenu={ e => {
          e.preventDefault();
          return false;
        } }
      />
    );
  }
}

OverlayCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onPointerDown: PropTypes.func.isRequired,
  onWheel: PropTypes.func.isRequired,
};

export default OverlayCanvas;
