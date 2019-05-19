
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MainCanvas from './MainCanvas/MainCanvas';

import './PixelEditor.scss';

class PixelEditor extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      width: 0,
      height: 0,
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

  render() {
    const { width, height } = this.state;

    const scale = 2;
    const data = [
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
    ];
    const dataWidth = 4;
    const dataHeight = 4;

    return (
      <div className="pixel-editor" ref={ this.containerRef }>
        <MainCanvas
          width={ width }
          height={ height }
          scale={ scale }
          data={ data }
          dataWidth={ dataWidth }
          dataHeight={ dataHeight }
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
