
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Button from 'Components/Button/Button';

import './Modal.scss';

const Modal = props => {
  const {
    children,
    isOpen,
    className,
    showHeader,
    title,
    onClose,
  } = props;

  if ( !isOpen ) {
    return null;
  }

  const contentClassName = `modal-content-container ${ className }`;
  const headerRender = showHeader ? (
    <div className="modal-header">
      <div className="title">
        { title }
      </div>
      <Button
        title="Close"
        icon="play"
        hideTitle
        click={ onClose }
      />
    </div>
  ) : null;

  const render = (
    <div className="modal-container">
      <div className={ contentClassName }>
        { headerRender}
        <div className="modal-content">
          { children }
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    render,
    document.body,
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  showHeader: PropTypes.bool,
  className: PropTypes.string,
  title: PropTypes.string,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  showHeader: false,
  className: '',
  title: '',
  onClose: null,
};

export default Modal;