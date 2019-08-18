
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ArticleList from 'Components/ArticleList/ArticleList';

import { PIXEL_TUTORIALS } from 'Utils/articles';
import { setReferenceRoute } from 'State/Layout/referenceRoutes';
import { setReferenceTabTitle } from 'State/Layout/referenceTabTitle';

import PixelArticles from './PixelArticles/PixelArticles';

import './Articles.scss';

class Articles extends React.Component {
  componentDidMount() {
    this.setTitle();
  }

  componentDidUpdate( prevProps ) {
    const { route: prevRoute } = prevProps;
    const { route } = this.props;

    if ( route !== prevRoute ) {
      this.setTitle();
    }
  }

  setTitle() {
    const { route, _setReferenceTabTitle } = this.props;
    if ( route.current.length === 1 ) {
      _setReferenceTabTitle( 'Articles' );
    }
  }

  handleArticleClick( key ) {
    const { _setReferenceRoute, section, route } = this.props;
    const newRoute = [...route.current];
    newRoute.push( key );
    _setReferenceRoute( section, newRoute );
  }

  renderArticleLinks() {
    const items = [
      {
        title: 'Pixel Art Tutorials',
        key: PIXEL_TUTORIALS,
      },
    ];

    return (
      <ArticleList
        items={ items }
        onItemSelected={ k => this.handleArticleClick( k ) }
      />
    );
  }

  render() {
    const { route, section } = this.props;
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
        return (
          <PixelArticles
            route={ route }
            section={ section }
          />
        );
      }
      default: return <div>Missing Article</div>;
    }
  }
}

Articles.propTypes = {
  route: PropTypes.object.isRequired,
  section: PropTypes.string.isRequired,
  _setReferenceRoute: PropTypes.func.isRequired,
  _setReferenceTabTitle: PropTypes.func.isRequired,
};

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setReferenceRoute: setReferenceRoute,
    _setReferenceTabTitle: setReferenceTabTitle,
  }, dispatch );
}

export default connect( null, mapDispatchToProps )( Articles );
