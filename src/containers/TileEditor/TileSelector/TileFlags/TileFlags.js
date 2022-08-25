
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import forEach from 'lodash/forEach';

import FlagCheckbox from '../../../../components/FlagCheckbox/FlagCheckbox';

import { getSelectedFlags, getSelectedLocalIds } from '../../../../utils/tilesetHelpers';

import { setTilesetFlag } from '../../../../state/Tileset/tilesets';
import './TileFlags.scss';


class TileFlags extends React.Component {
  setFlag( flag, checkValue, indeterminateValue ) {
    const { activeIndex, selectedIds, _setTilesetFlag } = this.props;

    let shouldRemove = !checkValue;

    if ( indeterminateValue ) {
      shouldRemove = false;
    }

    _setTilesetFlag( flag, shouldRemove, activeIndex, selectedIds );
  }

  render() {
    const { checkedValues, indeterminateValues } = this.props;

    return (
      <div className="tile-flags">
        <FlagCheckbox
          id="flag-check-0"
          checked={ checkedValues[0] }
          indeterminate={ indeterminateValues[0] }
          onChange={ v => this.setFlag( 1, v, indeterminateValues[0] ) }
          color="white"
        />
        <FlagCheckbox
          id="flag-check-1"
          checked={ checkedValues[1] }
          indeterminate={ indeterminateValues[1] }
          onChange={ v => this.setFlag( 2, v, indeterminateValues[1] ) }
          color="red"
        />
        <FlagCheckbox
          id="flag-check-2"
          checked={ checkedValues[2] }
          indeterminate={ indeterminateValues[2] }
          onChange={ v => this.setFlag( 4, v, indeterminateValues[2] ) }
          color="orange"
        />
        <FlagCheckbox
          id="flag-check-3"
          checked={ checkedValues[3] }
          indeterminate={ indeterminateValues[3] }
          onChange={ v => this.setFlag( 8, v, indeterminateValues[3] ) }
          color="yellow"
        />
        <FlagCheckbox
          id="flag-check-4"
          checked={ checkedValues[4] }
          indeterminate={ indeterminateValues[4] }
          onChange={ v => this.setFlag( 16, v, indeterminateValues[4] ) }
          color="green"
        />
        <FlagCheckbox
          id="flag-check-5"
          checked={ checkedValues[5] }
          indeterminate={ indeterminateValues[5] }
          onChange={ v => this.setFlag( 32, v, indeterminateValues[5] ) }
          color="blue"
        />
        <FlagCheckbox
          id="flag-check-6"
          checked={ checkedValues[6] }
          indeterminate={ indeterminateValues[6] }
          onChange={ v => this.setFlag( 64, v, indeterminateValues[6] ) }
          color="purple"
        />
        <FlagCheckbox
          id="flag-check-7"
          checked={ checkedValues[7] }
          indeterminate={ indeterminateValues[7] }
          onChange={ v => this.setFlag( 128, v, indeterminateValues[7] ) }
          color="pink"
        />
      </div>
    );
  }
}

TileFlags.propTypes = {
  checkedValues: PropTypes.arrayOf( PropTypes.bool ).isRequired,
  indeterminateValues: PropTypes.arrayOf( PropTypes.bool ).isRequired,
  activeIndex: PropTypes.number.isRequired,
  selectedIds: PropTypes.arrayOf( PropTypes.number ).isRequired,
  _setTilesetFlag: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  const { activeIndex } = state.tileset.present;
  const currentTileset = state.tileset.present.tilesets[activeIndex];

  const flags = getSelectedFlags( currentTileset );
  const selectedIds = getSelectedLocalIds( currentTileset );
  const flagCount = flags.length;
  const trueCounts = new Array( 8 );
  const falseCounts = new Array( 8 );
  trueCounts.fill( 0 );
  falseCounts.fill( 0 );

  forEach( flags, flag => {
    let flagValue = 1;
    for ( let i = 0; i < 8; i += 1 ) {
      if ( flag & flagValue ) {
        trueCounts[i] += 1;
      }
      else {
        falseCounts[i] += 1;
      }

      flagValue = flagValue * 2;
    }
  } );

  const checkedValues = new Array( 8 );
  const indeterminateValues = new Array( 8 );

  for ( let i = 0; i < 8; i += 1 ) {
    checkedValues[i] = false;
    indeterminateValues[i] = false;

    if ( trueCounts[i] === flagCount ) {
      checkedValues[i] = true;
    }
    else if ( trueCounts[i] > 0 ) {
      checkedValues[i] = true;
      indeterminateValues[i] = true;
    }
  }

  return {
    checkedValues,
    indeterminateValues,
    activeIndex,
    selectedIds,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setTilesetFlag: setTilesetFlag,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( TileFlags );
