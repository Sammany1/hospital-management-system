import React from 'react';
import styles from './Textarea.module.css';

const Textarea = ({ label, name, value, onChange, placeholder, required, rows = 3 }) => {
  return (
    <div className={styles.textareaGroup}>
      {label && <label htmlFor={name} className={styles.label}>{label}{required && <span className={styles.required}>*</span>}</label>}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={styles.textarea}
      />
    </div>
  );
};

export default Textarea;
