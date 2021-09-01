import React from 'react';
import Loader from 'react-loader-spinner';
import s from './Loader.module.css';

export default function Spinner() {
  return (
    <div className={s.overlay}>
      <Loader
        type="MutatingDots"
        color="#00BFFF"
        secondaryColor="#8a008a"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
      <div>Loading...</div>
    </div>
  );
}
