
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  ABOUT_TAB,
  PROJECT_TAB,
  PLAY_TAB,
  CODE_TAB,
  TILE_TAB,
  SOUND_TAB,
  TILEMAP_TAB,
  PUBLISH_TAB,
} from '../../state/Layout/activeNavigationTab';
import TopBar from '../../components/TopBar/TopBar';
import Scrollbars from '../../components/Scrollbars/Scrollbars';
import Button from '../../components/Button/Button';

import About from '../About/About';
import ProjectEditor from '../ProjectEditor/ProjectEditor';
import Play from '../Play/Play';
import CodeEditor from '../CodeEditor/CodeEditor';
import TileEditor from '../TileEditor/TileEditor';
import TilemapEditor from '../TilemapEditor/TilemapEditor';
import SoundEditor from '../SoundEditor/SoundEditor';
import Publish from '../Publish/Publish';

import CreateUserModal from '../User/CreateUserModal/CreateUserModal';
import LoginUserModal from '../User/LoginUserModal/LoginUserModal';
import UserButton from '../User/UserButton/UserButton';
import SaveProjectButton from '../User/SaveProjectButton/SaveProjectButton';

import TileEditorActionsButton from '../Actions/TileEditor/TileEditorActionsButton/TileEditorActionsButton';

import './MainContainer.scss';

class MainContainer extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      createUserModalIsOpen: false,
      loginUserModalIsOpen: false,
    };
  }

  render() {
    const {
      activeNavigationTab,
      projectName,
      currentUser,
      currentProject,
    } = this.props;
    const { createUserModalIsOpen, loginUserModalIsOpen } = this.state;

    let contentRender = null;

    let topBarTitle = 'Bitmelo';

    let actionsButton = null;

    switch ( activeNavigationTab ) {
      case ABOUT_TAB: {
        contentRender = (
          <Scrollbars>
            <About />
          </Scrollbars>
        );
        topBarTitle += ': About';
        break;
      }
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
        actionsButton = <TileEditorActionsButton />;
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
      case PUBLISH_TAB: {
        contentRender = (
          <Scrollbars>
            <Publish />
          </Scrollbars>
        );
        topBarTitle = `${ projectName }: Publish`;
        break;
      }
      default:
        contentRender = (
          <Scrollbars>
            <ProjectEditor />
          </Scrollbars>
        );
        break;
    }

    const userButtonsRender = currentUser.isLoggedIn ? (
      <UserButton />
    ) : (
      <>
        <Button
          className="create-account-btn"
          title="Sign up"
          click={ () => this.setState( { createUserModalIsOpen: true } ) }
        />
        <Button
          className="log-in-btn"
          title="Log in"
          click={ () => this.setState( { loginUserModalIsOpen: true } ) }
          standard
        />
      </>
    );

    const saveButtonRender = currentUser.isLoggedIn && currentProject.id ? (
      <SaveProjectButton />
    ) : null;

    const rightItemsRender = (
      <>
        { saveButtonRender }
        { userButtonsRender }
        { actionsButton }
      </>
    );

    const createUserModalRender = createUserModalIsOpen ? (
      <CreateUserModal
        onClose={ () => this.setState( { createUserModalIsOpen: false } ) }
      />
    ) : null;

    const loginUserModalRender = loginUserModalIsOpen ? (
      <LoginUserModal
        onClose={ () => this.setState( { loginUserModalIsOpen: false } ) }
      />
    ) : null;

    return (
      <div className="main-container">
        <TopBar
          className="main-top-bar"
          title={ topBarTitle }
          rightItems={ rightItemsRender }
        />
        { contentRender }
        { createUserModalRender }
        { loginUserModalRender }
      </div>
    );
  }
}

MainContainer.propTypes = {
  activeNavigationTab: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  currentUser: PropTypes.object.isRequired,
  currentProject: PropTypes.object.isRequired,
};

function mapStateToProps( state ) {
  return {
    projectName: state.project.name,
    activeNavigationTab: state.layout.activeNavigationTab,
    currentUser: state.user.currentUser,
    currentProject: state.user.currentProject,
  };
}

export default connect( mapStateToProps )( MainContainer );
