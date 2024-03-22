import React from 'react';
import classes from './MyTextarea.module.css';

export default function MyTextarea(props) {
  return (
    <textarea className={classes.myTextarea} {...props} />
  );
}

