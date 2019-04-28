
import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars as RCS } from 'react-custom-scrollbars';

import './Scrollbars.scss';

const Scrollbars = props => {
  const { children } = props;
  return (
    <RCS>
      { children }
    </RCS>
  );
};

Scrollbars.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Scrollbars;
