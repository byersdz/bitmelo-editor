
import React from 'react';
import PropTypes from 'prop-types';

import {
  secondaryColor,
  secondaryDarkColor,
  primaryDarkerColor,
  primaryColor,
} from 'Style/colors';

import './WaveGrid.scss';

const gridScale = 18;
const borderSize = 2;

class WaveGrid extends React.Component {
  static getBaseXPosition( x ) {
    return x * gridScale;
  }

  static getBaseYPosition( y, gridHeight, minValue ) {
    const adjustedY = y - minValue;
    return ( gridHeight - adjustedY - 1 ) * gridScale;
  }

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
      minValue,
      maxValue,
      data,
      showLoop,
      loopStart,
      loopEnd,
    } = this.props;

    const gridHeight = maxValue - minValue + 1;

    const canvas = this.canvasRef.current;
    const context = canvas.getContext( '2d' );
    const { width, height } = canvas;

    context.clearRect( 0, 0, width, height );

    // draw betweens
    context.fillStyle = secondaryDarkColor;
    for ( let i = 0; i < data.length; i += 1 ) {
      const baseX = WaveGrid.getBaseXPosition( i );
      let baseY = WaveGrid.getBaseYPosition( 0, gridHeight, minValue );
      const targetY = WaveGrid.getBaseYPosition( data[i], gridHeight, minValue );
      if ( targetY < baseY ) {
        baseY += gridScale;
      }
      const betweenHeight = targetY - baseY;
      context.fillRect( baseX, baseY, gridScale, betweenHeight );
    }

    // draw values
    context.fillStyle = secondaryColor;
    for ( let i = 0; i < data.length; i += 1 ) {
      const baseX = WaveGrid.getBaseXPosition( i );
      const baseY = WaveGrid.getBaseYPosition( data[i], gridHeight, minValue );
      context.fillRect( baseX, baseY, gridScale, gridScale );
    }

    // draw loop
    if ( showLoop ) {
      context.fillStyle = primaryDarkerColor;
      // context.fillRect( 0, height - gridScale, width, gridScale );

      context.fillStyle = primaryColor;
      const baseX = loopStart * gridScale;
      const loopWidth = ( loopEnd - loopStart + 1 ) * gridScale;
      context.fillRect( baseX, height - gridScale, loopWidth, gridScale );
    }

    // draw borders
    context.fillStyle = '#000';
    for ( let x = 0; x < data.length + 1; x += 1 ) {
      context.fillRect( x * gridScale, 0, borderSize, height );
    }

    let numberOfHorizLines = gridHeight + 1;
    if ( showLoop ) {
      numberOfHorizLines += 1;
    }

    for ( let y = 0; y < numberOfHorizLines; y += 1 ) {
      context.fillRect( 0, y * gridScale, width, borderSize );
    }

    context.restore();
  }

  handleSelection( e ) {
    const { offsetX, offsetY } = e.nativeEvent;
    const {
      minValue,
      maxValue,
      data,
      onDataChange,
    } = this.props;

    const gridHeight = maxValue - minValue + 1;

    const gridX = Math.floor( offsetX / gridScale );
    let gridY = Math.floor( offsetY / gridScale );
    gridY = gridHeight - gridY - 1;
    gridY = gridY + minValue;

    const selectedValue = gridY;

    if ( selectedValue < minValue || selectedValue > maxValue ) {
      // invalid value
      return;
    }

    if ( gridX >= 0 && gridX < data.length ) {
      if ( data[gridX] !== selectedValue ) {
        const newData = [...data];
        newData[gridX] = gridY;
        onDataChange( newData );
      }
    }
  }

  render() {
    const { data } = this.props;
    const { minValue, maxValue, showLoop } = this.props;

    let gridHeight = maxValue - minValue + 1;
    if ( showLoop ) {
      gridHeight += 1;
    }

    const gridWidth = data.length;

    const width = ( gridWidth * gridScale ) + borderSize;
    const height = ( gridHeight * gridScale ) + borderSize;

    return (
      <canvas
        width={ width }
        height={ height }
        ref={ this.canvasRef }
        onPointerDown={ e => this.handleSelection( e ) }
        onPointerMove={ e => {
          if ( e.buttons === 1 ) {
            this.handleSelection( e );
          }
        } }
      />
    );
  }
}

WaveGrid.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  data: PropTypes.arrayOf( PropTypes.number ).isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  showLoop: PropTypes.bool.isRequired,
  loopStart: PropTypes.number.isRequired,
  loopEnd: PropTypes.number.isRequired,
};

export default WaveGrid;
