
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '../Button/Button';

import { increaseModalCount, decreaseModalCount } from '../../state/Layout/modalCount';

import './Modal.scss';

class Modal extends React.Component {
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
      children,
      className,
      showHeader,
      title,
      onClose,
      noSizing,
    } = this.props;

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

    const mainRender = (
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
      mainRender,
      document.body,
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  showHeader: PropTypes.bool,
  className: PropTypes.string,
  title: PropTypes.string,
  onClose: PropTypes.func,
  noSizing: PropTypes.bool,
  _increaseModalCount: PropTypes.func.isRequired,
  _decreaseModalCount: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  showHeader: false,
  className: '',
  title: '',
  onClose: null,
  noSizing: false,
};

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _increaseModalCount: increaseModalCount,
    _decreaseModalCount: decreaseModalCount,
  }, dispatch );
}
export default connect( null, mapDispatchToProps )( Modal );
