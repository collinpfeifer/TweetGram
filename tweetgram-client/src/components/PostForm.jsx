import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useMutation, gql } from '@apollo/client';

import { useForm } from '../hooks/useForm';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    marginTop: '1rem',
    width: '16rem',
  },
  post: {
    margin: '1rem',
  },
}));

const PostForm = () => {
  const classes = useStyles();

  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: '',
  });

  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: values,
    update(_, result) {
      console.log(result);
      values.body = '';
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Create a Post:
        </Typography>
        <form className={classes.form} onSubmit={onSubmit} validate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                id='post'
                label='What do you want to say?'
                name='body'
                className={classes.input}
                onChange={onChange}
                value={values.body}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.post}>
            Post
          </Button>
          <Grid container justify='flex-end'></Grid>
        </form>
      </div>
    </Container>
  );
};

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
