
import React from 'react';
import PropTypes from 'prop-types';

import {
  drawIndicator,
} from 'Utils/drawToCanvas';
import './OverlayCanvas.scss';

class OverlayCanvas extends React.Component {
  constructor( props ) {
    super( props );

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    const {
      width,
      height,
      offsetX,
      offsetY,
      indicatorX,
      indicatorY,
      showIndicator,
      scale,
      dataHeight,
    } = this.props;

    const context = this.canvasRef.current.getContext( '2d' );
    context.clearRect( 0, 0, width, height );

    if ( showIndicator ) {
      drawIndicator(
        {
          offsetX,
          offsetY,
          indicatorX,
          indicatorY,
          scale,
          dataHeight,
        },
        this.canvasRef.current,
      );
    }
  }

  handlePointerDown( event ) {
    console.log( event );
  }

  handlePointerMove( event ) {
    console.log( event );
  }

  handlePointerUp( event ) {
    console.log( event );
  }

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
  offsetX: PropTypes.number.isRequired,
  offsetY: PropTypes.number.isRequired,
  indicatorX: PropTypes.number.isRequired,
  indicatorY: PropTypes.number.isRequired,
  showIndicator: PropTypes.bool.isRequired,
  scale: PropTypes.number.isRequired,
  dataHeight: PropTypes.number.isRequired,
};

export default OverlayCanvas;
