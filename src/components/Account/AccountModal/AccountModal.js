
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
    showBackButton,
    onBack,
  } = props;

  const contentClassName = `account-modal-content-container ${ className }`;

  const backButtonRender = showBackButton ? (
    <Button
      className="back-btn"
      title="back"
      hideTitle
      icon="back"
      click={ () => onBack() }
    />
  ) : null;

  const render = (
    <div className="account-modal-container">
      <div className={ contentClassName }>
        <div className="modal-header">
          { backButtonRender }
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
  showBackButton: PropTypes.bool,
  onBack: PropTypes.func,
};

AccountModal.defaultProps = {
  className: '',
  onClose: null,
  showBackButton: false,
  onBack: null,
};

export default AccountModal;
