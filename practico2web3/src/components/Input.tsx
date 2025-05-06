import React from 'react';

interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ label, type, value, onChange, placeholder, className }) => {
  return (
    <div className={`form-group ${className}`}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="form-control"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
