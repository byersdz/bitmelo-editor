
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ReferenceContent from 'Containers/ReferenceContent/ReferenceContent';
import TopBar from 'Components/TopBar/TopBar';
import Button from 'Components/Button/Button';
import { toggleReferencePanel } from 'State/Layout/referencePanelIsOpen';

import './ReferenceTab.scss';

class ReferenceTab extends React.Component {
  render() {
    const { toggle, isOpen, topBarTitle } = this.props;
    const className = isOpen ? 'reference-tab' : 'reference-tab closed';

    const content = isOpen ? (
      <div className="reference-main">
        <TopBar title={ topBarTitle } />
        <ReferenceContent />
      </div>
    ) : null;

    return (
      <div className={ className }>
        <Button
          className="toggle-btn"
          title="Toggle Reference Panel"
          icon="play"
          click={ () => toggle() }
          hideTitle
        />
        { content }
      </div>
    );
  }
}

ReferenceTab.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  topBarTitle: PropTypes.string.isRequired,
};

function mapStateToProps( state ) {
  return {
    isOpen: state.layout.referencePanelIsOpen,
    topBarTitle: state.layout.referenceTabTitle,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    toggle: toggleReferencePanel,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ReferenceTab );
