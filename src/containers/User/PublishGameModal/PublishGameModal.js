import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AccountModal from '../../../components/Account/AccountModal/AccountModal';
import AccountTextInput from '../../../components/Account/AccountTextInput/AccountTextInput';
import Button from '../../../components/Button/Button';
import AccountErrorMessage from '../../../components/Account/AccountErrorMessage/AccountErrorMessage';
import AccountSelect from '../../../components/Account/AccountSelect/AccountSelect';
import AccountCheckbox from '../../../components/Account/AccountCheckbox/AccountCheckbox';
import AButton from '../../../components/AButton/AButton';

import { setProjectName } from '../../../state/Project/name';
import { publishCurrentProject, setPublishingErrors } from '../../../state/User/currentProject';

import './PublishGameModal.scss';

const codeLicenseOptions = [
  {
    display: 'MIT',
    value: 'mit',
  },
  {
    display: 'Private',
    value: 'private',
  },
];

const assetLicenseOptions = [
  {
    display: 'Creative Commons Attribution',
    value: 'cc-by-4',
  },
  {
    display: 'Creative Commons Attribution NonCommercial',
    value: 'cc-by-nc-4',
  },
  {
    display: 'Creative Commons Zero',
    value: 'cc0',
  },
  {
    display: 'Private',
    value: 'private',
  },
];

class PublishGameModal extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      publishSuccessful: false,
      codeLicense: 'mit',
      assetLicense: 'cc-by-4',
      licenseAgree: false,
    };
  }

  componentDidMount() {
    const { _setPublishingErrors } = this.props;
    _setPublishingErrors( [] );
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
    const { codeLicense, assetLicense, licenseAgree } = this.state;

    _publishCurrentProject( codeLicense, assetLicense, licenseAgree );
  }

  render() {
    const {
      onClose,
      projectName,
      _setProjectName,
      isPublishing,
      errors,
    } = this.props;

    const {
      publishSuccessful,
      codeLicense,
      assetLicense,
      licenseAgree,
    } = this.state;

    const errorsRender = errors.map( error => {
      return (
        <AccountErrorMessage key={ error.msg }>
          { error.msg }
        </AccountErrorMessage>
      );
    } );

    let codeAgreementMessage = (
      <>
        I wish for the code in my project to remain private.
      </>
    );

    if ( codeLicense === 'mit' ) {
      codeAgreementMessage = (
        <>
          { 'I agree to license the code in my project under the ' }
          <AButton
            href="https://opensource.org/licenses/MIT"
          >
            MIT license
          </AButton>
          { '.' }
        </>
      );
    }

    let assetAgreementMessage = (
      <>
        I wish for all other assets in my project to remain private.
      </>
    );

    if ( assetLicense === 'cc-by-4' ) {
      assetAgreementMessage = (
        <>
          {
            `I agree to license all other assets in my project, including art and audio,
            under the `
          }
          <AButton
            href="https://creativecommons.org/licenses/by/4.0/"
          >
            Creative Commons Attribution 4.0 license
          </AButton>
          { '.' }
        </>
      );
    }
    else if ( assetLicense === 'cc-by-nc-4' ) {
      assetAgreementMessage = (
        <>
          {
            `I agree to license all other assets in my project, including art and audio,
            under the `
          }
          <AButton
            href="https://creativecommons.org/licenses/by-nc/4.0/"
          >
            Creative Commons Attribution-NonCommercial 4.0 license
          </AButton>
          { '.' }
        </>
      );
    }
    else if ( assetLicense === 'cc0' ) {
      assetAgreementMessage = (
        <>
          {
            `I agree to license all other assets in my project, including art and audio,
            under the `
          }
          <AButton
            href="https://creativecommons.org/publicdomain/zero/1.0/"
          >
            Creative Commons Zero 1.0 license
          </AButton>
          { '.' }
        </>
      );
    }


    const mainRender = publishSuccessful ? (
      <div>
        Project successfully published!
      </div>
    ) : (
      <>
        { errorsRender }
        <AccountTextInput
          title="Project Name"
          value={ projectName }
          onValueChange={ v => _setProjectName( v ) }
        />
        <AccountSelect
          title="Code License"
          items={ codeLicenseOptions }
          value={ codeLicense }
          onValueChange={ v => this.setState( { codeLicense: v, licenseAgree: false } ) }
        />
        <AccountSelect
          title="Assets License"
          items={ assetLicenseOptions }
          value={ assetLicense }
          onValueChange={ v => this.setState( { assetLicense: v, licenseAgree: false } ) }
        />
        <AccountCheckbox
          checked={ licenseAgree }
          onChange={ v => this.setState( { licenseAgree: v } ) }
          id="license-agree"
        >
          { codeAgreementMessage }
          { ' ' }
          { assetAgreementMessage }
        </AccountCheckbox>

        <Button
          title="Publish"
          click={ () => this.handlePublishClick() }
          account
          disabled={ isPublishing || !licenseAgree }
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
  _setPublishingErrors: PropTypes.func.isRequired,
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
    _setPublishingErrors: setPublishingErrors,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( PublishGameModal );
