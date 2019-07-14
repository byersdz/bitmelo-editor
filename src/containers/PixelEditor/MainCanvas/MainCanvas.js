
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  drawPixelDataToCanvas,
  drawPixelDataToOffsetCanvas,
  copyCanvasToCanvas,
  drawBackgroundBorder,
  drawTileDataToCanvas,
} from 'Utils/drawToCanvas';

import './MainCanvas.scss';

class MainCanvas extends React.Component {
  constructor( props ) {
    super( props );

    this.canvasRef = React.createRef();
    this.dataCanvasRef = React.createRef();
    this.tilesetContainerRef = React.createRef();
    this.maxDataCanvasSize = 4096;
  }

  componentDidMount() {
    this.draw( null, true );
  }

  componentDidUpdate( prevProps ) {
    const {
      dataWidth,
      dataHeight,
      scale,
      palette,
      tilesets,
    } = this.props;

    let prevData = prevProps.data;
    const prevWidth = prevProps.dataWidth;
    const prevHeight = prevProps.dataHeight;
    const prevScale = prevProps.scale;
    const prevPalette = prevProps.palette;

    if (
      prevWidth !== dataWidth
      || prevHeight !== dataHeight
      || prevScale !== scale
      || prevPalette !== palette
    ) {
      prevData = null; // redraw all of the data instead of differences
    }

    const prevTilesets = prevProps.tilesets;
    let shouldDrawTilesets = false;
    if (
      prevTilesets !== tilesets
      || prevScale !== scale
      || prevPalette !== palette
    ) {
      shouldDrawTilesets = true;
    }

    this.draw( prevData, shouldDrawTilesets );
  }

  draw( prevData, shouldDrawTilesets ) {
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
      isTileEditor,
      tileSize,
      tilesets,
    } = this.props;

    let tilesetCanvases = null;
    if ( isTileEditor ) {
      tilesetCanvases = this.tilesetContainerRef.current.children;
    }

    // draw tilesets
    if ( isTileEditor && shouldDrawTilesets ) {
      if ( tilesets.length && tilesets.length === tilesetCanvases.length ) {
        for ( let i = 0; i < tilesets.length; i += 1 ) {
          const tileset = tilesets[i];
          const tilesetSettings = {
            scale,
            dataWidth: tileset.width * tileSize,
            dataHeight: tileset.height * tileSize,
            palette,
            data: tileset.layers[0].data,
          };

          drawPixelDataToCanvas( tilesetSettings, tilesetCanvases[i] );
        }
      }
    }

    if ( isTileEditor ) {
      // draw tiles
      const context = this.canvasRef.current.getContext( '2d' );
      context.clearRect( 0, 0, width, height );

      let isLargeData = false;
      if ( dataWidth * scale * tileSize > this.maxDataCanvasSize ) {
        isLargeData = true;
      }
      if ( dataHeight * scale * tileSize > this.maxDataCanvasSize ) {
        isLargeData = true;
      }

      const settings = {
        scale,
        prevData,
        data,
        dataWidth,
        dataHeight,
        offsetX,
        offsetY,
        canvasWidth: dataWidth * tileSize * scale,
        canvasHeight: dataHeight * tileSize * scale,
        palette,
        isTileEditor,
        tilesets,
        tileSize,
        tilesetCanvases,
      };

      if ( isLargeData ) {
        // do nothing for now
      }
      else {
        drawTileDataToCanvas( settings, this.dataCanvasRef.current );
        copyCanvasToCanvas( this.dataCanvasRef.current, this.canvasRef.current, offsetX, offsetY );
      }
    }
    else {
      // draw pixels
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

    const borderSettings = {
      offsetX,
      offsetY,
      canvasWidth: width,
      canvasHeight: height,
      width: dataWidth * scale,
      height: dataHeight * scale,
    };

    if ( isTileEditor ) {
      borderSettings.width *= tileSize;
      borderSettings.height *= tileSize;
    }

    drawBackgroundBorder( borderSettings, this.canvasRef.current );
  }

  render() {
    const {
      width,
      height,
      dataWidth,
      dataHeight,
      scale,
      isTileEditor,
      tileSize,
      tilesets,
    } = this.props;

    let dataCanvasWidth = dataWidth * scale;
    let dataCanvasHeight = dataHeight * scale;

    if ( isTileEditor ) {
      dataCanvasWidth *= tileSize;
      dataCanvasHeight *= tileSize;
    }

    if ( dataCanvasWidth > this.maxDataCanvasSize ) {
      dataCanvasWidth = this.maxDataCanvasSize;
    }

    if ( dataCanvasHeight > this.maxDataCanvasSize ) {
      dataCanvasHeight = this.maxDataCanvasSize;
    }

    const tilesetRender = [];

    for ( let i = 0; i < tilesets.length; i += 1 ) {
      const tileset = tilesets[i];
      tilesetRender.push( (
        <canvas
          className="tileset-canvas"
          width={ tileset.width * tileSize * scale }
          height={ tileset.height * tileSize * scale }
          key={ i }
        />
      ) );
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
        <div
          ref={ this.tilesetContainerRef }
          className="tileset-canvases"
        >
          { tilesetRender }
        </div>
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
  isTileEditor: PropTypes.bool.isRequired,
  tileSize: PropTypes.number.isRequired,
  tilesets: PropTypes.array.isRequired,
};

export default MainCanvas;
