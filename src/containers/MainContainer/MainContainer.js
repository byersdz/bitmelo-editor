
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  PROJECT_TAB,
  PLAY_TAB,
  CODE_TAB,
  TILE_TAB,
  SOUND_TAB,
  TILEMAP_TAB,
} from 'State/Layout/activeNavigationTab';
import TopBar from 'Components/TopBar/TopBar';
import Scrollbars from 'Components/Scrollbars/Scrollbars';

import ProjectEditor from 'Containers/ProjectEditor/ProjectEditor';
import Play from 'Containers/Play/Play';
import CodeEditor from 'Containers/CodeEditor/CodeEditor';
import TileEditor from 'Containers/TileEditor/TileEditor';
import TilemapEditor from 'Containers/TilemapEditor/TilemapEditor';
import SoundEditor from 'Containers/SoundEditor/SoundEditor';

import './MainContainer.scss';

class MainContainer extends React.Component {
  render() {
    const { activeNavigationTab, projectName } = this.props;
    let contentRender = null;

    let topBarTitle = 'Bitmelo™';

    switch ( activeNavigationTab ) {
      case PROJECT_TAB:
        contentRender = (
          <Scrollbars>
            <ProjectEditor />
          </Scrollbars>
        );
        topBarTitle = `${ projectName }: Project`;
        break;
      case PLAY_TAB:
        contentRender = <Play />;
        topBarTitle = `${ projectName }: Play`;
        break;
      case CODE_TAB:
        contentRender = <CodeEditor />;
        topBarTitle = `${ projectName }: Code`;
        break;
      case TILE_TAB:
        contentRender = <TileEditor />;
        topBarTitle = `${ projectName }: Tile Editor`;
        break;
      case TILEMAP_TAB:
        contentRender = <TilemapEditor />;
        topBarTitle = `${ projectName }: Tilemap Editor`;
        break;
      case SOUND_TAB:
        contentRender = (
          <Scrollbars>
            <SoundEditor />
          </Scrollbars>
        );
        topBarTitle = `${ projectName }: Sound Editor`;
        break;
      default:
        contentRender = (
          <Scrollbars>
            <ProjectEditor />
          </Scrollbars>
        );
        break;
    }

    return (
      <div className="main-container">
        <TopBar title={ topBarTitle } />
        { contentRender }
      </div>
    );
  }
}

MainContainer.propTypes = {
  activeNavigationTab: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
};

function mapStateToProps( state ) {
  return {
    projectName: state.project.name,
    activeNavigationTab: state.layout.activeNavigationTab,
  };
}

export default connect( mapStateToProps )( MainContainer );
