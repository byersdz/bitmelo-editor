
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setReferenceTabTitle } from '../../../state/Layout/referenceTabTitle';

import LineBreak from './floral-line-break.png';

import './ReferenceAbout.scss';

class ReferenceAbout extends React.Component {
  componentDidMount() {
    const { _setReferenceTabTitle } = this.props;

    _setReferenceTabTitle( 'Reference' );
  }

  render() {
    return (
      <div className="ref-about">
        <img src={ LineBreak } alt="line break" />
        <p>
          This is the Reference Panel. Here you will find useful contextual information while you
          are creating your game. This includes an API reference, the debug console, pixel art tutorials,
          and more!
        </p>
        <p>
          Have fun making games!
        </p>
      </div>
    );
  }
}

ReferenceAbout.propTypes = {
  _setReferenceTabTitle: PropTypes.func.isRequired,
};

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setReferenceTabTitle: setReferenceTabTitle,
  }, dispatch );
}
export default connect( null, mapDispatchToProps )( ReferenceAbout );
