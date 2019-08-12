
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ReferenceConsole from 'Containers/ReferenceContent/ReferenceConsole/ReferenceConsole';
import Articles from 'Containers/ReferenceContent/Articles/Articles';

import TopBar from 'Components/TopBar/TopBar';
import Button from 'Components/Button/Button';
import { toggleReferencePanel } from 'State/Layout/referencePanelIsOpen';
import { CONSOLE, ARTICLES } from 'State/Layout/referenceRoutes';

import './ReferenceTab.scss';

class ReferenceTab extends React.Component {
  render() {
    const {
      toggle,
      isOpen,
      topBarTitle,
      route,
    } = this.props;
    const className = isOpen ? 'reference-tab' : 'reference-tab closed';

    let contentRender = (
      <div>
        Missing Content
      </div>
    );

    if ( route.current.length > 0 ) {
      switch ( route.current[0] ) {
        case CONSOLE: {
          contentRender = (
            <ReferenceConsole />
          );
          break;
        }
        case ARTICLES: {
          contentRender = (
            <Articles />
          );
          break;
        }
        default: break;
      }
    }

    const mainRender = isOpen ? (
      <div className="reference-main">
        <TopBar title={ topBarTitle } />
        { contentRender }
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
        { mainRender }
      </div>
    );
  }
}

ReferenceTab.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  topBarTitle: PropTypes.string.isRequired,
  route: PropTypes.object.isRequired,
};

function mapStateToProps( state ) {
  const { activeNavigationTab } = state.layout;
  const route = state.layout.referenceRoutes[activeNavigationTab];
  return {
    isOpen: state.layout.referencePanelIsOpen,
    topBarTitle: state.layout.referenceTabTitle,
    route,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    toggle: toggleReferencePanel,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ReferenceTab );
