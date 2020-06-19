
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '../../Button/Button';

import { increaseModalCount, decreaseModalCount } from '../../../state/Layout/modalCount';

import './AccountModal.scss';

class AccountModal extends React.Component {
  componentDidMount() {
    const { _increaseModalCount } = this.props;
    _increaseModalCount();
  }

  componentWillUnmount() {
    const { _decreaseModalCount } = this.props;
    _decreaseModalCount();
  }

  render() {
    const {
      title,
      children,
      className,
      onClose,
      showBackButton,
      onBack,
    } = this.props;

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

    const mainRender = (
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
      mainRender,
      document.body,
    );
  }
}

AccountModal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func,
  showBackButton: PropTypes.bool,
  onBack: PropTypes.func,
  _increaseModalCount: PropTypes.func.isRequired,
  _decreaseModalCount: PropTypes.func.isRequired,
};

AccountModal.defaultProps = {
  className: '',
  onClose: null,
  showBackButton: false,
  onBack: null,
};

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _increaseModalCount: increaseModalCount,
    _decreaseModalCount: decreaseModalCount,
  }, dispatch );
}

export default connect( null, mapDispatchToProps )( AccountModal );
