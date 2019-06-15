
import React from 'react';
import PropTypes from 'prop-types';

import { drawPixelDataToCanvas } from 'Utils/drawToCanvas';

import './TileSelectorCanvas.scss';

class TileSelectorCanvas extends React.Component {
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
      scale,
      palette,
      data,
    } = this.props;

    const scaledWidth = width * scale;
    const scaledHeight = height * scale;

    console.log( 'draw' );
    const context = this.canvasRef.current.getContext( '2d' );
    context.clearRect( 0, 0, scaledWidth, scaledHeight );

    const settings = {
      scale,
      dataWidth: width,
      dataHeight: height,
      palette,
      data,
    };

    drawPixelDataToCanvas( settings, this.canvasRef.current );
  }

  render() {
    const { width, height, scale } = this.props;

    return (
      <canvas
        ref={ this.canvasRef }
        width={ width * scale }
        height={ height * scale }
      />
    );
  }
}

TileSelectorCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  palette: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default TileSelectorCanvas;
