
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/Button/Button';

import './ProjectItem.scss';

const ProjectItem = props => {
  const {
    name,
    id,
    onSelect,
    onDelete,
  } = props;

  return (
    <div className="project-item">
      <Button
        className="select-btn"
        click={ () => onSelect( id ) }
      >
        { name }
      </Button>
      <Button
        className="delete-btn"
        click={ () => onDelete( id ) }
      >
        Delete
      </Button>
    </div>
  );
};

ProjectItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProjectItem;
