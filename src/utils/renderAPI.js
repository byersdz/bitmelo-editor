
import React from 'react';

export function renderProperty( name, type, description, example ) {
  const trimmedExample = example ? example.trim() : null;
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
      <pre>
        <code className="example">
          { trimmedExample }
        </code>
      </pre>
    </div>
  );
}

export function renderMethod( name, params, description, example ) { // eslint-disable-line
  const trimmedExample = example ? example.trim() : null;
  const styledName = `${ name }()`;
  return (
    <div className="method">
      <div className="header">
        <div className="name">
          { styledName }
        </div>
      </div>
      <div className="description">
        {description }
      </div>
      <pre>
        <code className="example">
          { trimmedExample }
        </code>
      </pre>
    </div>
  );
}
