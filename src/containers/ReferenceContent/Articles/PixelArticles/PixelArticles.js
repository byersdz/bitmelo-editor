
import React from 'react';

import articleData from './articleData';

import './PixelArticles.scss';

class PixelArticles extends React.Component {
  handleListClick() {

  }

  renderArticleList() {
    const articleListRender = [];
    for ( let i = 0; i < articleData.length; i += 1 ) {
      const item = articleData[i];
      articleListRender.push( (
        <div key={ item.key }>
          { item.title }
        </div>
      ) );
    }
    return articleListRender;
  }

  render() {
    const articleListRender = this.renderArticleList();
    return (
      <div className="pixel-articles">
        { articleListRender }
      </div>
    );
  }
}

export default PixelArticles;
