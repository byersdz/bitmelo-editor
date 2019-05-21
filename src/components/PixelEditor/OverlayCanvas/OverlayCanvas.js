
import React from 'react';
import PropTypes from 'prop-types';

import './OverlayCanvas.scss';

class OverlayCanvas extends React.Component {
  render() {
    const {
      width,
      height,
      onPointerMove,
      onPointerUp,
      onPointerDown,
      onPointerExit,
      onWheel,
    } = this.props;

    return (
      <canvas
        ref={ this.canvasRef }
        className="overlay-canvas"
        width={ width }
        height={ height }
        onPointerMove={ onPointerMove }
        onPointerUp={ onPointerUp }
        onPointerDown={ onPointerDown }
        onPointerLeave={ onPointerExit }
        onPointerCancel={ onPointerExit }
        onWheel={ onWheel }
      />
    );
  }
}

OverlayCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onPointerMove: PropTypes.func.isRequired,
  onPointerUp: PropTypes.func.isRequired,
  onPointerDown: PropTypes.func.isRequired,
  onPointerExit: PropTypes.func.isRequired,
  onWheel: PropTypes.func.isRequired,
};

export default OverlayCanvas;
