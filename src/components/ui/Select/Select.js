import React from 'react';
import styles from './Select.module.css'; // We'll create this CSS module next

const Select = ({ name, id, value, onChange, options, required, placeholder }) => {
  return (
    <select
      name={name}
      id={id || name}
      value={value}
      onChange={onChange}
      required={required}
      className={styles.select}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options && options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
