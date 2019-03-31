
import React from 'react';
import PropTypes from 'prop-types';

import Column from './Column/Column';

import './WaveEditor.scss';

class WaveEditor extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      data: new Array( 32 ),
    };
  }

  render() {
    const { data } = this.state;
    const { minValue, maxValue } = this.props;

    const columns = [];
    for ( let i = 0; i < data.length; i += 1 ) {
      const val = data[i];
      const column = (
        <Column
          key={ i }
          minValue={ minValue }
          maxValue={ maxValue }
          value={ val }
          onValueSelected={ ( selectedValue ) => {
            const newData = [...data];
            newData[i] = selectedValue;
            this.setState( { data: newData } );
          } }
        />
      );
      columns.push( column );
    }

    return (
      <div className="wave-editor" draggable={ false }>
        { columns }
      </div>
    );
  }
}

WaveEditor.propTypes = {
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
};

export default WaveEditor;
