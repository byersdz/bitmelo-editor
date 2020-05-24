import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AccountModal from '../../../components/Account/AccountModal/AccountModal';
import AccountTextInput from '../../../components/Account/AccountTextInput/AccountTextInput';
import Button from '../../../components/Button/Button';

import { setProjectName } from '../../../state/Project/name';
import { publishCurrentProject } from '../../../state/User/currentProject';

import './PublishGameModal.scss';

class PublishGameModal extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      publishSuccessful: false,
    };
  }

  componentDidUpdate( prevProps ) {
    const { isPublishing: prevPublishing } = prevProps;
    const { isPublishing, errors } = this.props;

    if ( !isPublishing && prevPublishing ) {
      if ( !errors || errors.length === 0 ) {
        this.setState( { publishSuccessful: true } );
      }
    }
  }

  handlePublishClick() {
    const { _publishCurrentProject } = this.props;
    _publishCurrentProject();
  }

  render() {
    const {
      onClose,
      projectName,
      _setProjectName,
      isPublishing,
    } = this.props;

    const { publishSuccessful } = this.state;

    const mainRender = publishSuccessful ? (
      <div>
        Project successfully published!
      </div>
    ) : (
      <>
        <AccountTextInput
          title="Project Name"
          value={ projectName }
          onValueChange={ v => _setProjectName( v ) }
        />
        <Button
          title="Publish"
          click={ () => this.handlePublishClick() }
          account
          disabled={ isPublishing }
        />
      </>
    );

    return (
      <AccountModal
        title="Publish Your Game"
        className="publish-game-modal"
        onClose={ onClose }
      >
        { mainRender }
      </AccountModal>
    );
  }
}

PublishGameModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  projectName: PropTypes.string.isRequired,
  _setProjectName: PropTypes.func.isRequired,
  _publishCurrentProject: PropTypes.func.isRequired,
  isPublishing: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
};

function mapStateToProps( state ) {
  return {
    projectName: state.project.name,
    isPublishing: state.user.currentProject.isPublishing,
    errors: state.user.currentProject.publishingErrors,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setProjectName: setProjectName,
    _publishCurrentProject: publishCurrentProject,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( PublishGameModal );
