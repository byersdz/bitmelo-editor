
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
    const { isPanning, scrollAmount } = this.state;

    if ( isPanning ) {
      return;
    }

    let newAmount = scrollAmount + event.deltaY;

    let cutoff = 99;
    if ( event.deltaMode === 1 ) {
      cutoff = 2;
    }
    else if ( event.deltaMode === 2 ) {
      cutoff = 1;
    }

    if ( newAmount < -cutoff ) {
      this.increaseScale();
      newAmount = 0;
    }
    else if ( newAmount > cutoff ) {
      this.decreaseScale();
      newAmount = 0;
    }
    this.setState( { scrollAmount: newAmount } );
  }

  increaseScale() {
    const { scale } = this.state;
    if ( scale + 1 < scales.length ) {
      this.setState( { scale: scale + 1 } );
    }
  }

  decreaseScale() {
    const { scale } = this.state;
    if ( scale - 1 >= 0 ) {
      this.setState( { scale: scale - 1 } );
    }
  }

  getOffsetFromPanning( offsetX, offsetY, startX, startY, currentX, currentY ) {
    const xDiff = currentX - startX;
    const yDiff = currentY - startY;
    return {
      x: offsetX + xDiff,
      y: offsetY + yDiff,
    };
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

    const data = [
      1, 1, 1, 1,
      0, 0, 0, 0,
      0, 0, 0, 0,
      1, 0, 0, 1,
    ];
    const dataWidth = 4;
    const dataHeight = 4;

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
          offsetX={ pannedXOffset }
          offsetY={ pannedYOffset }
        />
        <MainCanvas
          width={ width }
          height={ height }
          scale={ actualScale }
          data={ data }
          dataWidth={ dataWidth }
          dataHeight={ dataHeight }
          offsetX={ pannedXOffset }
          offsetY={ pannedYOffset }
        />
      </div>
    );
  }
}

PixelEditor.propTypes = {
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
