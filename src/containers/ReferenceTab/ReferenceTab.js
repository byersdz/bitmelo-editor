
import React from 'react';

import TopBar from 'Components/TopBar/TopBar';
import Button from 'Components/Button/Button';

import './ReferenceTab.scss';

class ReferenceTab extends React.Component {
  render() {
    return (
      <div className="reference-tab">
        <Button
          className="toggle-btn"
          title="Toggle Reference Panel"
          icon="play"
          hideTitle
        />
        <TopBar title="Reference" />

      </div>
    );
  }
}

export default ReferenceTab;
