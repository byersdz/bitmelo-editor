import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '../../../components/Button/Button';
import Icon from '../../../components/Icon/Icon';
import Spinner from '../../../components/Spinner/Spinner';

import { saveCurrentProject } from '../../../state/User/projects';

import { SAVE_PROJECT, eventMatchesHotkey } from '../../../utils/hotkeys';

import './SaveProjectButton.scss';

class SaveProjectButton extends React.Component {
  constructor( props ) {
    super( props );

    this.handleKeyDown = this.handleKeyDown.bind( this );
  }

  componentDidMount() {
    window.addEventListener( 'keydown', this.handleKeyDown );
  }

  componentWillUnmount() {
    window.removeEventListener( 'keydown', this.handleKeyDown );
  }

  handleKeyDown( event ) {
    const { _saveCurrentProject, isSaving } = this.props;
    if ( eventMatchesHotkey( event, SAVE_PROJECT ) ) {
      if ( !isSaving ) {
        _saveCurrentProject();
      }
      event.preventDefault();
    }
  }

  render() {
    const {
      _saveCurrentProject,
      isSaving,
      showSuccess,
      errors,
    } = this.props;

    let icon = <Icon file="cloud-save" />;

    if ( errors && errors.length > 0 ) {
      icon = <Icon file="x" />;
    }
    else if ( isSaving ) {
      icon = <Spinner r="0" g="0" b="0" size="24px" />;
    }
    else if ( showSuccess ) {
      icon = <Icon file="check" />;
    }

    return (
      <Button
        className="save-btn"
        standard
        click={ () => {
          if ( !isSaving ) {
            _saveCurrentProject();
          }
        } }
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
  errors: PropTypes.array.isRequired,
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
