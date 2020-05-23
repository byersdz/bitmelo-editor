import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '../../../components/Button/Button';
import Icon from '../../../components/Icon/Icon';
import Spinner from '../../../components/Spinner/Spinner';

import { saveCurrentProject } from '../../../state/User/projects';

import './SaveProjectButton.scss';

class SaveProjectButton extends React.Component {
  render() {
    const { _saveCurrentProject, isSaving, showSuccess } = this.props;

    let icon = null;

    if ( isSaving ) {
      icon = <Spinner r="0" g="0" b="0" size="24px" />;
    }
    else if ( showSuccess ) {
      icon = <Icon file="check" />;
    }

    return (
      <Button
        className="save-btn"
        standard
        click={ () => _saveCurrentProject() }
        disabled={ isSaving }
      >
        <div className="save-icon">
          { icon }
        </div>
        Save
      </Button>
    );
  }
}

SaveProjectButton.propTypes = {
  _saveCurrentProject: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  showSuccess: PropTypes.bool.isRequired,
};

function mapStateToProps( state ) {
  return {
    isSaving: state.user.projects.isSaving,
    errors: state.user.projects.savingErrors,
    showSuccess: state.user.projects.showSaveSuccess,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _saveCurrentProject: saveCurrentProject,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( SaveProjectButton );
