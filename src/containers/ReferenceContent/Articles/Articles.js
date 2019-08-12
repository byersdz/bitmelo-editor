
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AButton from 'Components/AButton/AButton';

import { setTileArticlePath } from 'State/Layout/tileEditor';
import { PIXEL_TUTORIALS } from 'Utils/articles';

import PixelArticles from './PixelArticles/PixelArticles';

import './Articles.scss';

class Articles extends React.Component {
  handleArticleClick( key ) {
    const { _setTileArticlePath } = this.props;

    _setTileArticlePath( key );
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
    const { tileArticlePath } = this.props;

    const articlePath = tileArticlePath;

    if ( articlePath ) {
      switch ( articlePath ) {
        case PIXEL_TUTORIALS: {
          return <PixelArticles />;
        }
        default: break;
      }
    }

    const linksRender = this.renderArticleLinks();
    return (
      <div className="articles">
        { linksRender }
      </div>
    );
  }
}

Articles.propTypes = {
  tileArticlePath: PropTypes.string.isRequired,
  _setTileArticlePath: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    tileArticlePath: state.layout.tileEditor.articlePath,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setTileArticlePath: setTileArticlePath,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Articles );
