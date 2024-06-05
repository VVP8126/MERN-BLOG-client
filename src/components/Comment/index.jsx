import React from 'react';
import { TextField, Avatar, Button } from '@mui/material';
import styles from './Comment.module.scss';

const Comment = () => {
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField label="Write comment" variant="outlined" maxRows={10} multiline fullWidth />
          <Button variant="contained">SAVE</Button>
        </div>
      </div>
    </>
  );
};

export default Comment;
