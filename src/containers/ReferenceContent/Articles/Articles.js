
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AButton from 'Components/AButton/AButton';

import { PIXEL_TUTORIALS } from 'Utils/articles';
import { setReferenceRoute } from 'State/Layout/referenceRoutes';

import PixelArticles from './PixelArticles/PixelArticles';

import './Articles.scss';

class Articles extends React.Component {
  handleArticleClick( key ) {
    const { _setReferenceRoute, section, route } = this.props;
    const newRoute = [...route.current];
    newRoute.push( key );
    _setReferenceRoute( section, newRoute );
  }

  renderArticleLinks() {
    const linkData = [
      {
        display: 'Pixel Art Tutorials',
        key: PIXEL_TUTORIALS,
      },
    ];

    const linksRender = [];

    for ( let i = 0; i < linkData.length; i += 1 ) {
      const linkItem = linkData[i];
      linksRender.push( (
        <div
          className="article-link"
          key={ linkItem.key }
        >
          <AButton
            click={ () => this.handleArticleClick( linkItem.key ) }
          >
            { linkItem.display }
          </AButton>
        </div>
      ) );
    }
    return linksRender;
  }

  render() {
    const { route } = this.props;
    const currentRoute = route.current;

    if ( currentRoute.length <= 1 ) {
      // show the list of articles
      const linksRender = this.renderArticleLinks();
      return (
        <div className="articles">
          { linksRender }
        </div>
      );
    }

    switch ( currentRoute[1] ) {
      case PIXEL_TUTORIALS: {
        return <PixelArticles />;
      }
      default: return <div>Missing Article</div>;
    }
  }
}

Articles.propTypes = {
  route: PropTypes.object.isRequired,
  section: PropTypes.string.isRequired,
  _setReferenceRoute: PropTypes.func.isRequired,
};

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setReferenceRoute: setReferenceRoute,
  }, dispatch );
}

export default connect( null, mapDispatchToProps )( Articles );
