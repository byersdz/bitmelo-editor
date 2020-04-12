
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/Button/Button';

import './ProjectItem.scss';

const ProjectItem = props => {
  const {
    project,
    onSelect,
    onDelete,
  } = props;


  return (
    <div className="project-item">
      <Button
        className="select-btn"
        click={ () => onSelect( project ) }
      >
        { project.name }
      </Button>
      <Button
        className="delete-btn"
        click={ () => onDelete( project ) }
      >
        Delete
      </Button>
    </div>
  );
};

ProjectItem.propTypes = {
  project: PropTypes.shape( {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  } ).isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProjectItem;
