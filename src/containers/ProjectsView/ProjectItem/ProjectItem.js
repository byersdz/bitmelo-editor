
import React from 'react';
import PropTypes from 'prop-types';

import './ProjectItem.scss';

const ProjectItem = props => {
  const { name } = props;
  return (
    <div className="project-item">
      { name }
    </div>
  );
};

ProjectItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ProjectItem;
