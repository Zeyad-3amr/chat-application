import { FC } from 'react';
import classes from './TypeField.module.css';
import { TextareaAutosize } from '@mui/material';

export interface TypeFieldProps {}

export const TypeField: FC<TypeFieldProps> = (props) => {
  return (
    <div className={classes.container}>
      <TextareaAutosize
        className={classes.typeArea}
        placeholder="Type a message"
        maxRows={3}
      />

      <button className={classes.Send}>Send</button>
    </div>
  );
};
