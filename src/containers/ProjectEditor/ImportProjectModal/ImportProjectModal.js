
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Modal from '../../../components/Modal/Modal';
import Button from '../../../components/Button/Button';

import { importProjectData, resetProject, clearAllUndoHistory } from '../../../state/globalActions';

import './ImportProjectModal.scss';

class ImportProjectModal extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      file: null,
      errorText: '',
    };
  }

  handleFileChange( event ) {
    this.setState( { errorText: '' } );
    const file = event.target.files[0];
    if ( file ) {
      this.setState( { file } );
    }
    else {
      this.setState( { file: null } );
    }
  }

  handleImport() {
    const { _resetProject, _importProjectData, _clearAllUndoHistory } = this.props;
    const { file } = this.state;
    if ( file ) {
      const reader = new FileReader();
      let contents = '';

      reader.onload = event => {
        contents = event.target.result;
        let contentsObject = null;
        try {
          contentsObject = JSON.parse( contents );
          _resetProject();
          _importProjectData( contentsObject );
          _clearAllUndoHistory();
          this.handleClose();
        }
        catch ( error ) {
          this.setState( { errorText: 'File is not valid JSON!' } );
        }
      };

      try {
        reader.readAsText( file );
      }
      catch ( e ) {
        this.setState( { errorText: 'Error reading file!' } );
      }
    }
  }

  handleClose() {
    const { onClose } = this.props;
    onClose();
  }

  render() {
    const { file, errorText } = this.state;

    const importButtonRender = file ? (
      <Button
        title="Import"
        click={ () => this.handleImport() }
        standard
      />
    ) : null;

    return (
      <Modal
        className="import-project-modal"
        showHeader
        title="Import Project"
        onClose={ () => this.handleClose() }
      >
        <div className="warning">
          WARNING! This will permanantly delete your existing data!
          <br />
          { errorText }
        </div>
        <div className="modal-controls">
          <input
            type="file"
            onChange={ e => this.handleFileChange( e ) }
          />
          { importButtonRender }
        </div>
        <div className="exit-buttons">
          <Button
            title="Cancel"
            click={ () => this.handleClose() }
            standard
          />
        </div>
      </Modal>
    );
  }
}

ImportProjectModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  _resetProject: PropTypes.func.isRequired,
  _importProjectData: PropTypes.func.isRequired,
  _clearAllUndoHistory: PropTypes.func.isRequired,
};

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _resetProject: resetProject,
    _importProjectData: importProjectData,
    _clearAllUndoHistory: clearAllUndoHistory,
  }, dispatch );
}

export default connect( null, mapDispatchToProps )( ImportProjectModal );
