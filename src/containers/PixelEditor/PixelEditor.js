
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MainCanvas from './MainCanvas/MainCanvas';
import OverlayCanvas from './OverlayCanvas/OverlayCanvas';

import './PixelEditor.scss';

const scales = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  18,
  20,
  22,
  24,
  26,
  28,
  32,
  40,
  48,
  56,
  64,
  80,
  96,
  112,
  128,
  160,
  192,
  224,
  256,
];

class PixelEditor extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
      scale: 4,
      isPanning: false,
      pointerStartX: 0,
      pointerStartY: 0,
      pointerCurrentX: 0,
      pointerCurrentY: 0,
      offsetX: 0,
      offsetY: 0,
      scrollAmount: 0,
    };

    this.containerRef = React.createRef();
    this.updateDimensions = this.updateDimensions.bind( this );

    this.handlePointerMove = this.handlePointerMove.bind( this );
    this.handlePointerUp = this.handlePointerUp.bind( this );
    this.handlePointerExit = this.handlePointerExit.bind( this );
  }

  componentDidMount() {
    document.addEventListener( 'resize', this.updateDimensions );
    document.addEventListener( 'pointermove', this.handlePointerMove );
    document.addEventListener( 'pointerup', this.handlePointerUp );
    document.addEventListener( 'pointerleave', this.handlePointerExit );
    document.addEventListener( 'pointercancel', this.handlePointerExit );

    this.updateDimensions();
  }

  componentDidUpdate( prevProps ) {
    const { navigationPanelIsOpen, referencePanelIsOpen } = this.props;
    const {
      navigationPanelIsOpen: prevNavIsOpen,
      referencePanelIsOpen: prevRefIsOpen,
    } = prevProps;

    if (
      navigationPanelIsOpen !== prevNavIsOpen
      || referencePanelIsOpen !== prevRefIsOpen
    ) {
      this.updateDimensions();
    }
  }

  componentWillUnmount() {
    document.removeEventListener( 'resize', this.updateDimensions );
    document.removeEventListener( 'pointermove', this.handlePointerMove );
    document.removeEventListener( 'pointerup', this.handlePointerUp );
    document.removeEventListener( 'pointerleave', this.handlePointerExit );
    document.removeEventListener( 'pointercancel', this.handlePointerExit );
  }

  updateDimensions() {
    const clientRect = this.containerRef.current.getBoundingClientRect();
    this.setState( {
      width: this.containerRef.current.offsetWidth,
      height: this.containerRef.current.offsetHeight,
      left: clientRect.left,
      top: clientRect.top,
    } );
  }

  handlePointerDown( event ) {
    if ( event.button === 1 ) {
      this.setState( {
        isPanning: true,
        pointerStartX: event.nativeEvent.offsetX,
        pointerStartY: event.nativeEvent.offsetY,
      } );
    }
  }

  handlePointerUp( event ) {
    const {
      left,
      top,
      isPanning,
      offsetX,
      offsetY,
      pointerStartX,
      pointerStartY,
    } = this.state;

    const { clientX, clientY } = event;

    if ( event.button === 1 ) {
      if ( isPanning ) {
        const offsetPosition = this.getOffsetFromPanning(
          offsetX,
          offsetY,
          pointerStartX,
          pointerStartY,
          clientX - left,
          clientY - top,
        );
        this.setState( { offsetX: offsetPosition.x, offsetY: offsetPosition.y } );
      }
      this.setState( { isPanning: false } );
    }
  }

  handlePointerMove( event ) {
    const { left, top } = this.state;
    const { clientX, clientY } = event;
    this.setState( {
      pointerCurrentX: clientX - left,
      pointerCurrentY: clientY - top,
    } );
  }

  handlePointerExit() {
    const {
      isPanning,
      offsetX,
      offsetY,
      pointerStartX,
      pointerStartY,
      pointerCurrentX,
      pointerCurrentY,
    } = this.state;

    if ( isPanning ) {
      const offsetPosition = this.getOffsetFromPanning(
        offsetX,
        offsetY,
        pointerStartX,
        pointerStartY,
        pointerCurrentX,
        pointerCurrentY,
      );
      this.setState( {
        offsetX: offsetPosition.x,
        offsetY: offsetPosition.y,
        isPanning: false,
      } );
    }
  }

  handleWheel( event ) {
    const {
      width,
      height,
      isPanning,
      scrollAmount,
      pointerCurrentX,
      pointerCurrentY,
      offsetX,
      offsetY,
      scale,
    } = this.state;

    const { dataWidth, dataHeight } = this.props;

    if ( isPanning ) {
      return;
    }

    const actualScale = scales[scale];
    const pixelX = ( pointerCurrentX - offsetX ) / actualScale;
    const pixelY = ( pointerCurrentY - offsetY ) / actualScale;

    let newAmount = scrollAmount + event.deltaY;

    let cutoff = 99;
    if ( event.deltaMode === 1 ) {
      cutoff = 2;
    }
    else if ( event.deltaMode === 2 ) {
      cutoff = 1;
    }

    let newScale = scale;
    if ( newAmount < -cutoff ) {
      if ( newScale < scales.length - 1 ) {
        newScale += 1;
      }
      newAmount = 0;
    }
    else if ( newAmount > cutoff ) {
      if ( newScale > 0 ) {
        newScale -= 1;
      }
      newAmount = 0;
    }

    if ( newScale !== scale ) {
      const newActualScale = scales[newScale];

      const targetX = pixelX * newActualScale;
      const targetY = pixelY * newActualScale;

      let newOffsetX = pointerCurrentX - targetX;
      let newOffsetY = pointerCurrentY - targetY;

      newOffsetX = this.getLimitedOffset( width, dataWidth, newScale, newOffsetX );
      newOffsetY = this.getLimitedOffset( height, dataHeight, newScale, newOffsetY );

      this.setState( {
        offsetX: newOffsetX,
        offsetY: newOffsetY,
      } );
    }

    this.setState( { scrollAmount: newAmount, scale: newScale } );
  }

  getOffsetFromPanning( offsetX, offsetY, startX, startY, currentX, currentY ) {
    const { width, height, scale } = this.state;
    const { dataWidth, dataHeight } = this.props;

    const xDiff = currentX - startX;
    const yDiff = currentY - startY;

    let newX = offsetX + xDiff;
    let newY = offsetY + yDiff;

    newX = this.getLimitedOffset( width, dataWidth, scale, newX );
    newY = this.getLimitedOffset( height, dataHeight, scale, newY );
    return {
      x: newX,
      y: newY,
    };
  }

  getLimitedOffset( viewWidth, dataWidth, scale, offset ) {
    const actualScale = scales[scale];
    const scaledDataWidth = dataWidth * actualScale;
    let newOffset = offset;
    if ( scaledDataWidth * 2 < viewWidth ) {
      // limit to the edges of the data
      if ( offset < 0 ) {
        newOffset = 0;
      }
      else if ( offset > viewWidth - scaledDataWidth ) {
        newOffset = viewWidth - scaledDataWidth;
      }
    }
    else {
      const halfView = viewWidth * 0.5;
      if ( scaledDataWidth + offset < halfView ) {
        newOffset = halfView - scaledDataWidth;
      }
      else if ( offset > halfView ) {
        newOffset = halfView;
      }
    }
    return newOffset;
  }

  render() {
    const {
      width,
      height,
      scale,
      offsetX,
      offsetY,
      isPanning,
      pointerStartX,
      pointerStartY,
      pointerCurrentX,
      pointerCurrentY,
    } = this.state;

    const { data, dataWidth, dataHeight } = this.props;

    let pannedXOffset = offsetX;
    let pannedYOffset = offsetY;

    if ( isPanning ) {
      const newOffset = this.getOffsetFromPanning(
        offsetX,
        offsetY,
        pointerStartX,
        pointerStartY,
        pointerCurrentX,
        pointerCurrentY,
      );
      pannedXOffset = newOffset.x;
      pannedYOffset = newOffset.y;
    }

    const actualScale = scales[scale];

    return (
      <div className="pixel-editor" ref={ this.containerRef }>
        <OverlayCanvas
          width={ width }
          height={ height }
          onPointerDown={ e => this.handlePointerDown( e ) }
          onWheel={ e => this.handleWheel( e ) }
          offsetX={ Math.floor( pannedXOffset ) }
          offsetY={ Math.floor( pannedYOffset ) }
        />
        <MainCanvas
          width={ width }
          height={ height }
          scale={ actualScale }
          data={ data }
          dataWidth={ dataWidth }
          dataHeight={ dataHeight }
          offsetX={ Math.floor( pannedXOffset ) }
          offsetY={ Math.floor( pannedYOffset ) }
        />
      </div>
    );
  }
}

PixelEditor.propTypes = {
  data: PropTypes.arrayOf( PropTypes.number ).isRequired,
  dataWidth: PropTypes.number.isRequired,
  dataHeight: PropTypes.number.isRequired,
  navigationPanelIsOpen: PropTypes.bool.isRequired,
  referencePanelIsOpen: PropTypes.bool.isRequired,
};

function mapStateToProps( state ) {
  return {
    navigationPanelIsOpen: state.layout.navigationPanelIsOpen,
    referencePanelIsOpen: state.layout.referencePanelIsOpen,
  };
}

export default connect( mapStateToProps )( PixelEditor );
