import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AccountModal from '../../../components/Account/AccountModal/AccountModal';
import AccountTextInput from '../../../components/Account/AccountTextInput/AccountTextInput';
import Button from '../../../components/Button/Button';

import { setProjectName } from '../../../state/Project/name';

import './PublishGameModal.scss';

class PublishGameModal extends React.Component {
  render() {
    const { onClose, projectName, _setProjectName } = this.props;

    return (
      <AccountModal
        title="Publish Your Game"
        className="publish-game-modal"
        onClose={ onClose }
      >
        <AccountTextInput
          title="Project Name"
          value={ projectName }
          onValueChange={ v => _setProjectName( v ) }
        />
        <Button
          title="Publish"
          click={ () => console.log( 'publish' ) }
          account
        />
      </AccountModal>
    );
  }
}

PublishGameModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  projectName: PropTypes.string.isRequired,
  _setProjectName: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    projectName: state.project.name,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setProjectName: setProjectName,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( PublishGameModal );
