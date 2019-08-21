
import React, { Fragment } from 'react';

export function renderProperty( name, type, description, example ) {
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
}

export function renderMethod( name, params, description, example ) { // eslint-disable-line
  const trimmedExample = example ? example.trim() : null;
  let styledName = `${ name }()`;
  if ( params ) {
    if ( params.length > 1 ) {
      // do nothing for now
      styledName = `${ name }(`;
      for ( let i = 0; i < params.length; i += 1 ) {
        styledName += `
  ${ params[i].name },`;
      }
      styledName += `
)`;
    }
    else if ( params.length === 1 ) {
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
      <pre className="example">
        <code>
          { trimmedExample }
        </code>
      </pre>
      { params && params.length > 0 ? <span className="param-title">Parameters:</span> : '' }
      { paramsRender }
    </div>
  );
}
