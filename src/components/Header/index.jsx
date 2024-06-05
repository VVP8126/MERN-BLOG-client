import React from 'react';
import { Button } from '@mui/material';
import { Container } from '@mui/material';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  const isAuthorized = false;
  const onLogout = () => {
    alert('LOGOUT');
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to={'/'}>
            <div>MERN APPLICATION</div>
          </Link>
          <div className={styles.buttons}>
            {isAuthorized ? (
              <>
                <Link to={'/posts/create'}>
                  <Button variant="contained">NEW POST</Button>{' '}
                </Link>
                <Button variant="contained" onClick={onLogout} color="error">
                  LOGOUT
                </Button>
              </>
            ) : (
              <>
                <Link to={'/login'}>
                  <Button variant="outlined">LOGIN</Button>{' '}
                </Link>
                <Link to={'/register'}>
                  <Button variant="contained">REGISTER</Button>{' '}
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
