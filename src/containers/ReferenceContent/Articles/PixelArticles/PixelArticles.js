
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AButton from 'Components/AButton/AButton';

import { setReferenceRoute } from 'State/Layout/referenceRoutes';

import articleData from './articleData';

import './PixelArticles.scss';

class PixelArticles extends React.Component {
  handleListClick( key ) {
    const { _setReferenceRoute, section, route } = this.props;
    const newRoute = [...route.current];
    newRoute.push( key );
    _setReferenceRoute( section, newRoute );
  }

  renderArticleList() {
    const articleListRender = [];
    for ( let i = 0; i < articleData.length; i += 1 ) {
      const item = articleData[i];
      articleListRender.push( (
        <AButton
          key={ item.key }
          click={ () => this.handleListClick( item.key ) }
        >
          { item.title }
        </AButton>
      ) );
    }
    return articleListRender;
  }

  renderArticleItem( item ) {
    return (
      <div className="item">
        <img
          src={ item.image }
          alt={ item.title }
        />
      </div>
    );
  }

  render() {
    const { route } = this.props;
    const currentRoute = route.current;

    let content = null;

    if ( currentRoute.length <= 2 ) {
      // render the list of articles
      content = this.renderArticleList();
    }
    else {
      const key = currentRoute[currentRoute.length - 1];
      let article = null;
      for ( let i = 0; i < articleData.length; i += 1 ) {
        if ( articleData[i].key === key ) {
          article = articleData[i];
        }
      }

      if ( article ) {
        content = this.renderArticleItem( article );
      }
      else {
        content = this.renderArticleList();
      }
    }

    return (
      <div className="pixel-articles">
        { content }
      </div>
    );
  }
}

PixelArticles.propTypes = {
  section: PropTypes.string.isRequired,
  route: PropTypes.object.isRequired,
  _setReferenceRoute: PropTypes.func.isRequired,
};

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setReferenceRoute: setReferenceRoute,
  }, dispatch );
}

export default connect( null, mapDispatchToProps )( PixelArticles );
