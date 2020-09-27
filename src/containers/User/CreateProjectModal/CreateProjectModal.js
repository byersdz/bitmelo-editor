
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AccountModal from '../../../components/Account/AccountModal/AccountModal';
import Button from '../../../components/Button/Button';
import AccountTextInput from '../../../components/Account/AccountTextInput/AccountTextInput';
import AccountErrorMessage from '../../../components/Account/AccountErrorMessage/AccountErrorMessage';

import { createNewProject, createLoadedProjectCopy } from '../../../state/User/projects';

import './CreateProjectModal.scss';

class CreateProjectModal extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      projectName: 'My Project',
      createSuccessful: false,
    };
  }

  componentDidUpdate( prevProps ) {
    const { isCreating: prevCreating } = prevProps;
    const {
      isCreating,
      errors,
      onProjectCreateSuccess,
      currentProjectId,
    } = this.props;

    if ( !isCreating && prevCreating ) {
      if ( !errors || errors.length === 0 ) {
        onProjectCreateSuccess( currentProjectId );
        this.setState( { createSuccessful: true } );
      }
    }
  }

  handleResetClick() {
    const { _createNewProject } = this.props;
    const { projectName } = this.state;

    _createNewProject( projectName );
  }

  async handleCopyClick() {
    const { _createLoadedProjectCopy } = this.props;
    const { projectName } = this.state;

    _createLoadedProjectCopy( projectName );
  }

  render() {
    const {
      onClose,
      allowCopy,
      errors,
      isCreating,
    } = this.props;
    const {
      projectName,
      createSuccessful,
    } = this.state;

    const buttonsDisabled = isCreating;

    const errorsRender = errors.map( error => {
      return (
        <AccountErrorMessage key={ error.msg }>
          { error.msg }
        </AccountErrorMessage>
      );
    } );

    const createBlankButton = allowCopy ? (
      <Button
        title="Create Empty Project"
        click={ () => this.handleResetClick() }
        account
        disabled={ buttonsDisabled }
      />
    ) : (
      <Button
        title="Create Project"
        click={ () => this.handleResetClick() }
        account
        disabled={ buttonsDisabled }
      />
    );

    const createCopyButton = allowCopy ? (
      <Button
        title="Copy Current Project"
        click={ () => this.handleCopyClick() }
        account
        disabled={ buttonsDisabled }
      />
    ) : null;

    const mainRender = createSuccessful ? (
      <div>
        Project successfully created!
      </div>
    ) : (
      <>
        { errorsRender }
        <AccountTextInput
          title="Project Name"
          value={ projectName }
          onValueChange={ v => this.setState( { projectName: v } ) }
        />
        { createBlankButton }
        { createCopyButton }
      </>
    );

    return (
      <AccountModal
        className="create-project-modal"
        title="Create New Project"
        onClose={ onClose }
        showHeader
        disableExit={ isCreating }
      >
        { mainRender }
      </AccountModal>
    );
  }
}

CreateProjectModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onProjectCreateSuccess: PropTypes.func,
  allowCopy: PropTypes.bool,
  _createNewProject: PropTypes.func.isRequired,
  _createLoadedProjectCopy: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
  currentProjectId: PropTypes.string.isRequired,
};

CreateProjectModal.defaultProps = {
  onProjectCreateSuccess: () => {},
  allowCopy: false,
};

function mapStateToProps( state ) {
  return {
    isCreating: state.user.projects.isCreating,
    errors: state.user.projects.creatingErrors,
    currentProjectId: state.user.currentProject.id,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _createNewProject: createNewProject,
    _createLoadedProjectCopy: createLoadedProjectCopy,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( CreateProjectModal );
