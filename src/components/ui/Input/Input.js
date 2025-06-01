import React from 'react';
import styles from './Input.module.css';

const Input = ({ label, type = 'text', placeholder, value, onChange, name, required, className }) => {
  // Generate a unique ID for the input to associate the label with it
  const inputId = name ? `input-${name}-${Math.random().toString(36).substring(2, 9)}` : `input-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className={styles.inputContainer}>
      {label && <label htmlFor={inputId} className={styles.label}>{label}{required && <span className={styles.required}>*</span>}</label>}
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className={`${styles.input} ${className || ''}`}
        required={required}
      />
    </div>
  );
};

export default Input;
