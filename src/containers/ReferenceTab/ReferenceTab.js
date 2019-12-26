
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ReferenceConsole from '../ReferenceContent/ReferenceConsole/ReferenceConsole';
import Articles from '../ReferenceContent/Articles/Articles';
import ApiReference from '../ReferenceContent/ApiReference/ApiReference';
import Hotkeys from '../ReferenceContent/Hotkeys/Hotkeys';
import ReferenceAbout from '../ReferenceContent/ReferenceAbout/ReferenceAbout';
import Motivation from '../ReferenceContent/Motivation/Motivation';

import TopBar from '../../components/TopBar/TopBar';
import Button from '../../components/Button/Button';
import Scrollbars from '../../components/Scrollbars/Scrollbars';

import { toggleReferencePanel } from '../../state/Layout/referencePanelIsOpen';
import {
  setReferenceRoute,
  CONSOLE,
  ARTICLES,
  API,
  HOTKEYS,
  REFERENCE_ABOUT,
  MOTIVATION,
} from '../../state/Layout/referenceRoutes';

import { useExtraSmallWidth } from '../../style/dimensions';

import './ReferenceTab.scss';

class ReferenceTab extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      windowWidth: 10000,
    };

    this.updateDimensions = this.updateDimensions.bind( this );
  }

  handleBackClick() {
    const { _setReferenceRoute, section, route } = this.props;
    const newRoute = [...route.current];
    if ( newRoute.length > 1 ) {
      newRoute.pop();
      _setReferenceRoute( section, newRoute );
    }
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener( 'resize', this.updateDimensions );
  }

  componentWillUnmount() {
    window.removeEventListener( 'resize', this.updateDimensions );
  }

  updateDimensions() {
    this.setState( { windowWidth: window.innerWidth } );
  }

  render() {
    const {
      _toggleReferencePanel,
      isOpen,
      topBarTitle,
      route,
      section,
    } = this.props;
    const { windowWidth } = this.state;

    let className = isOpen ? 'reference-tab' : 'reference-tab closed';
    const useFloating = windowWidth <= useExtraSmallWidth;

    if ( useFloating ) {
      className += ' floating';
    }

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
            <Scrollbars>
              <Articles
                route={ route }
                section={ section }
              />
            </Scrollbars>
          );
          break;
        }
        case API: {
          contentRender = (
            <Scrollbars>
              <ApiReference
                route={ route }
                section={ section }
              />
            </Scrollbars>
          );
          break;
        }
        case HOTKEYS: {
          contentRender = (
            <Scrollbars>
              <Hotkeys
                route={ route }
                section={ section }
              />
            </Scrollbars>
          );
          break;
        }
        case REFERENCE_ABOUT: {
          contentRender = (
            <Scrollbars>
              <ReferenceAbout />
            </Scrollbars>
          );
          break;
        }
        case MOTIVATION: {
          contentRender = (
            <Scrollbars>
              <Motivation />
            </Scrollbars>
          );
          break;
        }
        default: break;
      }
    }

    const showBackButton = route.current.length > 1;

    const mainRender = isOpen ? (
      <div className="reference-main">
        <TopBar
          title={ topBarTitle }
          showBackButton={ showBackButton }
          onBackClick={ () => this.handleBackClick() }
        />
        { contentRender }
      </div>
    ) : null;

    const spacerRender = useFloating ? <div className="ref-spacer" /> : null;

    return (
      <Fragment>
        { spacerRender }
        <div className={ className }>
          <Button
            className="toggle-btn"
            title="Toggle Reference Panel"
            icon="play"
            click={ () => _toggleReferencePanel() }
            hideTitle
          />
          { mainRender }
        </div>
      </Fragment>
    );
  }
}

ReferenceTab.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  _toggleReferencePanel: PropTypes.func.isRequired,
  topBarTitle: PropTypes.string.isRequired,
  route: PropTypes.object.isRequired,
  section: PropTypes.string.isRequired,
  _setReferenceRoute: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  const { activeNavigationTab } = state.layout;
  const route = state.layout.referenceRoutes[activeNavigationTab];
  return {
    isOpen: state.layout.referencePanelIsOpen,
    topBarTitle: state.layout.referenceTabTitle,
    route,
    section: activeNavigationTab,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _toggleReferencePanel: toggleReferencePanel,
    _setReferenceRoute: setReferenceRoute,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ReferenceTab );
