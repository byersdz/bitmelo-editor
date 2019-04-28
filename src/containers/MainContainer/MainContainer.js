
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { PROJECT_TAB, SOUND_TAB } from 'State/Layout/activeNavigationTab';
import TopBar from 'Components/TopBar/TopBar';
import ProjectEditor from 'Containers/ProjectEditor/ProjectEditor';
import SoundEditor from 'Containers/SoundEditor/SoundEditor';

import './MainContainer.scss';

class MainContainer extends React.Component {
  render() {
    const { activeNavigationTab } = this.props;
    let contentRender = null;

    switch ( activeNavigationTab ) {
      case PROJECT_TAB:
        contentRender = <ProjectEditor />;
        break;
      case SOUND_TAB:
        contentRender = <SoundEditor />;
        break;
      default:
        contentRender = <ProjectEditor />;
        break;
    }

    return (
      <div className="main-container">
        <TopBar title="Bitmelo Editor" />
        { contentRender }
      </div>
    );
  }
}

MainContainer.propTypes = {
  activeNavigationTab: PropTypes.string.isRequired,
};

function mapStateToProps( state ) {
  return {
    activeNavigationTab: state.layout.activeNavigationTab,
  };
}

export default connect( mapStateToProps )( MainContainer );
