
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

import './Modal.scss';

const Modal = props => {
  const {
    children,
    className,
    showHeader,
    title,
    onClose,
    noSizing,
  } = props;

  let contentClassName = 'modal-content-container';
  if ( className ) {
    contentClassName += ` ${ className }`;
  }
  if ( noSizing ) {
    contentClassName += ' no-sizing';
  }
  const headerRender = showHeader ? (
    <div className="modal-header">
      <div className="title">
        { title }
      </div>
      <Button
        title="Close"
        icon="x"
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
  showHeader: PropTypes.bool,
  className: PropTypes.string,
  title: PropTypes.string,
  onClose: PropTypes.func,
  noSizing: PropTypes.bool,
};

Modal.defaultProps = {
  showHeader: false,
  className: '',
  title: '',
  onClose: null,
  noSizing: false,
};

export default Modal;
