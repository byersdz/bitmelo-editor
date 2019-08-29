
import React from 'react';
import PropTypes from 'prop-types';

import './RangeSlider.scss';

class RangeSlider extends React.Component {
  handleValueChange( event ) {
    const { onValueChange } = this.props;
    const newValue = Number.parseFloat( event.target.value );
    onValueChange( newValue );
  }

  render() {
    const {
      title,
      min,
      max,
      step,
      value,
    } = this.props;

    return (
      <div className="range-slider">
        <div className="title">
          { `${ title }:` }
        </div>
        <div className="controls">
          <input
            type="range"
            min={ min }
            max={ max }
            step={ step }
            value={ value }
            onChange={ e => this.handleValueChange( e ) }
          />
        </div>
      </div>
    );
  }
}

RangeSlider.propTypes = {
  title: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default RangeSlider;
