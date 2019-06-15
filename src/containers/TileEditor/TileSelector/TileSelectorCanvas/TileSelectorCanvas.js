
import React from 'react';
import PropTypes from 'prop-types';

import {
  drawPixelDataToCanvas,
  drawTileSelection,
  drawGrid,
} from 'Utils/drawToCanvas';

import './TileSelectorCanvas.scss';

class TileSelectorCanvas extends React.Component {
  constructor( props ) {
    super( props );
    this.canvasRef = React.createRef();

    this.state = {
      startPosition: { x: 0, y: 0 },
      currentPosition: { x: 0, y: 0 },
      isSelecting: false,
    };
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  shouldComponentUpdate( nextProps, nextState ) {
    if ( nextProps !== this.props ) {
      return true;
    }
    const currentState = this.state;

    if ( nextState.isSelecting ) {
      if (
        nextState.currentPosition.x !== currentState.currentPosition.x
        || nextState.currentPosition.y !== currentState.currentPosition.y
      ) {
        return true;
      }
    }
    return false;
  }

  draw() {
    const {
      width,
      height,
      scale,
      palette,
      data,
      selectedTile,
      selectionWidth,
      selectionHeight,
      tileSize,
    } = this.props;

    const { isSelecting, startPosition, currentPosition } = this.state;

    const scaledWidth = width * scale;
    const scaledHeight = height * scale;

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

    const gridSettings = {
      interval: tileSize,
      lineWidth: 1,
      style: '#888888',
      offsetX: 0,
      offsetY: 0,
      scale,
      dataWidth: width,
      dataHeight: height,
    };

    drawGrid( gridSettings, this.canvasRef.current );

    const selectionSettings = {
      dataWidth: width / tileSize,
      dataHeight: height / tileSize,
      scale,
      selectedTile,
      selectionWidth,
      selectionHeight,
      tileSize,
    };

    if ( isSelecting ) {
      const tempSelection = this.getSelection( startPosition, currentPosition );

      selectionSettings.selectedTile = tempSelection.selectedTile;
      selectionSettings.selectionWidth = tempSelection.selectionWidth;
      selectionSettings.selectionHeight = tempSelection.selectionHeight;
    }

    drawTileSelection( selectionSettings, this.canvasRef.current );
  }

  handlePointerDown( event ) {
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;

    const position = this.getTilePosition( x, y );
    this.setState( {
      startPosition: position,
      currentPosition: position,
      isSelecting: true,
    } );
  }

  handlePointerMove( event ) {
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;

    const position = this.getTilePosition( x, y );
    this.setState( {
      currentPosition: position,
    } );
  }

  handlePointerUp() {
    this.finishSelecting();
  }

  handlePointerExit() {
    const { isSelecting } = this.state;

    if ( isSelecting ) {
      this.finishSelecting();
    }
  }

  finishSelecting() {
    const { onSelectionChange } = this.props;
    const { startPosition, currentPosition } = this.state;

    const newSelection = this.getSelection( startPosition, currentPosition );

    this.setState( { isSelecting: false } );

    onSelectionChange( newSelection );
  }

  getSelection( startPosition, currentPosition ) {
    const { width, tileSize } = this.props;

    const minX = startPosition.x < currentPosition.x ? startPosition.x : currentPosition.x;
    const minY = startPosition.y < currentPosition.y ? startPosition.y : currentPosition.y;

    const maxX = startPosition.x > currentPosition.x ? startPosition.x : currentPosition.x;
    const maxY = startPosition.y > currentPosition.y ? startPosition.y : currentPosition.y;

    const tileWidth = width / tileSize;
    const selectedTile = minY * tileWidth + minX;
    const selectionWidth = maxX - minX + 1;
    const selectionHeight = maxY - minY + 1;

    return {
      selectedTile,
      selectionWidth,
      selectionHeight,
    };
  }

  getTilePosition( x, y ) {
    const { tileSize, height, scale } = this.props;

    const scaledX = x / scale;
    const scaledY = height - ( y / scale ) - 1;

    const tileX = Math.floor( scaledX / tileSize );
    const tileY = Math.floor( scaledY / tileSize );

    return { x: tileX, y: tileY };
  }

  render() {
    const { width, height, scale } = this.props;

    return (
      <canvas
        ref={ this.canvasRef }
        width={ width * scale }
        height={ height * scale }
        onPointerDown={ e => this.handlePointerDown( e ) }
        onPointerMove={ e => this.handlePointerMove( e ) }
        onPointerUp={ e => this.handlePointerUp( e ) }
        onPointerLeave={ e => this.handlePointerExit( e ) }
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
  selectedTile: PropTypes.number.isRequired,
  selectionWidth: PropTypes.number.isRequired,
  selectionHeight: PropTypes.number.isRequired,
  tileSize: PropTypes.number.isRequired,
  onSelectionChange: PropTypes.func.isRequired,
};

export default TileSelectorCanvas;
