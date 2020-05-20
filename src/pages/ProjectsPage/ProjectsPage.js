
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProjectsView from '../../containers/ProjectsView/ProjectsView';
import BitmeloLogo from '../../containers/About/bitmelo-logo.png';

import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';

import { selectActivePage, EDITOR_PAGE } from '../../state/Layout/activePage';

import './ProjectsPage.scss';

class ProjectsPage extends React.Component {
  render() {
    const { _selectActivePage, localProjectName } = this.props;

    return (
      <div id="projects-page">
        <img
          className="bitmelo-logo"
          src={ BitmeloLogo }
          alt="Bitmelo Logo"
        />
        <ProjectsView />
        <Card
          className="current-project"
          title="Loaded Project:"
        >
          <div className="project-name">
            { localProjectName }
          </div>
          <Button
            title="Open Loaded Project"
            standard
            click={ () => _selectActivePage( EDITOR_PAGE ) }
          />
        </Card>
      </div>
    );
  }
}

ProjectsPage.propTypes = {
  _selectActivePage: PropTypes.func.isRequired,
  localProjectName: PropTypes.string.isRequired,
};

function mapStateToProps( state ) {
  return {
    localProjectName: state.project.name,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _selectActivePage: selectActivePage,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ProjectsPage );
