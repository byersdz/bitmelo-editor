
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Modal from 'Components/Modal/Modal';
import Button from 'Components/Button/Button';

import { resetProject, clearAllUndoHistory } from 'State/globalActions';

import './StartNewProjectModal.scss';

class StartNewProjectModal extends React.Component {
  handleClose() {
    const { onClose } = this.props;
    onClose();
  }

  handleStartClicked() {
    const { _resetProject, _clearAllUndoHistory } = this.props;
    _resetProject();
    _clearAllUndoHistory();

    this.handleClose();
  }

  render() {
    return (
      <Modal
        className="start-project-modal"
        showHeader
        title="Start a new project"
        onClose={ () => this.handleClose() }
      >
        <div className="warning">
          WARNING! This will permanantly delete your existing data!
        </div>
        <div className="modal-controls">
          <Button
            title="Start New Project"
            standard
            click={ () => this.handleStartClicked() }
          />
        </div>
        <div className="exit-buttons">
          <Button
            title="Cancel"
            standard
            click={ () => this.handleClose() }
          />
        </div>
      </Modal>
    );
  }
}

StartNewProjectModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  _resetProject: PropTypes.func.isRequired,
  _clearAllUndoHistory: PropTypes.func.isRequired,
};

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _resetProject: resetProject,
    _clearAllUndoHistory: clearAllUndoHistory,
  }, dispatch );
}

export default connect( null, mapDispatchToProps )( StartNewProjectModal );
