
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/Button/Button';
import DropDownMenu from '../../../components/DropDownMenu/DropDownMenu';

import enhanceWithClickOutside from 'react-click-outside';

import './ActionsButton.scss';

class ActionsButton extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      dropDownIsOpen: false,
    };
  }

  handleClickOutside() {
    const { dropDownIsOpen } = this.state;
    if ( dropDownIsOpen ) {
      this.setState( { dropDownIsOpen: false } );
    }
  }

  render() {
    const { items, id } = this.props;
    const { dropDownIsOpen } = this.state;

    const dropDownRender = dropDownIsOpen ? (
      <DropDownMenu
        items={ items }
        onClose={ () => this.setState( { dropDownIsOpen: false } ) }
        onSelect={ k => console.log( k ) }
        closeOnClickOutside
        ignoreClickOutsideId={ id }
      />
    ) : null;

    return (
      <div className="actions-button-container" id={ id }>
        <Button
          title="Actions"
          icon="play"
          click={ () => this.setState( { dropDownIsOpen: !dropDownIsOpen } ) }
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
};

export default enhanceWithClickOutside( ActionsButton );
