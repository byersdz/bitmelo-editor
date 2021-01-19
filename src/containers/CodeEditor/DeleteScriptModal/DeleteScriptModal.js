
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Modal from '../../../components/Modal/Modal';
import Button from '../../../components/Button/Button';

import { deleteScript } from '../../../state/Code/scripts';
import { selectScript } from '../../../state/Code/activeIndex';

import './DeleteScriptModal.scss';

class DeleteScriptModal extends React.Component {
  handleClose() {
    const { onClose } = this.props;

    onClose();
  }

  handleDeleteClick() {
    const {
      onClose,
      _deleteScript,
      index,
      activeIndex,
      _selectScript,
    } = this.props;

    if ( activeIndex > 0 && activeIndex >= index ) {
      _selectScript( activeIndex - 1 );
    }

    _deleteScript( index );
    onClose();
  }

  render() {
    const { name, index } = this.props;

    return (
      <Modal
        onClose={ () => this.handleClose() }
        title="Delete Script"
        showHeader
      >
        <div className="warning">
          <p>Are you sure you want to delete this script?</p>
          <p>{ `${ index } - ${ name }` }</p>
          <p>Deleting a script can not be undone.</p>
        </div>
        <div className="exit-buttons">
          <Button
            title="Delete Script"
            click={ () => this.handleDeleteClick() }
            standard
          />
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

DeleteScriptModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired,
  // numberOfScripts: PropTypes.number.isRequired,
  _deleteScript: PropTypes.func.isRequired,
  _selectScript: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  const numberOfScripts = state.code.scripts.length;
  const { activeIndex } = state.code;
  return {
    numberOfScripts,
    activeIndex,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _deleteScript: deleteScript,
    _selectScript: selectScript,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( DeleteScriptModal );
