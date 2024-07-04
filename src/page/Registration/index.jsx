import React from 'react';
import { Typography, TextField, Paper, Button, Avatar } from '@mui/material';
import styles from './Registration.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { userIsAuthorized, fetchRegister } from './../../redux/slices/auth';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

const Registration = () => {
  const isAuthorized = useSelector(userIsAuthorized);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    // setError, // For backend validation errors handling
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: 'Full Name',
      email: 'Some-Email@mail.ru',
      password: 'some_password',
    },
    mode: 'onChange',
  });
  //
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    // console.log(data);
    if (!data.payload) {
      return alert("Failed to register. Credentials didn't pass Validation !");
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
        REGISTER
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="FULL NAME"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Fill in Full Name' })}
          fullWidth
        />
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
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Fill in Password' })}
          fullWidth
        />
        <Button disabled={!isValid} size="large" variant="contained" type="submit" fullWidth>
          REGISTER
        </Button>
      </form>
    </Paper>
  );
};

export default Registration;
