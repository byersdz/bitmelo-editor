
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/Button/Button';
import DropDownMenu from '../../../components/DropDownMenu/DropDownMenu';

import enhanceWithClickOutside from 'react-click-outside';

import './ActionsButton.scss';

class ActionsButton extends React.Component {
  handleClickOutside() {
    const { dropDownIsOpen, onDropDownChange } = this.props;
    if ( dropDownIsOpen ) {
      onDropDownChange( false );
    }
  }

  closeDropdown() {
    const { onDropDownChange } = this.props;
    onDropDownChange( false );
  }

  render() {
    const {
      items,
      id,
      onSelect,
      dropDownIsOpen,
      onDropDownChange,
    } = this.props;

    const dropDownRender = dropDownIsOpen ? (
      <DropDownMenu
        items={ items }
        onClose={ () => onDropDownChange( false ) }
        onSelect={ onSelect }
      />
    ) : null;

    return (
      <div className="actions-button-container" id={ id }>
        <Button
          title="Actions"
          icon="play"
          click={ () => onDropDownChange( !dropDownIsOpen ) }
          hideTitle
          className="actions-btn"
          id="actions-btn"
        />
        { dropDownRender }
      </div>
    );
  }
}

ActionsButton.propTypes = {
  items: PropTypes.arrayOf( PropTypes.object ).isRequired,
  id: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  dropDownIsOpen: PropTypes.bool.isRequired,
  onDropDownChange: PropTypes.func.isRequired,
};

export default enhanceWithClickOutside( ActionsButton );
