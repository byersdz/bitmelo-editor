
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '../../components/Button/Button';

import { selectActivePage, EDITOR_PAGE } from '../../state/Layout/activePage';

import { getAllProjects } from '../../api/project';

import './ProjectsPage.scss';

class ProjectsPage extends React.Component {
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
    const { currentUser } = this.props;

    if ( !currentUser.isLoggedIn ) {
      return;
    }

    const response = await getAllProjects( currentUser.id );
    console.log( response );
  }

  render() {
    const { _selectActivePage } = this.props;

    return (
      <div id="projects-page">
        Projects Page
        <Button
          title="Go to editor"
          standard
          click={ () => _selectActivePage( EDITOR_PAGE ) }
        />
      </div>
    );
  }
}

ProjectsPage.propTypes = {
  currentUser: PropTypes.object.isRequired,
  _selectActivePage: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    currentUser: state.user.currentUser,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _selectActivePage: selectActivePage,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ProjectsPage );
