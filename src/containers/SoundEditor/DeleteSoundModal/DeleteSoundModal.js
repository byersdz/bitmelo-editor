
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Modal from '../../../components/Modal/Modal';
import Button from '../../../components/Button/Button';

import { deleteSound } from '../../../state/Sound/sounds';
import { selectSound } from '../../../state/Sound/activeSound';

import './DeleteSoundModal.scss';

class DeleteSoundModal extends React.Component {
  handleClose() {
    const { onClose } = this.props;

    onClose();
  }

  handleDeleteClick() {
    const {
      _deleteSound,
      _selectSound,
      activeSound,
    } = this.props;

    _deleteSound( activeSound );
    if ( activeSound > 0 ) {
      _selectSound( activeSound - 1 );
    }

    this.handleClose();
  }


  render() {
    return (
      <Modal
        onClose={ () => this.handleClose() }
        title="Delete Sound"
        showHeader
      >
        <div className="warning">
          Are you sure you want to delete this sound? Deleting a sound can not be undone.
        </div>
        <div className="modal-controls">
          <Button
            title="Delete Sound"
            click={ () => this.handleDeleteClick() }
            standard
          />
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

DeleteSoundModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  activeSound: PropTypes.number.isRequired,
  _deleteSound: PropTypes.func.isRequired,
  _selectSound: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    activeSound: state.sound.activeSound,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _deleteSound: deleteSound,
    _selectSound: selectSound,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( DeleteSoundModal );
