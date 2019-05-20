
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
};

export default OverlayCanvas;
