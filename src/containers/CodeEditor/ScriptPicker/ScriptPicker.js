
import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';

import TextInput from '../../../components/TextInput/TextInput';
import Button from '../../../components/Button/Button';

import './ScriptPicker.scss';

class ScriptPicker extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      dropDownIsOpen: false,
    };
  }

  handleClickOutside() {
    this.setState( { dropDownIsOpen: false } );
  }

  handleToggleClick() {
    const { dropDownIsOpen } = this.state;

    this.setState( { dropDownIsOpen: !dropDownIsOpen } );
  }

  render() {
    const { dropDownIsOpen } = this.state;

    let dropDownRender = null;
    if ( dropDownIsOpen ) {
      dropDownRender = (
        <div className="drop-down">
          Drop Down
        </div>
      );
    }

    const toggleClass = dropDownIsOpen ? 'toggle-btn open' : 'toggle-btn';

    return (
      <div className="script-picker">
        <div className="index-display">
          { '0 - ' }
        </div>
        <TextInput
          title="Name"
          hideTitle
          vertical
          onValueChange={ v => console.log( v ) }
        />
        <Button
          className={ toggleClass }
          title="toggle"
          icon="up"
          hideTitle
          click={ () => this.handleToggleClick() }
        />
        { dropDownRender }
      </div>
    );
  }
}

export default enhanceWithClickOutside( ScriptPicker );
