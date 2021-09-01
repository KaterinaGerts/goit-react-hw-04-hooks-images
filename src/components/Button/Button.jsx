import React from 'react';
import s from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ onClick }) {
  return (
    <div>
      <button className={s.LoadButton} type="button" onClick={onClick}>
        <span className={s.LoadButtonLabel}>Load more</span>
      </button>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
