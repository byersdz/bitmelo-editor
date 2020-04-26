
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Modal from '../../../components/Modal/Modal';
import Button from '../../../components/Button/Button';

import { resetProject, clearAllUndoHistory, importProjectData } from '../../../state/globalActions';

import WelcomeDemo from '../../../utils/Demos/WelcomeDemo.json';

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

  handleWelcomeStartClicked() {
    const { _resetProject, _clearAllUndoHistory, _importProjectData } = this.props;
    _resetProject();
    _clearAllUndoHistory();
    _importProjectData( WelcomeDemo );

    this.handleClose();
  }

  render() {
    return (
      <Modal
        className="start-project-modal"
        showHeader
        title="Reset Project Data"
        onClose={ () => this.handleClose() }
      >
        <div className="warning">
          WARNING! This will permanantly delete your existing data!
        </div>
        <div className="modal-controls">
          <Button
            title="Start Blank Project"
            standard
            click={ () => this.handleStartClicked() }
          />
          <Button
            title="Start Project from Welcome Demo"
            standard
            click={ () => this.handleWelcomeStartClicked() }
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
  _importProjectData: PropTypes.func.isRequired,
};

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _resetProject: resetProject,
    _clearAllUndoHistory: clearAllUndoHistory,
    _importProjectData: importProjectData,
  }, dispatch );
}

export default connect( null, mapDispatchToProps )( StartNewProjectModal );
