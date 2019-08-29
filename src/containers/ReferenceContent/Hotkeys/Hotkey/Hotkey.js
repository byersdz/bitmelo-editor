
import React from 'react';
import PropTypes from 'prop-types';

import './Hotkey.scss';

const Hotkey = props => {
  const { title, value } = props;

  return (
    <div className="ref-hotkey">
      <div className="title">
        { `${ title }: ` }
      </div>
      <div className="value">
        { value }
      </div>
    </div>
  );
};

Hotkey.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Hotkey;
