
import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars as RCS } from 'react-custom-scrollbars';

import './Scrollbars.scss';

const Scrollbars = props => {
  const { children, className } = props;
  return (
    <RCS
      className={ className }
      // renderTrackHorizontal={ p => <div { ...p } className="track-horizontal" /> }
      renderTrackVertical={ p => <div { ...p } className="track-vertical" /> }
      // renderThumbHorizontal={ p => <div { ...p } className="thumb-horizontal" /> }
      renderThumbVertical={ p => <div { ...p } className="thumb-vertical" /> }
    >
      { children }
    </RCS>
  );
};

Scrollbars.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Scrollbars.defaultProps = {
  className: '',
};

export default Scrollbars;
