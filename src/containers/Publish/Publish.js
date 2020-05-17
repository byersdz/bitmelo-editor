import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import CreateUserModal from '../User/CreateUserModal/CreateUserModal';
import LoginUserModal from '../User/LoginUserModal/LoginUserModal';

import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import AButton from '../../components/AButton/AButton';

import { publishGame } from '../../api/game';

import createTransferProject from '../../utils/Convert/createTransferProject';

import { fetchPublishedGame } from '../../state/User/currentProject';

import './Publish.scss';

class Publish extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      createUserModalIsOpen: false,
      loginUserModalIsOpen: false,
    };
  }

  componentDidMount() {
    const { _fetchPublishedGame } = this.props;

    _fetchPublishedGame();
  }

  async handlePublishClick() {
    const { projectState, currentProject } = this.props;

    const projectData = createTransferProject( projectState );

    const publishResponse = await publishGame( currentProject.id, projectData );

    console.log( publishResponse );
  }

  render() {
    const { currentUser, currentProject } = this.props;
    const { createUserModalIsOpen, loginUserModalIsOpen } = this.state;

    let mainRender = (
      <div className="sign-up-content">
        <Button
          className="create-account-btn"
          title="Sign up"
          click={ () => this.setState( { createUserModalIsOpen: true } ) }
        />
        { ' or ' }
        <Button
          className="log-in-btn"
          title="Log in"
          click={ () => this.setState( { loginUserModalIsOpen: true } ) }
        />
        { ' to publish your game.' }
      </div>
    );

    if ( currentUser.isLoggedIn ) {
      if ( currentProject.id ) {
        // can publish project
        if ( currentProject.publishedGame ) {
          // eslint-disable-next-line max-len
          const gameUrl = `https://bitmelo.com/user/${ currentUser.userName }/${ currentProject.publishedGame.urlName }`;
          const updateDate = moment( currentProject.publishedGame.dateUpdated ).format( 'MMMM Do YYYY, h:mm:ss a' );
          mainRender = (
            <>
              <div className="publish-project-content">
                <div className="publish-date">
                  <div className="label">Last Published:</div>
                  { updateDate }
                </div>
                <div className="project-name">
                  <div className="label">Project Name:</div>
                  { currentProject.publishedGame.project.name }
                </div>
                <div className="publish-url">
                  <div className="label">Public Game URL:</div>
                  <AButton href={ gameUrl }>{ gameUrl }</AButton>
                </div>
                <Button
                  title="Update Published Game"
                  standard
                  click={ () => this.handlePublishClick() }
                />
              </div>
            </>
          );
        }
        else {
          mainRender = (
            <div className="publish-project-content">
              <div>
                This project has never been published.
              </div>
              <Button
                title="Publish"
                standard
                click={ () => this.handlePublishClick() }
              />
            </div>
          );
        }
      }
      else {
        // need to create project
        mainRender = (
          <div className="create-project-content">
            The current project is a local data only project. A cloud project must be created to publish this game.
            <Button
              title="Create Cloud Project"
              standard
              click={ () => console.log( 'create cloud project' ) }
            />
          </div>
        );
      }
    }

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
      <div className="publish">
        <Card title="Publish Your Game:">
          { mainRender }
        </Card>
        { createUserModalRender }
        { loginUserModalRender }
      </div>
    );
  }
}

Publish.propTypes = {
  currentUser: PropTypes.object.isRequired,
  currentProject: PropTypes.object.isRequired,
  projectState: PropTypes.object.isRequired,
  _fetchPublishedGame: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    projectState: state,
    currentUser: state.user.currentUser,
    currentProject: state.user.currentProject,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _fetchPublishedGame: fetchPublishedGame,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Publish );
