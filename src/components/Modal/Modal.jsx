import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  onEscapeClick = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onEscapeClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscapeClick);
  }

  closeOverlay = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const modalImage = this.props.modalImage;
    return createPortal(
      <div className={s.Overlay} onClick={this.closeOverlay}>
        <div className={s.Modal}>
          <img className={s.modalImage} src={modalImage} alt="" width="500" />
        </div>
      </div>,
      modalRoot,
    );
  }
}
