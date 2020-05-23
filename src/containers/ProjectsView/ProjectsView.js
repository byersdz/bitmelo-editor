
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CreateUserModal from '../User/CreateUserModal/CreateUserModal';
import LoginUserModal from '../User/LoginUserModal/LoginUserModal';
import DeleteProjectModal from '../User/DeleteProjectModal/DeleteProjectModal';
import CreateProjectModal from '../User/CreateProjectModal/CreateProjectModal';

import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import ProjectItem from './ProjectItem/ProjectItem';

import { fetchUserProjects } from '../../state/User/projects';
import { setCurrentUserProjectId } from '../../state/User/currentProject';
import { logoutUser } from '../../state/User/currentUser';
import { importProjectData } from '../../state/globalActions';
import { selectActivePage, EDITOR_PAGE } from '../../state/Layout/activePage';
import { selectNavigationTab, TILE_TAB } from '../../state/Layout/activeNavigationTab';

import { getProject } from '../../api/project';

import './ProjectsView.scss';

class ProjectsView extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      createUserModalIsOpen: false,
      loginUserModalIsOpen: false,
      deleteProjectModalIsOpen: false,
      createProjectModalIsOpen: false,
      selectedProject: null,
      createdProjectId: null,
    };
  }

  componentDidMount() {
    this.fetchProjects();
  }

  componentDidUpdate( prevProps ) {
    const { currentUser: lastUser } = prevProps;
    const { currentUser } = this.props;

    if ( currentUser.isLoggedIn && !lastUser.isLoggedIn ) {
      this.fetchProjects();
    }
  }

  async fetchProjects() {
    const { currentUser, _fetchUserProjects } = this.props;

    if ( !currentUser.isLoggedIn ) {
      return;
    }

    _fetchUserProjects( currentUser.id );
  }

  async fetchProjectAndEnterEditor( id ) {
    const {
      _selectActivePage,
      _importProjectData,
      _setCurrentUserProjectId,
      _logoutUser,
      _selectNavigationTab,
    } = this.props;

    const response = await getProject( id );
    if ( !response.isError ) {
      _setCurrentUserProjectId( id );
      _importProjectData( response.data );
      _selectActivePage( EDITOR_PAGE );
      _selectNavigationTab( TILE_TAB );
    }
    else if ( response.status === 401 ) {
      _logoutUser();
    }
  }

  handleProjectSelect( project ) {
    this.setState( { selectedProject: project } );
    this.fetchProjectAndEnterEditor( project.id );
  }

  handleProjectDelete( project ) {
    this.setState( { selectedProject: project } );
    this.setState( { deleteProjectModalIsOpen: true } );
    console.log( project.id );
  }

  render() {
    const { projects, currentUser } = this.props;
    const {
      createUserModalIsOpen,
      loginUserModalIsOpen,
      deleteProjectModalIsOpen,
      createProjectModalIsOpen,
      selectedProject,
      createdProjectId,
    } = this.state;

    const { projectsArray } = projects;

    const itemsRender = projectsArray.map( project => {
      return (
        <ProjectItem
          key={ project.id }
          project={ project }
          onSelect={ v => this.handleProjectSelect( v ) }
          onDelete={ v => this.handleProjectDelete( v ) }
        />
      );
    } );

    let mainRender = null;

    if ( currentUser.isLoggedIn ) {
      mainRender = (
        <>
          <Button
            className="create-project-btn"
            title="Create New Project"
            click={ () => this.setState( { createProjectModalIsOpen: true } ) }
            standard
          />
          { itemsRender }
        </>
      );
    }
    else {
      mainRender = (
        <div className="sign-up-content">
          <div className="sign-up-buttons">
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
            { ' to create cloud projects.' }
          </div>
          <p>
            Cloud Projects allow you to sync your project data to the cloud and to publish your games at bitmelo.com
          </p>
        </div>
      );
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

    const deleteProjectModalRender = deleteProjectModalIsOpen ? (
      <DeleteProjectModal
        onClose={ () => this.setState( { deleteProjectModalIsOpen: false } ) }
        project={ selectedProject }
      />
    ) : null;

    const createProjectModalRender = createProjectModalIsOpen ? (
      <CreateProjectModal
        onClose={ () => {
          if ( createdProjectId ) {
            this.fetchProjectAndEnterEditor( createdProjectId );
          }
          else {
            this.setState( { createProjectModalIsOpen: false } );
          }
        } }
        onProjectCreateSuccess={ id => {
          this.setState( { createdProjectId: id } );
        } }
      />
    ) : null;

    return (
      <Card
        className="projects-view"
        title="Cloud Projects:"
      >
        { mainRender }
        { createUserModalRender }
        { loginUserModalRender }
        { deleteProjectModalRender }
        { createProjectModalRender }
      </Card>
    );
  }
}

ProjectsView.propTypes = {
  currentUser: PropTypes.object.isRequired,
  _fetchUserProjects: PropTypes.func.isRequired,
  _importProjectData: PropTypes.func.isRequired,
  _selectActivePage: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired,
  _setCurrentUserProjectId: PropTypes.func.isRequired,
  _logoutUser: PropTypes.func.isRequired,
  _selectNavigationTab: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    currentUser: state.user.currentUser,
    projects: state.user.projects,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _fetchUserProjects: fetchUserProjects,
    _importProjectData: importProjectData,
    _selectActivePage: selectActivePage,
    _setCurrentUserProjectId: setCurrentUserProjectId,
    _logoutUser: logoutUser,
    _selectNavigationTab: selectNavigationTab,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ProjectsView );
