import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  onClick,
  cards: { webformatURL, tags },
}) {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        onClick={onClick}
        className="ImageGalleryItem-image"
        width="200"
        height="150"
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
