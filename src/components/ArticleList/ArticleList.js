
import React from 'react';
import PropTypes from 'prop-types';

import Button from 'Components/Button/Button';

import './ArticleList.scss';

class ArticleList extends React.Component {
  render() {
    const { items, onItemSelected } = this.props;

    const itemsRender = items.map( item => {
      return (
        <Button
          className="item"
          key={ item.key }
          title={ item.title }
          click={ () => onItemSelected( item.key ) }
        />
      );
    } );

    return (
      <div className="article-list">
        { itemsRender }
      </div>
    );
  }
}

ArticleList.propTypes = {
  items: PropTypes.array.isRequired,
  onItemSelected: PropTypes.func.isRequired,
};

export default ArticleList;
