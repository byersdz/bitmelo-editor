
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ToggleHeader from 'Components/ToggleHeader/ToggleHeader';

import { toggleTilemapSelector } from 'State/Layout/tilemapEditor';

import './TilemapSelector.scss';

class TilemapSelector extends React.Component {
  render() {
    const { isOpen, _toggleTilemapSelector } = this.props;
    const className = isOpen ? 'tilemap-selector open'
      : 'tilemap-selector closed';

    const contentClass = isOpen ? 'content' : 'content closed';

    return (
      <div className={ className }>
        <div className={ contentClass }>
          TilemapSelector
        </div>
        <ToggleHeader
          title="Tilemaps"
          onToggle={ () => _toggleTilemapSelector() }
        />
      </div>
    );
  }
}

TilemapSelector.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  _toggleTilemapSelector: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    isOpen: state.layout.tilemapEditor.tilemapSelectorIsOpen,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _toggleTilemapSelector: toggleTilemapSelector,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( TilemapSelector );
