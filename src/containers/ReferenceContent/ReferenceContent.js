
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PLAY_TAB } from 'State/Layout/activeNavigationTab';

import PlayContent from './PlayContent/PlayContent';

import './ReferenceContent.scss';

class ReferenceContent extends React.Component {
  render() {
    const { activeNavigationTab } = this.props;

    let contentRender = null;

    switch ( activeNavigationTab ) {
      case PLAY_TAB: {
        contentRender = <PlayContent />;
        break;
      }
      default: break;
    }
    return (
      <Fragment>
        { contentRender }
      </Fragment>
    );
  }
}

ReferenceContent.propTypes = {
  activeNavigationTab: PropTypes.string.isRequired,
};

function mapStateToProps( state ) {
  return {
    activeNavigationTab: state.layout.activeNavigationTab,
  };
}

export default connect( mapStateToProps )( ReferenceContent );
