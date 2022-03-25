import React from 'react';
import './Button.style.scss';

const Button = ({ text = 'vote', variant = 'down', ...rest }) => {
  return (
    <button className={`button button--${variant}`} {...rest}>
      {text.toUpperCase()}
    </button>
  );
};

export default Button;
