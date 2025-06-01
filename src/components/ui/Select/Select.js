import React from 'react';
import styles from './Select.module.css';

const Select = ({ label, name, id, value, onChange, required, placeholder, children, className }) => {
  const selectId = id || (name ? `select-${name}-${Math.random().toString(36).substring(2, 9)}` : `select-${Math.random().toString(36).substring(2, 9)}`);

  return (
    <div className={styles.selectContainer}>
      {label && <label htmlFor={selectId} className={styles.label}>{label}{required && <span className={styles.required}>*</span>}</label>}
      <select
        name={name}
        id={selectId}
        value={value}
        onChange={onChange}
        required={required}
        className={`${styles.select} ${className || ''}`}
      >
        {placeholder && !value && <option value="">{placeholder}</option>}
        {children}
      </select>
    </div>
  );
};

export default Select;
