
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Card from '../../components/Card/Card';
import ProjectItem from './ProjectItem/ProjectItem';

import { fetchUserProjects } from '../../state/User/projects';

import './ProjectsView.scss';

class ProjectsView extends React.Component {
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
    const { projects } = this.props;

    const { projectsArray } = projects;

    const itemsRender = projectsArray.map( project => {
      console.log( project );
      return <ProjectItem name={ project.name } />;
    } );

    console.log( projects );
    return (
      <Card className="projects-view">
        { itemsRender }
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
