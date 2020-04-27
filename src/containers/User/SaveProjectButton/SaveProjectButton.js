import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '../../../components/Button/Button';

import { saveCurrentProject } from '../../../state/User/projects';

import './SaveProjectButton.scss';

class SaveProjectButton extends React.Component {
  render() {
    const { _saveCurrentProject } = this.props;

    return (
      <Button
        className="save-btn"
        standard
        click={ () => _saveCurrentProject() }
      >
        Save
      </Button>
    );
  }
}

SaveProjectButton.propTypes = {
  _saveCurrentProject: PropTypes.func.isRequired,
};

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _saveCurrentProject: saveCurrentProject,
  }, dispatch );
}

export default connect( null, mapDispatchToProps )( SaveProjectButton );
