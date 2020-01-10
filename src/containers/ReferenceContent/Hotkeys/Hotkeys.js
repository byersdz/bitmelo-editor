
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setReferenceTabTitle } from '../../../state/Layout/referenceTabTitle';

import SoundEditorHotkeys from './SoundEditorHotkeys/SoundEditorHotkeys';

import './Hotkeys.scss';

class Hotkeys extends React.Component {
  componentDidMount() {
    const { _setReferenceTabTitle } = this.props;

    _setReferenceTabTitle( 'Hotkeys' );
  }

  render() {
    return (
      <div className="hotkeys">
        <SoundEditorHotkeys />
      </div>
    );
  }
}

Hotkeys.propTypes = {
  _setReferenceTabTitle: PropTypes.func.isRequired,
};

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setReferenceTabTitle: setReferenceTabTitle,
  }, dispatch );
}
export default connect( null, mapDispatchToProps )( Hotkeys );
