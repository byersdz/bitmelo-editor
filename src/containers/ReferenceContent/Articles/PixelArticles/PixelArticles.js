
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AButton from '../../../../components/AButton/AButton';
import ArticleList from '../../../../components/ArticleList/ArticleList';

import { setReferenceRoute } from '../../../../state/Layout/referenceRoutes';
import { setReferenceTabTitle } from '../../../../state/Layout/referenceTabTitle';

import articleData, { SAINT_11 } from './articleData';

import './PixelArticles.scss';

class PixelArticles extends React.Component {
  componentDidMount() {
    this.setTitle();
  }

  componentDidUpdate() {
    this.setTitle();
  }

  setTitle() {
    const { route, _setReferenceTabTitle } = this.props;

    if ( route.current.length <= 2 ) {
      _setReferenceTabTitle( 'Pixel Art Tutorials' );
    }
    else {
      const key = route.current[route.current.length - 1];

      const title = articleData.reduce( ( acc, item ) => {
        if ( item.key === key ) {
          return item.title;
        }
        return acc;
      }, key );

      _setReferenceTabTitle( title );
    }
  }

  handleListClick( key ) {
    const { _setReferenceRoute, section, route } = this.props;
    const newRoute = [...route.current];
    newRoute.push( key );
    _setReferenceRoute( section, newRoute );
  }

  renderArticleList() {
    const sortedArticles = articleData.sort( ( a, b ) => {
      if ( a.title < b.title ) {
        return -1;
      }

      return 1;
    } );

    const items = sortedArticles.map( item => {
      return {
        title: item.title,
        key: item.key,
      };
    } );

    return (
      <ArticleList
        items={ items }
        onItemSelected={ k => this.handleListClick( k ) }
      />
    );
  }

  renderArticleItem( item ) {
    let detailsRender = null;

    if ( item.creator === SAINT_11 ) {
      detailsRender = (
        <div className="details">
          { 'Image by ' }
          <AButton href="http://patreon.com/saint11">
            { 'Pedro Medeiros ' }
          </AButton>
          <span className="license">
            (
            <AButton href="https://creativecommons.org/licenses/by/4.0/legalcode">
              { 'License' }
            </AButton>
            )
          </span>
        </div>
      );
    }
    return (
      <div className="pixel-article">
        <img
          src={ item.image }
          alt={ item.title }
        />
        { detailsRender }
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
  _setReferenceTabTitle: PropTypes.func.isRequired,
};

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setReferenceRoute: setReferenceRoute,
    _setReferenceTabTitle: setReferenceTabTitle,
  }, dispatch );
}

export default connect( null, mapDispatchToProps )( PixelArticles );
