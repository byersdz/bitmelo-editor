
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Method = props => {
  const {
    name,
    params,
    description,
    example,
  } = props;

  const trimmedExample = example ? example.trim() : null;
  let styledName = `${ name }()`;
  if ( params && params.length > 0 ) {
    const numCharacters = name.length + params[0].name.length;
    if ( params.length > 1 || numCharacters > 30 ) {
      // do nothing for now
      styledName = `${ name }(`;
      for ( let i = 0; i < params.length; i += 1 ) {
        styledName += `
  ${ params[i].name },`;
      }
      styledName += `
)`;
    }
    else {
      styledName = `${ name }(${ params[0].name })`;
    }
  }

  let paramsRender = null;
  if ( params && params.length > 0 ) {
    const itemsRender = params.map( param => {
      return (
        <div className="param" key={ param.name }>
          <div className="header">
            <div className="name">
              { param.name }
            </div>
            <div className="type">
              { param.type }
            </div>
          </div>
          <div className="description">
            { param.description }
          </div>
        </div>
      );
    } );
    paramsRender = (
      <Fragment>
        { itemsRender }
      </Fragment>
    );
  }

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
    <div className="method">
      <div className="header">
        <div className="name">
          <pre>
            { styledName }
          </pre>
        </div>
      </div>
      <div className="description">
        {description }
      </div>
      { exampleRender }
      { params && params.length > 0 ? <span className="param-title">Parameters:</span> : '' }
      { paramsRender }
    </div>
  );
};

Method.propTypes = {
  name: PropTypes.string.isRequired,
  params: PropTypes.array,
  description: PropTypes.string.isRequired,
  example: PropTypes.string,
};

Method.defaultProps = {
  params: null,
  example: '',
};

export default Method;
