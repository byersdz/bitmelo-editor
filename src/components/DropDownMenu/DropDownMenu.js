
import React from 'react';
import PropTypes from 'prop-types';
import enhanceWithClickOutside from 'react-click-outside';

import Button from '../Button/Button';

import './DropDownMenu.scss';

class DropDownMenu extends React.Component {
  handleClickOutside() {
    const { onClose, closeOnClickOutside } = this.props;
    if ( closeOnClickOutside ) {
      onClose();
    }
  }

  render() {
    const { items, onSelect } = this.props;

    const itemsRender = items.map( item => {
      return (
        <Button
          className="drop-down-item"
          key={ item.key }
          click={ () => onSelect( item.key ) }
        >
          { item.display }
        </Button>
      );
    } );

    return (
      <div className="drop-down-menu">
        { itemsRender }
      </div>
    );
  }
}

const itemShape = {
  key: PropTypes.string.isRequired,
  display: PropTypes.node.isRequired,
};

DropDownMenu.propTypes = {
  items: PropTypes.arrayOf( PropTypes.shape( itemShape ) ).isRequired,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  closeOnClickOutside: PropTypes.bool,
};

DropDownMenu.defaultProps = {
  closeOnClickOutside: false,
};

export default enhanceWithClickOutside( DropDownMenu );
