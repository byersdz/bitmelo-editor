
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  drawPixelDataToCanvas,
  copyCanvasToCanvas,
} from 'Utils/drawToCanvas';

import './MainCanvas.scss';

class MainCanvas extends React.Component {
  constructor( props ) {
    super( props );

    this.canvasRef = React.createRef();
    this.dataCanvasRef = React.createRef();
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
    } = this.props;

    const settings = {
      scale,
      prevData,
      data,
      dataWidth,
      dataHeight,
    };

    const context = this.canvasRef.current.getContext( '2d' );
    context.clearRect( 0, 0, width, height );

    drawPixelDataToCanvas( settings, this.dataCanvasRef.current );
    copyCanvasToCanvas( this.dataCanvasRef.current, this.canvasRef.current, offsetX, offsetY );
  }

  render() {
    const {
      width,
      height,
      dataWidth,
      dataHeight,
      scale,
    } = this.props;

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
          width={ dataWidth * scale }
          height={ dataHeight * scale }
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
};

export default MainCanvas;
