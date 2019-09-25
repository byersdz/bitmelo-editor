
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  drawIndicator,
  drawGrid,
} from 'Utils/drawToCanvas';

import { TILE_TAB, TILEMAP_TAB } from 'State/Layout/activeNavigationTab';

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
      indicatorWidth,
      indicatorHeight,
      showIndicator,
      scale,
      dataWidth,
      dataHeight,
      isTileEditor,
      tileSize,
      showGrid,
    } = this.props;

    const context = this.canvasRef.current.getContext( '2d' );
    context.clearRect( 0, 0, width, height );

    let modifiedScale = scale;
    if ( isTileEditor ) {
      modifiedScale = scale * tileSize;
    }

    if ( showGrid ) {
      const gridSettings = {
        interval: 1,
        lineWidth: 1,
        style: 'rgba( 0, 0, 0, 0.5 )',
        offsetX,
        offsetY,
        scale,
        dataWidth,
        dataHeight,
      };

      if ( isTileEditor ) {
        gridSettings.scale = scale * tileSize;
      }

      drawGrid( gridSettings, this.canvasRef.current );

      if ( !isTileEditor ) {
        // draw stronger borders at tile edges
        gridSettings.interval = tileSize;
        gridSettings.lineWidth = 2;

        drawGrid( gridSettings, this.canvasRef.current );
      }
    }

    if ( showIndicator ) {
      drawIndicator(
        {
          offsetX,
          offsetY,
          indicatorX,
          indicatorY,
          indicatorWidth,
          indicatorHeight,
          scale: modifiedScale,
          dataHeight,
        },
        this.canvasRef.current,
      );
    }
  }

  render() {
    const {
      width,
      height,
      onPointerDown,
      onWheel,
      editorSelection,
    } = this.props;

    console.log( editorSelection );

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
  indicatorWidth: PropTypes.number.isRequired,
  indicatorHeight: PropTypes.number.isRequired,
  showIndicator: PropTypes.bool.isRequired,
  scale: PropTypes.number.isRequired,
  dataWidth: PropTypes.number.isRequired,
  dataHeight: PropTypes.number.isRequired,
  isTileEditor: PropTypes.bool.isRequired,
  tileSize: PropTypes.number.isRequired,
  showGrid: PropTypes.bool.isRequired,
  editorSelection: PropTypes.object,
};

OverlayCanvas.defaultProps = {
  editorSelection: null,
};

function mapStateToProps( state ) {
  const { activeNavigationTab } = state.layout;
  let showGrid = false;
  if ( activeNavigationTab === TILE_TAB ) {
    showGrid = state.layout.tileEditor.showGrid;
  }
  else if ( activeNavigationTab === TILEMAP_TAB ) {
    showGrid = state.layout.tilemapEditor.showGrid;
  }
  return {
    showGrid,
  };
}

export default connect( mapStateToProps )( OverlayCanvas );
