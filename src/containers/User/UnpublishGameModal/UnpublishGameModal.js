import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AccountModal from '../../../components/Account/AccountModal/AccountModal';
import Button from '../../../components/Button/Button';
import { unpublishCurrentProject } from '../../../state/User/currentProject';
import AccountErrorMessage from '../../../components/Account/AccountErrorMessage/AccountErrorMessage';

import './UnpublishGameModal.scss';

class UnpublishGameModal extends React.Component {
  componentDidUpdate( prevProps ) {
    const { isUnpublishing: prevUnpublishing } = prevProps;
    const { isUnpublishing, errors, onClose } = this.props;

    if ( !isUnpublishing && prevUnpublishing ) {
      if ( !errors || errors.length === 0 ) {
        onClose();
      }
    }
  }

  handleConfirmClick() {
    const { isUnpublishing, _unpublishCurrentProject } = this.props;

    if ( !isUnpublishing ) {
      _unpublishCurrentProject();
    }
  }

  render() {
    const { onClose, errors, isUnpublishing } = this.props;

    const errorsRender = errors.map( error => {
      return (
        <AccountErrorMessage key={ error.msg }>
          { error.msg }
        </AccountErrorMessage>
      );
    } );

    return (
      <AccountModal
        title="Unpublish Game"
        className="unpublish-game-modal"
        onClose={ onClose }
        disableExit={ isUnpublishing }
      >
        { errorsRender }
        Are you sure you want to unpublish this game?
        <Button
          title="Unpublish"
          click={ () => this.handleConfirmClick() }
          account
          disabled={ isUnpublishing }
        />
        <Button
          title="Cancel"
          click={ () => onClose() }
          account
          disabled={ isUnpublishing }
        />
      </AccountModal>
    );
  }
}

UnpublishGameModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isUnpublishing: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
  _unpublishCurrentProject: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    isUnpublishing: state.user.currentProject.isUnpublishing,
    errors: state.user.currentProject.unpublishingErrors,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _unpublishCurrentProject: unpublishCurrentProject,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( UnpublishGameModal );
