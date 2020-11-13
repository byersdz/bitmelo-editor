
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

import './DropDownMenu.scss';

class DropDownMenu extends React.Component {
  constructor( props ) {
    super( props );

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind( this );
  }

  componentDidMount() {
    document.addEventListener( 'mousedown', this.handleClickOutside );
  }

  componentWillUnmount() {
    document.removeEventListener( 'mousedown', this.handleClickOutside );
  }

  handleClickOutside( event ) {
    const { onClose, closeOnClickOutside, ignoreClickOutsideId } = this.props;
    if ( closeOnClickOutside && this.wrapperRef && !this.wrapperRef.current.contains( event.target ) ) {
      if ( ignoreClickOutsideId ) {
        const currentNode = event.target;
        let shouldIgnoreClickOutside = false;

        const nodeContainsId = node => {
          if ( node.id === ignoreClickOutsideId ) {
            return true;
          }

          if ( !node.parentNode ) {
            return false;
          }

          return nodeContainsId( node.parentNode );
        };

        shouldIgnoreClickOutside = nodeContainsId( currentNode );

        if ( !shouldIgnoreClickOutside ) {
          onClose();
        }
      }
      else {
        onClose();
      }
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
      <div className="drop-down-menu" ref={ this.wrapperRef }>
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
  ignoreClickOutsideId: PropTypes.string,
};

DropDownMenu.defaultProps = {
  closeOnClickOutside: false,
  ignoreClickOutsideId: '',
};

export default DropDownMenu;
