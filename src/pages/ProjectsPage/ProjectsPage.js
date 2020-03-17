
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '../../components/Button/Button';

import { selectActivePage, EDITOR_PAGE } from '../../state/Layout/activePage';

import './ProjectsPage.scss';

class ProjectsPage extends React.Component {
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
  _selectActivePage: PropTypes.func.isRequired,
};

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _selectActivePage: selectActivePage,
  }, dispatch );
}

export default connect( null, mapDispatchToProps )( ProjectsPage );
