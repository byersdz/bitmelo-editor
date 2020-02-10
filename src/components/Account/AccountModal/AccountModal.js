
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Button from '../../Button/Button';

import './AccountModal.scss';

const AccountModal = props => {
  const {
    title,
    children,
    className,
    onClose,
  } = props;

  const contentClassName = `account-modal-content-container ${ className }`;

  const render = (
    <div className="account-modal-container">
      <div className={ contentClassName }>
        <div className="modal-header">
          <div className="title">
            { title }
          </div>
          <Button
            className="close-btn"
            title="close"
            hideTitle
            icon="x"
            click={ () => onClose() }
          />
        </div>
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

AccountModal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func,
};

AccountModal.defaultProps = {
  className: '',
  onClose: null,
};

export default AccountModal;
