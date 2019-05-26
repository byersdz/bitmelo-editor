
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  drawPixelDataToCanvas,
  drawPixelDataToOffsetCanvas,
  copyCanvasToCanvas,
} from 'Utils/drawToCanvas';

import './MainCanvas.scss';

class MainCanvas extends React.Component {
  constructor( props ) {
    super( props );

    this.canvasRef = React.createRef();
    this.dataCanvasRef = React.createRef();
    this.maxDataCanvasSize = 4096;
  }

  componentDidMount() {
    this.draw( null );
  }

  componentDidUpdate( prevProps ) {
    const {
      dataWidth,
      dataHeight,
      scale,
    } = this.props;

    let prevData = prevProps.data;
    const prevWidth = prevProps.dataWidth;
    const prevHeight = prevProps.dataHeight;
    const prevScale = prevProps.scale;

    if (
      prevWidth !== dataWidth
      || prevHeight !== dataHeight
      || prevScale !== scale
    ) {
      prevData = null; // redraw all of the data instead of differences
    }

    this.draw( prevData );
  }

  draw( prevData ) {
    const {
      scale,
      data,
      dataWidth,
      dataHeight,
      width,
      height,
      offsetX,
      offsetY,
      palette,
    } = this.props;

    const settings = {
      scale,
      prevData,
      data,
      dataWidth,
      dataHeight,
      offsetX,
      offsetY,
      canvasWidth: width,
      canvasHeight: height,
      palette,
    };

    const context = this.canvasRef.current.getContext( '2d' );
    context.clearRect( 0, 0, width, height );

    let isLargeData = false;
    if ( dataWidth * scale > this.maxDataCanvasSize ) {
      isLargeData = true;
    }
    if ( dataHeight * scale > this.maxDataCanvasSize ) {
      isLargeData = true;
    }

    if ( isLargeData ) {
      drawPixelDataToOffsetCanvas( settings, this.canvasRef.current );
    }
    else {
      drawPixelDataToCanvas( settings, this.dataCanvasRef.current );
      copyCanvasToCanvas( this.dataCanvasRef.current, this.canvasRef.current, offsetX, offsetY );
    }
  }

  render() {
    const {
      width,
      height,
      dataWidth,
      dataHeight,
      scale,
    } = this.props;

    let dataCanvasWidth = dataWidth * scale;
    let dataCanvasHeight = dataHeight * scale;

    if ( dataCanvasWidth > this.maxDataCanvasSize ) {
      dataCanvasWidth = this.maxDataCanvasSize;
    }

    if ( dataCanvasHeight > this.maxDataCanvasSize ) {
      dataCanvasHeight = this.maxDataCanvasSize;
    }

    return (
      <Fragment>
        <canvas
          ref={ this.canvasRef }
          className="main-canvas"
          width={ width }
          height={ height }
        />
        <canvas
          ref={ this.dataCanvasRef }
          className="data-canvas"
          width={ dataCanvasWidth }
          height={ dataCanvasHeight }
        />
      </Fragment>
    );
  }
}

MainCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  data: PropTypes.arrayOf( PropTypes.number ).isRequired,
  dataWidth: PropTypes.number.isRequired,
  dataHeight: PropTypes.number.isRequired,
  offsetX: PropTypes.number.isRequired,
  offsetY: PropTypes.number.isRequired,
  palette: PropTypes.arrayOf( PropTypes.string ).isRequired,
};

export default MainCanvas;
