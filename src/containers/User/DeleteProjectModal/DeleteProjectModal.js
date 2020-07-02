
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AccountModal from '../../../components/Account/AccountModal/AccountModal';
import Button from '../../../components/Button/Button';
import AccountErrorMessage from '../../../components/Account/AccountErrorMessage/AccountErrorMessage';

import { deleteUserProject, setUserProjectsDeletingErrors } from '../../../state/User/projects';

import './DeleteProjectModal.scss';

class DeleteProjectModal extends React.Component {
  componentDidMount() {
    const { _setUserProjectsDeletingErrors } = this.props;
    _setUserProjectsDeletingErrors( [] );
  }

  componentDidUpdate( prevProps ) {
    const { isDeleting: prevDeleting } = prevProps;
    const { isDeleting, onClose, errors } = this.props;

    if ( !isDeleting && prevDeleting && errors.length === 0 ) {
      onClose();
    }
  }

  handleDelete() {
    const { _deleteUserProject, project } = this.props;
    _deleteUserProject( project.id );
  }

  render() {
    const {
      onClose,
      project,
      isDeleting,
      errors,
    } = this.props;

    const mainRender = isDeleting ? (
      <div>
        deleting
      </div>
    ) : (
      <div>
        Are you sure you want to delete this project?:
        <br />
        { project.name }
      </div>
    );

    const errorsRender = errors.map( error => {
      return (
        <AccountErrorMessage key={ error.msg }>
          { error.msg }
        </AccountErrorMessage>
      );
    } );

    return (
      <AccountModal
        className="delete-project-modal"
        title="Delete Project"
        onClose={ () => {
          if ( !isDeleting ) {
            onClose();
          }
        } }
        showHeader
        disableExit={ isDeleting }
      >
        { errorsRender }
        { mainRender }
        <Button
          title="Delete"
          click={ () => this.handleDelete() }
          account
          disabled={ isDeleting }
        />
        <Button
          title="Cancel"
          click={ onClose }
          account
          disabled={ isDeleting }
        />
      </AccountModal>
    );
  }
}

DeleteProjectModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  project: PropTypes.shape( {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  } ).isRequired,
  isDeleting: PropTypes.bool.isRequired,
  _deleteUserProject: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  _setUserProjectsDeletingErrors: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    isDeleting: state.user.projects.isDeleting,
    errors: state.user.projects.deletingErrors,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _deleteUserProject: deleteUserProject,
    _setUserProjectsDeletingErrors: setUserProjectsDeletingErrors,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( DeleteProjectModal );
