import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import styles from './AppSnackBar.module.scss';

const AppSnackbar = ({ message, open, setOpen }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      autoHideDuration={2000}
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      className={styles.width250}
    >
      <Alert onClose={handleClose} severity="error" variant="filled" className={styles.fullWidth}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
