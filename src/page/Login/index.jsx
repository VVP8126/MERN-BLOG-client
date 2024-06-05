import React from 'react';
import { Typography, TextField, Paper, Button } from '@mui/material';
import styles from './Login.module.scss';

const Login = () => {
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        LOGIN
      </Typography>
      <TextField
        className={styles.field}
        label="E-MAIL ..."
        error
        helperText="Wrong e-mail"
        fullWidth
      />
      <TextField className={styles.field} label="password" fullWidth />
      <Button size="large" variant="contained" fullWidth>
        LOGIN
      </Button>
    </Paper>
  );
};

export default Login;
