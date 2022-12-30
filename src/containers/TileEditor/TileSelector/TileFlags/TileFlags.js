
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import forEach from 'lodash/forEach';

import FlagCheckbox from '../../../../components/FlagCheckbox/FlagCheckbox';
import ToolButton from '../../../../components/ToolButton/ToolButton';
import SquareCircleToggle from '../../../../components/SquareCircleToggle/SquareCircleToggle';

import { getSelectedFlags, getSelectedLocalIds } from '../../../../utils/tilesetHelpers';

import { setTilesetFlag } from '../../../../state/Tileset/tilesets';
import { setTileFlagsAreLocked } from '../../../../state/Project/tileFlagsAreLocked';
import { TILEMAP_TAB } from '../../../../state/Layout/activeNavigationTab';
import { setShowCircleTileFlags } from '../../../../state/Layout/showCircleTileFlags';

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
    const {
      checkedValues,
      indeterminateValues,
      tileFlagsAreLocked,
      _setTileFlagsAreLocked,
      showCircleTileFlags,
      _setShowCircleTileFlags,
    } = this.props;

    const finalCheckedValues = [];
    const finalIndeterminateValues = [];
    const flagValues = [];

    let tempFlagValue = 1;

    for ( let i = 0; i < 8; i += 1 ) {
      finalCheckedValues.push( checkedValues[i] );
      finalIndeterminateValues.push( indeterminateValues[i] );
      flagValues.push( tempFlagValue );

      tempFlagValue = tempFlagValue * 2;
    }

    if ( showCircleTileFlags ) {
      for ( let i = 0; i < 8; i += 1 ) {
        finalCheckedValues[i] = checkedValues[i + 8];
        finalIndeterminateValues[i] = indeterminateValues[i + 8];
        flagValues[i] = tempFlagValue;

        tempFlagValue = tempFlagValue * 2;
      }
    }

    return (
      <div className="tile-flags">
        <div className="tile-flags-header">
          Flags:
          <ToolButton
            icon="unlocked"
            title="Lock Flags"
            onClick={ () => _setTileFlagsAreLocked( !tileFlagsAreLocked ) }
            activeIcon="locked"
            active={ tileFlagsAreLocked }
          />
          <SquareCircleToggle
            value={ showCircleTileFlags }
            onChange={ v => _setShowCircleTileFlags( v ) }
          />
        </div>
        <div className="tile-flags-boxes">
          <FlagCheckbox
            id="flag-check-0"
            checked={ finalCheckedValues[0] }
            indeterminate={ finalIndeterminateValues[0] }
            onChange={ v => this.setFlag( flagValues[0], v, finalIndeterminateValues[0] ) }
            color="white"
            disabled={ tileFlagsAreLocked }
            circle={ showCircleTileFlags }
          />
          <FlagCheckbox
            id="flag-check-1"
            checked={ finalCheckedValues[1] }
            indeterminate={ finalIndeterminateValues[1] }
            onChange={ v => this.setFlag( flagValues[1], v, finalIndeterminateValues[1] ) }
            color="red"
            disabled={ tileFlagsAreLocked }
            circle={ showCircleTileFlags }
          />
          <FlagCheckbox
            id="flag-check-2"
            checked={ finalCheckedValues[2] }
            indeterminate={ finalIndeterminateValues[2] }
            onChange={ v => this.setFlag( flagValues[2], v, finalIndeterminateValues[2] ) }
            color="orange"
            disabled={ tileFlagsAreLocked }
            circle={ showCircleTileFlags }
          />
          <FlagCheckbox
            id="flag-check-3"
            checked={ finalCheckedValues[3] }
            indeterminate={ finalIndeterminateValues[3] }
            onChange={ v => this.setFlag( flagValues[3], v, finalIndeterminateValues[3] ) }
            color="yellow"
            disabled={ tileFlagsAreLocked }
            circle={ showCircleTileFlags }
          />
          <FlagCheckbox
            id="flag-check-4"
            checked={ finalCheckedValues[4] }
            indeterminate={ finalIndeterminateValues[4] }
            onChange={ v => this.setFlag( flagValues[4], v, finalIndeterminateValues[4] ) }
            color="green"
            disabled={ tileFlagsAreLocked }
            circle={ showCircleTileFlags }
          />
          <FlagCheckbox
            id="flag-check-5"
            checked={ finalCheckedValues[5] }
            indeterminate={ finalIndeterminateValues[5] }
            onChange={ v => this.setFlag( flagValues[5], v, finalIndeterminateValues[5] ) }
            color="blue"
            disabled={ tileFlagsAreLocked }
            circle={ showCircleTileFlags }
          />
          <FlagCheckbox
            id="flag-check-6"
            checked={ finalCheckedValues[6] }
            indeterminate={ finalIndeterminateValues[6] }
            onChange={ v => this.setFlag( flagValues[6], v, finalIndeterminateValues[6] ) }
            color="purple"
            disabled={ tileFlagsAreLocked }
            circle={ showCircleTileFlags }
          />
          <FlagCheckbox
            id="flag-check-7"
            checked={ finalCheckedValues[7] }
            indeterminate={ finalIndeterminateValues[7] }
            onChange={ v => this.setFlag( flagValues[7], v, finalIndeterminateValues[7] ) }
            color="pink"
            disabled={ tileFlagsAreLocked }
            circle={ showCircleTileFlags }
          />
        </div>
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
  tileFlagsAreLocked: PropTypes.bool.isRequired,
  _setTileFlagsAreLocked: PropTypes.func.isRequired,
  showCircleTileFlags: PropTypes.bool.isRequired,
  _setShowCircleTileFlags: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  const { activeNavigationTab } = state.layout;
  const { activeIndex } = state.tileset.present;
  const currentTileset = state.tileset.present.tilesets[activeIndex];

  const useMap = activeNavigationTab === TILEMAP_TAB;

  const flags = getSelectedFlags( currentTileset, useMap );
  const selectedIds = getSelectedLocalIds( currentTileset, useMap );
  const flagCount = flags.length;
  const trueCounts = new Array( 16 );
  const falseCounts = new Array( 16 );
  trueCounts.fill( 0 );
  falseCounts.fill( 0 );

  forEach( flags, flag => {
    let flagValue = 1;
    for ( let i = 0; i < 16; i += 1 ) {
      if ( flag & flagValue ) {
        trueCounts[i] += 1;
      }
      else {
        falseCounts[i] += 1;
      }

      flagValue = flagValue * 2;
    }
  } );

  const checkedValues = new Array( 16 );
  const indeterminateValues = new Array( 16 );

  for ( let i = 0; i < 16; i += 1 ) {
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

  const { showCircleTileFlags } = state.layout;
  const { tileFlagsAreLocked } = state.project;
  return {
    checkedValues,
    indeterminateValues,
    activeIndex,
    selectedIds,
    tileFlagsAreLocked,
    showCircleTileFlags,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setTilesetFlag: setTilesetFlag,
    _setTileFlagsAreLocked: setTileFlagsAreLocked,
    _setShowCircleTileFlags: setShowCircleTileFlags,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( TileFlags );
