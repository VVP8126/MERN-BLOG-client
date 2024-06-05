import React from 'react';
import { Typography, TextField, Paper, Button, Avatar } from '@mui/material';
import styles from './Registration.module.scss';

const Registration = () => {
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        REGISTER
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <TextField className={styles.field} label="Full name" fullWidth />
      <TextField className={styles.field} label="E-mail" fullWidth />
      <TextField className={styles.field} label="Password" fullWidth />
      <Button size="large" variant="contained" fullWidth>
        REGISTER
      </Button>
    </Paper>
  );
};

export default Registration;
