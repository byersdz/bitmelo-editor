
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AccountModal from '../../../components/Account/AccountModal/AccountModal';
import Button from '../../../components/Button/Button';

import { deleteUserProject } from '../../../state/User/projects';

import './DeleteProjectModal.scss';

class DeleteProjectModal extends React.Component {
  handleDelete() {
    const { _deleteUserProject, project } = this.props;
    _deleteUserProject( project.id );
    console.log( 'delete' );
  }

  render() {
    const { onClose, project } = this.props;

    return (
      <AccountModal
        className="delete-project-modal"
        title="Delete Project"
        onClose={ onClose }
        showHeader
      >
        Are you sure you want to delete this project?:
        <br />
        { project.name }
        <Button
          title="Delete"
          click={ () => this.handleDelete() }
          account
        />
        <Button
          title="Cancel"
          click={ onClose }
          account
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
  _deleteUserProject: PropTypes.func.isRequired,
};

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _deleteUserProject: deleteUserProject,
  }, dispatch );
}

export default connect( null, mapDispatchToProps )( DeleteProjectModal );
