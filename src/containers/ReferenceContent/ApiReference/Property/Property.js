
import React from 'react';
import PropTypes from 'prop-types';

const Property = props => {
  const {
    name,
    type,
    description,
    example,
  } = props;

  const trimmedExample = example ? example.trim() : null;

  let exampleRender = null;
  if ( example ) {
    exampleRender = (
      <pre className="example">
        <code>
          { trimmedExample }
        </code>
      </pre>
    );
  }
  return (
    <div className="property">
      <div className="header">
        <div className="name">
          { name }
        </div>
        <div className="type">
          { type }
        </div>
      </div>
      <div className="description">
        {description }
      </div>
      { exampleRender }
    </div>
  );
};

Property.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  example: PropTypes.string,
};

Property.defaultProps = {
  example: '',
};

export default Property;
