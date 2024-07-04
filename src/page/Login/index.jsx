import React from 'react';
import { Typography, TextField, Paper, Button } from '@mui/material';
import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchUserData, userIsAuthorized } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';

// Users:
// 1)   user: Fake_Email@mail.ru, pass: p1p2p4p5
// 2)   user: FakeMail@mail.ru,   pass: 1psrdCurr

const Login = () => {
  const isAuthorized = useSelector(userIsAuthorized);
  const dispatch = useDispatch();

  // Clear up - server errors handling
  const {
    register,
    handleSubmit,
    setError, // For backend validation errors handling
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { email: 'FakeMail@mail.ru', password: '1psrdCurr' },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    /** // Original variant
     * const data = await dispatch(fetchUserData(values));
     * console.log(data);
     * if (!data.payload) {
     *  return alert('Failed to authorize !');
     * }
     * if ('token' in data.payload) {
     *  window.localStorage.setItem('token', data.payload.token);
     * }
     */
    const data = await dispatch(fetchUserData(values));

    if (!data.payload) {
      setError(data.message);
      return alert('Failed to authorize !');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuthorized) {
    return <Navigate to={'/'} />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        LOGIN
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-MAIL ..."
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Fill in E-mail' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="PASSWORD"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Fill in Password' })}
          fullWidth
        />
        <Button size="large" variant="contained" fullWidth type="submit" disabled={!isValid}>
          LOGIN
        </Button>
      </form>
    </Paper>
  );
};

export default Login;
