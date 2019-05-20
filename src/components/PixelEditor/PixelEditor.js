
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MainCanvas from './MainCanvas/MainCanvas';
import OverlayCanvas from './OverlayCanvas/OverlayCanvas';

import './PixelEditor.scss';

class PixelEditor extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      width: 0,
      height: 0,
      isPanning: false,
      pointerStartX: 0,
      pointerStartY: 0,
      pointerCurrentX: 0,
      pointerCurrentY: 0,
      offsetX: 0,
      offsetY: 0,
    };

    this.containerRef = React.createRef();
    this.updateDimensions = this.updateDimensions.bind( this );
  }

  componentDidMount() {
    window.addEventListener( 'resize', this.updateDimensions );
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
    window.removeEventListener( 'resize', this.updateDimensions );
  }

  updateDimensions() {
    this.setState( {
      width: this.containerRef.current.offsetWidth,
      height: this.containerRef.current.offsetHeight,
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
      isPanning,
      offsetX,
      offsetY,
      pointerStartX,
      pointerStartY,
    } = this.state;

    if ( event.button === 1 ) {
      if ( isPanning ) {
        const offsetPosition = this.getOffsetFromPanning(
          offsetX,
          offsetY,
          pointerStartX,
          pointerStartY,
          event.nativeEvent.offsetX,
          event.nativeEvent.offsetY,
        );
        this.setState( { offsetX: offsetPosition.x, offsetY: offsetPosition.y } );
      }
      this.setState( { isPanning: false } );
    }
  }

  handlePointerMove( event ) {
    const { offsetX, offsetY } = event.nativeEvent;
    this.setState( {
      pointerCurrentX: offsetX,
      pointerCurrentY: offsetY,
    } );
  }

  handlePointerExit( event ) {
    console.log( event );
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
      offsetX,
      offsetY,
      isPanning,
      pointerStartX,
      pointerStartY,
      pointerCurrentX,
      pointerCurrentY,
    } = this.state;

    const scale = 32;
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

    return (
      <div className="pixel-editor" ref={ this.containerRef }>
        <OverlayCanvas
          width={ width }
          height={ height }
          onPointerDown={ e => this.handlePointerDown( e ) }
          onPointerUp={ e => this.handlePointerUp( e ) }
          onPointerMove={ e => this.handlePointerMove( e ) }
          offsetX={ pannedXOffset }
          offsetY={ pannedYOffset }
        />
        <MainCanvas
          width={ width }
          height={ height }
          scale={ scale }
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
