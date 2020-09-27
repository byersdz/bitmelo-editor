
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import enhanceWithClickOutside from 'react-click-outside';

import Button from '../../../components/Button/Button';
import Icon from '../../../components/Icon/Icon';
import DropDownMenu from '../../../components/DropDownMenu/DropDownMenu';
import CreateProjectModal from '../CreateProjectModal/CreateProjectModal';
import MyAccountModal from '../MyAccountModal/MyAccountModal';

import { logoutUser } from '../../../state/User/currentUser';
import { selectActivePage, PROJECTS_PAGE } from '../../../state/Layout/activePage';

import './UserButton.scss';

class UserButton extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      dropDownIsOpen: false,
      createProjectModalIsOpen: false,
      myAccountModalIsOpen: false,
    };
  }

  handleClickOutside() {
    const { dropDownIsOpen } = this.state;
    if ( dropDownIsOpen ) {
      this.setState( { dropDownIsOpen: false } );
    }
  }

  handleMenuSelection( key ) {
    const { _logoutUser, _selectActivePage } = this.props;
    switch ( key ) {
      case 'logout':
        _logoutUser();
        break;
      case 'create-project':
        this.setState( { createProjectModalIsOpen: true, dropDownIsOpen: false } );
        break;
      case 'my-account':
        this.setState( { myAccountModalIsOpen: true, dropDownIsOpen: false } );
        break;
      case 'my-projects':
        _selectActivePage( PROJECTS_PAGE );
        break;
      default: break;
    }
  }

  render() {
    const { currentUser } = this.props;
    const { dropDownIsOpen, createProjectModalIsOpen, myAccountModalIsOpen } = this.state;

    const dropDownItems = [
      {
        key: 'create-project',
        display: 'Create New Project',
      },
      {
        key: 'my-projects',
        display: 'My Projects',
      },
      {
        key: 'my-account',
        display: 'My Account',
      },
      {
        key: 'logout',
        display: 'Log Out',
      },
    ];

    const dropDownRender = dropDownIsOpen ? (
      <DropDownMenu
        items={ dropDownItems }
        onClose={ () => this.setState( { dropDownIsOpen: false } ) }
        onSelect={ k => this.handleMenuSelection( k ) }
      />
    ) : null;

    const createProjectModalRender = createProjectModalIsOpen ? (
      <CreateProjectModal
        onClose={ () => this.setState( { createProjectModalIsOpen: false } ) }
        allowCopy
      />
    ) : null;

    const myAccountModalRender = myAccountModalIsOpen ? (
      <MyAccountModal
        onClose={ () => this.setState( { myAccountModalIsOpen: false } ) }
      />
    ) : null;

    const endIconClass = dropDownIsOpen ? 'end-icon open' : 'end-icon closed';

    return (
      <div className="user-button-container">
        <Button
          className="user-button"
          click={ () => this.setState( { dropDownIsOpen: !dropDownIsOpen } ) }
        >
          <div className="start-icon">
            <Icon file="user" />
          </div>
          { currentUser.displayName }
          <div className={ endIconClass }>
            <Icon file="up" />
          </div>
        </Button>
        { dropDownRender }
        { createProjectModalRender }
        { myAccountModalRender }
      </div>
    );
  }
}

UserButton.propTypes = {
  currentUser: PropTypes.object.isRequired,
  _logoutUser: PropTypes.func.isRequired,
  _selectActivePage: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    currentUser: state.user.currentUser,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _logoutUser: logoutUser,
    _selectActivePage: selectActivePage,
  }, dispatch );
}

// eslint-disable-next-line no-class-assign
UserButton = enhanceWithClickOutside( UserButton );

export default connect( mapStateToProps, mapDispatchToProps )( UserButton );
