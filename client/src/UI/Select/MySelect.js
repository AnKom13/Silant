import React from "react";
import classes from "../Select/MySelect.module.css";

export default function MySelect({ label, name, value, options, field, onChange }) {
  return (
    <div className={classes.mySelectContainer}>
      <label className={classes.label} htmlFor={name}>
        {label}:
      </label>

      <select
        className={classes.mySelect}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="">-</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}> {option[field]} </option>
        ))}
      </select>
    </div>
  );
}

