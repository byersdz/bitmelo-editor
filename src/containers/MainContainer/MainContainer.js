
import React from 'react';

import TopBar from 'Components/TopBar/TopBar';

import './MainContainer.scss';

class MainContainer extends React.Component {
  render() {
    return (
      <div className="main-container">
        <TopBar title="Minnow Editor" />
      </div>
    );
  }
}

export default MainContainer;
