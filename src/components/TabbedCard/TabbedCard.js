
import React from 'react';
import PropTypes from 'prop-types';

import Card from 'Components/Card/Card';
import ButtonTabs from 'Components/ButtonTabs/ButtonTabs';

import './TabbedCard.scss';

const TabbedCard = ( props ) => {
  const {
    children,
    className,
    activeTab,
    tabList,
    onTabSelect,
  } = props;
  const customClass = `tabbed-card ${ className }`;
  return (
    <Card className={ customClass }>
      <ButtonTabs
        className="top-tabs"
        buttonList={ tabList }
        activeButton={ activeTab }
        click={ onTabSelect }
      />
      <div className="card-content">
        { children }
      </div>
    </Card>
  );
};

TabbedCard.propTypes = {
  activeTab: PropTypes.string.isRequired,
  tabList: PropTypes.arrayOf( PropTypes.object ).isRequired,
  children: PropTypes.node.isRequired,
  onTabSelect: PropTypes.func.isRequired,
  className: PropTypes.string,
};

TabbedCard.defaultProps = {
  className: '',
};

export default TabbedCard;
