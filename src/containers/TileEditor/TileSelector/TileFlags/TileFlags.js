
import React from 'react';

import FlagCheckbox from '../../../../components/FlagCheckbox/FlagCheckbox';

import './TileFlags.scss';

class TileFlags extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      checked: false,
    };
  }

  render() {
    const { checked } = this.state;

    return (
      <div className="tile-flags">
        <FlagCheckbox
          checked={ checked }
          onChange={ v => this.setState( { checked: v } ) }
          color="red"
        />
        <FlagCheckbox
          checked={ checked }
          onChange={ v => this.setState( { checked: v } ) }
          color="orange"
        />
        <FlagCheckbox
          checked={ checked }
          onChange={ v => this.setState( { checked: v } ) }
          color="yellow"
        />
        <FlagCheckbox
          checked={ checked }
          onChange={ v => this.setState( { checked: v } ) }
          color="green"
        />
        <FlagCheckbox
          checked={ checked }
          onChange={ v => this.setState( { checked: v } ) }
          color="blue"
        />
        <FlagCheckbox
          checked={ checked }
          onChange={ v => this.setState( { checked: v } ) }
          color="purple"
        />
        <FlagCheckbox
          checked={ checked }
          onChange={ v => this.setState( { checked: v } ) }
          color="black"
        />
        <FlagCheckbox
          checked={ checked }
          onChange={ v => this.setState( { checked: v } ) }
          color="white"
        />
      </div>
    );
  }
}

export default TileFlags;
