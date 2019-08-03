
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { setReferenceTabTitle } from 'State/Layout/referenceTabTitle';

import ReferenceConsole from '../ReferenceConsole/ReferenceConsole';

import './PlayContent.scss';

class PlayContent extends React.Component {
  componentDidMount() {
    const { _setReferenceTabTitle } = this.props;
    _setReferenceTabTitle( 'Console' );
  }

  render() {
    return (
      <div className="play-content">
        <ReferenceConsole />
      </div>
    );
  }
}

PlayContent.propTypes = {
  _setReferenceTabTitle: PropTypes.func.isRequired,
};

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setReferenceTabTitle: setReferenceTabTitle,
  }, dispatch );
}

export default connect( null, mapDispatchToProps )( PlayContent );
