import React from 'react';

import logData from '../../../changelog.json';

import './Changelog.scss';

const Changelog = () => {
  const firstItem = logData.versions[0];
  const secondItem = logData.versions[1];

  const itemsRender = firstItem.changes.map( change => {
    return (
      <li key={ change }>
        { change }
      </li>
    );
  } );

  const secondItemsRender = secondItem.changes.map( change => {
    return (
      <li key={ change }>
        { change }
      </li>
    );
  } );

  return (
    <div className="changelog">
      <div className="changelog-item">
        <div className="log-version">
          { `v${ firstItem.version }` }
        </div>
        <div className="version-items">
          { itemsRender }
        </div>
      </div>
      <div className="changelog-item second">
        <div className="log-version">
          { `v${ secondItem.version }` }
        </div>
        <div className="version-items">
          { secondItemsRender }
        </div>
      </div>
    </div>
  );
};

export default Changelog;
