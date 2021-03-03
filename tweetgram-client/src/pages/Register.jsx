import React, { useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';

import { AuthContext } from '../context';
import { useForm } from '../hooks/useForm';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = (props) => {
  const context = useContext(AuthContext);
  const classes = useStyles();

  const { onChange, onSubmit, values, errors } = useForm(registerUser, {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register } }) {
      context.login(register);
      props.history.push('/');
    },
    onError(e) {
      console.log(e);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <Container component='main' maxWidth='xs'>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='fname'
                  name='firstName'
                  variant='outlined'
                  required
                  id='firstName'
                  label='First Name'
                  value={values.firstName}
                  autoFocus
                  onChange={onChange}
                  error={errors.firstName ? true : false}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  required
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  value={values.lastName}
                  autoComplete='lname'
                  onChange={onChange}
                  error={errors.lastName ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='username'
                  label='Username'
                  name='username'
                  value={values.username}
                  onChange={onChange}
                  error={errors.username ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  value={values.email}
                  autoComplete='email'
                  onChange={onChange}
                  error={errors.email ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  value={values.password}
                  id='password'
                  autoComplete='current-password'
                  onChange={onChange}
                  error={errors.password ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='confirmPassword'
                  label='Confirm Password'
                  type='password'
                  id='confirmPassword'
                  value={values.confirmPassword}
                  autoComplete='current-password'
                  onChange={onChange}
                  error={errors.confirmPassword ? true : false}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.submit}>
              Sign Up
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link to='/login' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      )}
    </Container>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        firstName: $firstName
        lastName: $lastName
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      username
      email
      createdAt
      token
    }
  }
`;

export default Register;
