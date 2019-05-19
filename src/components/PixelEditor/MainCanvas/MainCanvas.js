
import React from 'react';
import PropTypes from 'prop-types';

import './MainCanvas.scss';

class MainCanvas extends React.Component {
  componentDidMount() {
    this.draw();
  }

  draw() {
    const {
      scale,
      data,
      dataWidth,
      dataHeight,
    } = this.props;

    console.log( [scale, data, dataWidth, dataHeight] );
  }

  render() {
    const { width, height } = this.props;

    return (
      <canvas
        className="main-canvas"
        width={ width }
        height={ height }
      />
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
};

export default MainCanvas;
