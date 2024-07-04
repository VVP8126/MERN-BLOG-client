import React from 'react';
import { Button, Dialog, AppBar, Toolbar, IconButton, Typography, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './DeleteDialog.module.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteDialog = ({ open, handleConfirm, handleClose }) => {
  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={styles.bar} color="error">
        <Toolbar>
          <IconButton
            title="BACK"
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography className={styles.alertMessage} variant="h6" component="div">
            <p className={styles.paragraph}>THIS OPERATION WILL DELETE POST.</p>
            <p className={styles.paragraph}>YOU WILL NOT RESTORE IT !!!</p>
          </Typography>
          <Button autoFocus color="inherit" onClick={handleConfirm}>
            DELETE
          </Button>
        </Toolbar>
      </AppBar>
    </Dialog>
  );
};

export default DeleteDialog;
