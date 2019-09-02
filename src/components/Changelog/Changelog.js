import React from 'react';

import logData from '../../../changelog.json';

import './Changelog.scss';

const Changelog = () => {
  const firstItem = logData.versions[0];

  const itemsRender = firstItem.changes.map( change => {
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
    </div>
  );
};

export default Changelog;
