
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import forEach from 'lodash/forEach';

import FlagCheckbox from '../../../../components/FlagCheckbox/FlagCheckbox';

import { getSelectedFlags } from '../../../../utils/tilesetHelpers';

import './TileFlags.scss';


class TileFlags extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      checked: false,
    };
  }

  render() {
    const { checkedValues, indeterminateValues } = this.props;
    const { checked } = this.state;

    console.log( checked, checkedValues, indeterminateValues );

    return (
      <div className="tile-flags">
        <FlagCheckbox
          checked={ checkedValues[0] }
          indeterminate={ indeterminateValues[0] }
          onChange={ v => this.setState( { checked: v } ) }
          color="white"
        />
        <FlagCheckbox
          checked={ checkedValues[1] }
          indeterminate={ indeterminateValues[1] }
          onChange={ v => this.setState( { checked: v } ) }
          color="red"
        />
        <FlagCheckbox
          checked={ checkedValues[2] }
          indeterminate={ indeterminateValues[2] }
          onChange={ v => this.setState( { checked: v } ) }
          color="orange"
        />
        <FlagCheckbox
          checked={ checkedValues[3] }
          indeterminate={ indeterminateValues[3] }
          onChange={ v => this.setState( { checked: v } ) }
          color="yellow"
        />
        <FlagCheckbox
          checked={ checkedValues[4] }
          indeterminate={ indeterminateValues[4] }
          onChange={ v => this.setState( { checked: v } ) }
          color="green"
        />
        <FlagCheckbox
          checked={ checkedValues[5] }
          indeterminate={ indeterminateValues[5] }
          onChange={ v => this.setState( { checked: v } ) }
          color="blue"
        />
        <FlagCheckbox
          checked={ checkedValues[6] }
          indeterminate={ indeterminateValues[6] }
          onChange={ v => this.setState( { checked: v } ) }
          color="purple"
        />
        <FlagCheckbox
          checked={ checkedValues[7] }
          indeterminate={ indeterminateValues[7] }
          onChange={ v => this.setState( { checked: v } ) }
          color="pink"
        />
      </div>
    );
  }
}

TileFlags.propTypes = {
  checkedValues: PropTypes.arrayOf( PropTypes.bool ).isRequired,
  indeterminateValues: PropTypes.arrayOf( PropTypes.bool ).isRequired,
};

function mapStateToProps( state ) {
  const { activeIndex } = state.tileset.present;
  const currentTileset = state.tileset.present.tilesets[activeIndex];

  const flags = getSelectedFlags( currentTileset );
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

  console.log( 'true', trueCounts );
  console.log( 'false', falseCounts );

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
  };
}

export default connect( mapStateToProps )( TileFlags );
