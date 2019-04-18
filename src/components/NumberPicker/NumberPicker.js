
import React from 'react';
import PropTypes from 'prop-types';

import Button from 'Components/Button/Button';

import './NumberPicker.scss';

class NumberPicker extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      tempValue: 0,
      isEditing: false,
    };
  }

  handleLowerClick() {
    const { value, minValue, onValueChange } = this.props;
    if ( value > minValue ) {
      onValueChange( value - 1 );
    }
  }

  handleHigherClick() {
    const { value, maxValue, onValueChange } = this.props;
    if ( value < maxValue ) {
      onValueChange( value + 1 );
    }
  }

  handleInputChange( e ) {
    const { isEditing } = this.state;

    if ( isEditing ) {
      this.setState( {
        tempValue: e.target.value,
      } );
    }
  }

  beginEditing() {
    const { value } = this.props;
    const { isEditing } = this.state;

    if ( isEditing ) {
      return;
    }

    this.setState( {
      isEditing: true,
      tempValue: value,
    } );
  }

  endEditing() {
    const { onValueChange, minValue, maxValue } = this.props;
    const { isEditing, tempValue } = this.state;
    if ( !isEditing ) {
      return;
    }

    const newValue = parseInt( tempValue, 10 );

    if ( !Number.isNaN( newValue ) ) {
      if ( newValue < minValue ) {
        onValueChange( minValue );
      }
      else if ( newValue > maxValue ) {
        onValueChange( maxValue );
      }
      else {
        onValueChange( newValue );
      }
    }

    this.setState( {
      isEditing: false,
    } );
  }

  render() {
    const {
      title,
      value,
    } = this.props;
    const { isEditing, tempValue } = this.state;

    const inputClass = isEditing ? 'is-editing' : '';
    const displayValue = isEditing ? tempValue : value;

    return (
      <div className="num-picker">
        <div className="title">
          { `${ title }: ` }
        </div>
        <Button
          className="lower"
          icon="play"
          title="Lower"
          hideTitle
          click={ () => this.handleLowerClick() }
        />
        <input
          className={ inputClass }
          type="text"
          value={ displayValue }
          onChange={ e => this.handleInputChange( e ) }
          onFocus={ () => this.beginEditing() }
          onClick={ () => this.beginEditing() }
          onBlur={ () => this.endEditing() }
          onKeyPress={ e => {
            if ( e.charCode === 13 ) { // enter key
              this.endEditing();
            }
          } }
        />
        <Button
          className="higher"
          icon="play"
          title="Higher"
          hideTitle
          click={ () => this.handleHigherClick() }
        />
      </div>
    );
  }
}

NumberPicker.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default NumberPicker;
