
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CreateUserModal from '../User/CreateUserModal/CreateUserModal';
import LoginUserModal from '../User/LoginUserModal/LoginUserModal';

import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import ProjectItem from './ProjectItem/ProjectItem';

import { fetchUserProjects } from '../../state/User/projects';

import './ProjectsView.scss';

class ProjectsView extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      createUserModalIsOpen: false,
      loginUserModalIsOpen: false,
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

  render() {
    const { projects, currentUser } = this.props;
    const { createUserModalIsOpen, loginUserModalIsOpen } = this.state;

    const { projectsArray } = projects;

    const itemsRender = projectsArray.map( project => {
      console.log( project );
      return <ProjectItem name={ project.name } />;
    } );

    let mainRender = null;

    if ( currentUser.isLoggedIn ) {
      mainRender = itemsRender;
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

    return (
      <Card className="projects-view">
        { mainRender }
        { createUserModalRender }
        { loginUserModalRender }
      </Card>
    );
  }
}

ProjectsView.propTypes = {
  currentUser: PropTypes.object.isRequired,
  _fetchUserProjects: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired,
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
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ProjectsView );
