
import React from 'react';
import PropTypes from 'prop-types';
import enhanceWithClickOutside from 'react-click-outside';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cloneDeep from 'lodash.clonedeep';

import TextInput from '../../../components/TextInput/TextInput';
import Button from '../../../components/Button/Button';

import { setScript, addScript } from '../../../state/Code/scripts';
import { selectScript } from '../../../state/Code/activeIndex';

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

  handleNameChange( v ) {
    const { scripts, activeScript, _setScript } = this.props;
    const newScript = cloneDeep( scripts[activeScript] );
    newScript.name = v.trim();
    if ( newScript.name.length > 64 ) {
      newScript.name = newScript.name.slice( 0, 64 );
    }
    _setScript( activeScript, newScript );
  }

  renderItems() {
    const { scripts, activeScript, _selectScript } = this.props;

    return scripts.map( ( script, index ) => {
      const className = index === activeScript ? 'script-item selected' : 'script-item';
      return (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={ `script-${ index }` }
          className={ className }
        >
          <Button
            className="control-btn move-down"
            title="move-down"
            icon="up"
            hideTitle
            click={ () => console.log( 'move down' ) }
          />
          <Button
            className="control-btn move-up"
            title="move-up"
            icon="up"
            hideTitle
            click={ () => console.log( 'move up' ) }
          />
          <div className="index">
            { index }
          </div>
          <Button
            title="select"
            hideTitle
            className="script-name"
            click={ () => {
              _selectScript( index );
              this.setState( { dropDownIsOpen: false } );
            } }
          >
            <span>
              { script.name }
            </span>
          </Button>
          <Button
            className="control-btn delete"
            title="delete"
            icon="trash"
            hideTitle
            click={ () => console.log( 'delete' ) }
          />
        </div>
      );
    } );
  }

  render() {
    const { scripts, activeScript, _addScript } = this.props;
    const { dropDownIsOpen } = this.state;

    let dropDownRender = null;
    if ( dropDownIsOpen ) {
      dropDownRender = (
        <div className="drop-down">
          { this.renderItems() }
          <Button
            title="select"
            hideTitle
            className="add-btn"
            click={ () => _addScript() }
          >
            Add Script
          </Button>
        </div>
      );
    }

    const toggleClass = dropDownIsOpen ? 'toggle-btn open' : 'toggle-btn';

    return (
      <div className="script-picker">
        <div className="index-display">
          { `${ activeScript } - ` }
        </div>
        <TextInput
          title="Name"
          hideTitle
          vertical
          onValueChange={ v => this.handleNameChange( v ) }
          value={ scripts[activeScript].name }
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

ScriptPicker.propTypes = {
  scripts: PropTypes.arrayOf( PropTypes.object ).isRequired,
  activeScript: PropTypes.number.isRequired,
  _setScript: PropTypes.func.isRequired,
  _addScript: PropTypes.func.isRequired,
  _selectScript: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    scripts: state.code.scripts,
    activeScript: state.code.activeIndex,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setScript: setScript,
    _addScript: addScript,
    _selectScript: selectScript,
  }, dispatch );
}

// eslint-disable-next-line no-class-assign
ScriptPicker = enhanceWithClickOutside( ScriptPicker );

export default connect( mapStateToProps, mapDispatchToProps )( ScriptPicker );
