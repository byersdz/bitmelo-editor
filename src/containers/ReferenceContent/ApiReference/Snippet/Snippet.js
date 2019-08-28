
import React from 'react';
import PropTypes from 'prop-types';

import './Snippet.scss';

const Snippet = ( { text } ) => (
  <pre className="snippet">
    <code>
      { text.trim() }
    </code>
  </pre>
);

Snippet.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Snippet;
