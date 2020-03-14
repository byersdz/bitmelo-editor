
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash.get';

import AccountModal from '../../../components/Account/AccountModal/AccountModal';
import Button from '../../../components/Button/Button';
import AccountTextInput from '../../../components/Account/AccountTextInput/AccountTextInput';

import createTransferProject from '../../../utils/Convert/createTransferProject';

import { setCurrentUserProject } from '../../../state/User/currentProject';
import { setProjectName } from '../../../state/Project/name';
import { resetProject } from '../../../state/globalActions';

import { createProject } from '../../../api/project';

import './CreateProjectModal.scss';

class CreateProjectModal extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      projectName: 'My Project',
      isCreating: false,
      createSuccessful: false,
    };
  }

  componentDidUpdate( prevProps ) {
    const { requiresCreation: prevRequiresCreation } = prevProps;
    const { requiresCreation, projectState } = this.props;

    if ( requiresCreation && !prevRequiresCreation ) {
      this.setState( { isCreating: true } );
      const projectData = createTransferProject( projectState );
      this.createCloudProject( projectData );
    }
  }

  async createCloudProject( projectData ) {
    const { _setProjectName, _setCurrentUserProject } = this.props;
    const { projectName } = this.state;

    this.setState( { isCreating: true } );
    const response = await createProject( projectData );
    this.setState( { isCreating: false } );

    if ( !response.isError ) {
      const id = get( response, 'data.id', '' );
      if ( id ) {
        _setProjectName( projectName );
        _setCurrentUserProject( id, false );
        this.setState( { createSuccessful: true } );
      }
      else {
        // make error later
        console.log( 'no id' );
      }
    }
    else {
      console.log( response.errors );
    }
  }

  handleResetClick() {
    const { _resetProject, _setProjectName, _setCurrentUserProject } = this.props;
    const { projectName } = this.state;

    _resetProject();
    _setProjectName( projectName );
    _setCurrentUserProject( '', true );
  }

  async handleCopyClick() {
    const { projectState } = this.props;
    const { projectName } = this.state;

    const transferProject = createTransferProject( projectState );
    transferProject.project.name = projectName;

    await this.createCloudProject( transferProject );
  }

  render() {
    const { onClose } = this.props;
    const { projectName, isCreating, createSuccessful } = this.state;

    const buttonsDisabled = isCreating;

    const mainRender = createSuccessful ? (
      <div>
        Project successfully created!
      </div>
    ) : (
      <>
        <AccountTextInput
          title="Project Name"
          value={ projectName }
          onValueChange={ v => this.setState( { projectName: v } ) }
        />
        <Button
          title="Create with Blank Data"
          click={ () => this.handleResetClick() }
          account
          disabled={ buttonsDisabled }
        />
        <Button
          title="Copy current project"
          click={ () => this.handleCopyClick() }
          account
          disabled={ buttonsDisabled }
        />
      </>
    );

    return (
      <AccountModal
        className="create-project-modal"
        title="Create New Project"
        onClose={ onClose }
        showHeader
      >
        { mainRender }
      </AccountModal>
    );
  }
}

CreateProjectModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  projectState: PropTypes.object.isRequired,
  _setCurrentUserProject: PropTypes.func.isRequired,
  _setProjectName: PropTypes.func.isRequired,
  _resetProject: PropTypes.func.isRequired,
  requiresCreation: PropTypes.bool.isRequired,
};

function mapStateToProps( state ) {
  return {
    projectState: state,
    requiresCreation: state.user.currentProject.requiresCreation,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setCurrentUserProject: setCurrentUserProject,
    _setProjectName: setProjectName,
    _resetProject: resetProject,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( CreateProjectModal );
