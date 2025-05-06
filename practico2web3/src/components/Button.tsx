import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`btn ${className || 'btn-primary'}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
