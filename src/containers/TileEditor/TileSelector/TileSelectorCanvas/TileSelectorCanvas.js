
import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';

import {
  drawPixelDataToCanvas,
  drawTileSelection,
  drawGrid,
} from 'Utils/drawToCanvas';

import { applyWheelScroll } from 'Utils/mouse';

import backgroundImage from 'Containers/PixelEditor/background.png';

import './TileSelectorCanvas.scss';

class TileSelectorCanvas extends React.Component {
  constructor( props ) {
    super( props );
    this.canvasRef = React.createRef();

    this.state = {
      startPosition: { x: 0, y: 0 },
      currentPosition: { x: 0, y: 0 },
      isSelecting: false,
      scrollAmount: 0,
      scale: 2,
    };
  }

  componentDidMount() {
    const { width, height } = this.props;

    const maxDimension = width > height ? width : height;
    const targetSize = 256;
    let newScale = Math.floor( targetSize / maxDimension );
    if ( newScale < 1 ) {
      newScale = 1;
    }

    this.setState( { scale: newScale } );
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

    if ( nextState.scale !== currentState.scale ) {
      return true;
    }

    return false;
  }

  draw() {
    const {
      width,
      height,
      palette,
      data,
      selectedTile,
      selectionWidth,
      selectionHeight,
      tileSize,
      editorSelection,
    } = this.props;

    const { scale } = this.state;

    const { isSelecting, startPosition, currentPosition } = this.state;

    const scaledWidth = width * scale;
    const scaledHeight = height * scale;

    const context = this.canvasRef.current.getContext( '2d' );
    context.clearRect( 0, 0, scaledWidth, scaledHeight );

    const dataCopy = cloneDeep( data );

    // draw the editorSelection
    if ( editorSelection && editorSelection.isActive ) {
      const originX = ( selectedTile % ( width / tileSize ) ) * tileSize;
      const originY = Math.floor( selectedTile / 8 ) * tileSize;

      console.log( originX, originY );

      for ( let y = 0; y < editorSelection.height; y += 1 ) {
        for ( let x = 0; x < editorSelection.width; x += 1 ) {
          const offsetX = x + editorSelection.offsetX;
          const offsetY = y + editorSelection.offsetY;

          if (
            offsetX >= 0
            && offsetX < selectionWidth * tileSize
            && offsetY >= 0
            && offsetY < selectionHeight * tileSize
          ) {
            const sourceIndex = y * editorSelection.width + x;
            if ( editorSelection.data[sourceIndex] ) { // ignore transparent pixels
              const destinationIndex = ( offsetY + originY ) * width + offsetX + originX;
              dataCopy[destinationIndex] = editorSelection.data[sourceIndex];
            }
          }
        }
      }
    }

    const settings = {
      scale,
      dataWidth: width,
      dataHeight: height,
      palette,
      data: dataCopy,
    };

    drawPixelDataToCanvas( settings, this.canvasRef.current );

    const gridSettings = {
      interval: tileSize,
      lineWidth: 1,
      style: '#00000088',
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

  handleWheel( event ) {
    const { width, height } = this.props;
    const { scrollAmount, isSelecting, scale } = this.state;

    if ( isSelecting ) {
      return;
    }

    const {
      scrollAmount: newScrollAmount,
      didScrollUp,
      didScrollDown,
    } = applyWheelScroll( event, scrollAmount );

    let newScale = scale;

    if ( didScrollUp ) {
      newScale += 1;
    }
    else if ( didScrollDown ) {
      newScale -= 1;
    }

    const largestSide = width > height ? width : height;
    if ( newScale * largestSide > 600 ) {
      newScale = Math.floor( 600 / width );
    }

    if ( newScale < 1 ) {
      newScale = 1;
    }

    this.setState( {
      scrollAmount: newScrollAmount,
      scale: newScale,
    } );
  }

  finishSelecting() {
    const { onSelectionChange } = this.props;
    const { isSelecting, startPosition, currentPosition } = this.state;

    if ( !isSelecting ) {
      return;
    }

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
    const { tileSize, height } = this.props;
    const { scale } = this.state;

    const scaledX = x / scale;
    const scaledY = height - ( y / scale ) - 1;

    let tileX = Math.floor( scaledX / tileSize );
    let tileY = Math.floor( scaledY / tileSize );

    if ( tileX < 0 ) {
      tileX = 0;
    }

    if ( tileY < 0 ) {
      tileY = 0;
    }

    return { x: tileX, y: tileY };
  }

  render() {
    const { width, height } = this.props;
    const { scale } = this.state;

    const style = {
      backgroundImage: `url(${ backgroundImage })`,
    };

    return (
      <canvas
        style={ style }
        ref={ this.canvasRef }
        width={ width * scale }
        height={ height * scale }
        onPointerDown={ e => this.handlePointerDown( e ) }
        onPointerMove={ e => this.handlePointerMove( e ) }
        onPointerUp={ e => this.handlePointerUp( e ) }
        onPointerLeave={ e => this.handlePointerExit( e ) }
        onWheel={ e => this.handleWheel( e ) }
      />
    );
  }
}

TileSelectorCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  palette: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  selectedTile: PropTypes.number.isRequired,
  selectionWidth: PropTypes.number.isRequired,
  selectionHeight: PropTypes.number.isRequired,
  tileSize: PropTypes.number.isRequired,
  onSelectionChange: PropTypes.func.isRequired,
  editorSelection: PropTypes.object.isRequired,
};

export default TileSelectorCanvas;
