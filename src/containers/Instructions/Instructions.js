
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';

import TextInput from '../../components/TextInput/TextInput';
import TextAreaInput from '../../components/TextAreaInput/TextAreaInput';

import { setInstructions } from '../../state/Project/instructions';

import './Instructions.scss';

class Instructions extends React.PureComponent {
  handleInstructionChange( name, value ) {
    const { _setInstructions } = this.props;

    const instructions = {};
    instructions[name] = value;
    _setInstructions( instructions );
  }

  render() {
    const { instructions } = this.props;

    return (
      <div className="instructions">
        <div className="instructions-container">
          <TextAreaInput
            value={ get( instructions, 'gameDescription' ) }
            onChange={ v => this.handleInstructionChange( 'gameDescription', v ) }
            title="Game Description"
            maxLength={ 140 }
          />
          <h4>Action Descriptions:</h4>
          <TextInput
            title="Action 1 - (Z, Space, or bottom face button)"
            vertical
            value={ get( instructions, 'action1' ) }
            onValueChange={ v => this.handleInstructionChange( 'action1', v ) }
            maxLength={ 32 }
          />
          <TextInput
            title="Action 2 - (X, D, or right face button)"
            vertical
            value={ get( instructions, 'action2' ) }
            onValueChange={ v => this.handleInstructionChange( 'action2', v ) }
            maxLength={ 32 }
          />
          <TextInput
            title="Action 3 - (A, C, or left face button)"
            vertical
            value={ get( instructions, 'action3' ) }
            onValueChange={ v => this.handleInstructionChange( 'action3', v ) }
            maxLength={ 32 }
          />
          <TextInput
            title="Action 4 - (S, V, or top face button)"
            vertical
            value={ get( instructions, 'action4' ) }
            onValueChange={ v => this.handleInstructionChange( 'action4', v ) }
            maxLength={ 32 }
          />
          <TextInput
            title="Left Trigger - (Q or Shift)"
            vertical
            value={ get( instructions, 'leftTrigger' ) }
            onValueChange={ v => this.handleInstructionChange( 'leftTrigger', v ) }
            maxLength={ 32 }
          />
          <TextInput
            title="Right Trigger - (W or Alt)"
            vertical
            value={ get( instructions, 'rightTrigger' ) }
            onValueChange={ v => this.handleInstructionChange( 'rightTrigger', v ) }
            maxLength={ 32 }
          />
          <TextInput
            title="Pause - (P or Enter)"
            vertical
            value={ get( instructions, 'pause' ) }
            onValueChange={ v => this.handleInstructionChange( 'pause', v ) }
            maxLength={ 32 }
          />
          <h4>D-pad Descriptions:</h4>
          <TextInput
            title="Left - (Left Arrow or J)"
            vertical
            value={ get( instructions, 'left' ) }
            onValueChange={ v => this.handleInstructionChange( 'left', v ) }
            maxLength={ 32 }
          />
          <TextInput
            title="Right - (Right Arrow or L)"
            vertical
            value={ get( instructions, 'right' ) }
            onValueChange={ v => this.handleInstructionChange( 'right', v ) }
            maxLength={ 32 }
          />
          <TextInput
            title="Up - (Up Arrow or I)"
            vertical
            value={ get( instructions, 'up' ) }
            onValueChange={ v => this.handleInstructionChange( 'up', v ) }
            maxLength={ 32 }
          />
          <TextInput
            title="Down - (Down Arrow or K)"
            vertical
            value={ get( instructions, 'down' ) }
            onValueChange={ v => this.handleInstructionChange( 'down', v ) }
            maxLength={ 32 }
          />
        </div>
      </div>
    );
  }
}

Instructions.propTypes = {
  instructions: PropTypes.object.isRequired,
  _setInstructions: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    instructions: state.project.instructions,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setInstructions: setInstructions,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Instructions );
