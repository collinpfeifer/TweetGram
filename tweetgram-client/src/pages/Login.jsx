import React, { useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
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

const Login = (props) => {
  const context = useContext(AuthContext);
  const classes = useStyles();

  const { onChange, onSubmit, values, errors } = useForm(loginUserCallback, {
    username: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, {data: {login}}) {
      context.login(login);
      props.history.push('/');
    },
    onError(e) {
      console.log(e);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
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
            Sign In
          </Typography>
          <form className={classes.form} onSubmit={onSubmit} >
            <Grid container spacing={2}>
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
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}>
              Sign In
            </Button>
            <Grid container justify='flex-end'></Grid>
          </form>
        </div>
      )}
    </Container>
  );
};

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      id
      createdAt
      token
    }
  }
`;

export default Login;
