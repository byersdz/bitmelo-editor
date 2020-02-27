
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '../../../components/Modal/Modal';
import Button from '../../../components/Button/Button';
import TextInput from '../../../components/TextInput/TextInput';

import createTransferProject from '../../../utils/Convert/createTransferProject';

import { createProject } from '../../../api/project';

import './CreateProjectModal.scss';

class CreateProjectModal extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      projectName: 'My Project',
    };
  }

  handleResetClick() {
    console.log( 'reset' );
  }

  async handleCopyClick() {
    const { projectState } = this.props;

    const transferProject = createTransferProject( projectState );

    const response = await createProject( transferProject );

    console.log( response );
  }

  render() {
    const { onClose } = this.props;
    const { projectName } = this.state;

    return (
      <Modal
        className="create-project-modal"
        title="Create New Project"
        onClose={ onClose }
        showHeader
      >
        <TextInput
          title="Project Name"
          value={ projectName }
          onValueChange={ v => this.setState( { projectName: v } ) }
        />
        <Button
          title="Create with Blank Data"
          click={ () => this.handleResetClick() }
          standard
        />
        <Button
          title="Copy current project"
          click={ () => this.handleCopyClick() }
          standard
        />
      </Modal>
    );
  }
}

CreateProjectModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  projectState: PropTypes.object.isRequired,
};

function mapStateToProps( state ) {
  return {
    projectState: state,
  };
}

export default connect( mapStateToProps )( CreateProjectModal );
