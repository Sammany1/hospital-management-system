import React, { useId } from 'react';
import styles from './Input.module.css';

const Input = ({ label, type = 'text', placeholder, value, onChange, name, required, className }) => {
  // Use React's useId hook for stable ID generation across server and client
  const generatedId = useId();
  const inputId = name ? `input-${name}` : `input-${generatedId}`;

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
