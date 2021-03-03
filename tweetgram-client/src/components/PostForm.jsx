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
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    marginTop: '1rem',
    width: '16rem',
  },
  post: {
    marginTop: '1.5rem',
  },
}));

const PostForm = () => {
  const classes = useStyles();

  const { values, onChange, onSubmit, errors } = useForm(createPostCallback, {
    body: '',
  });

  const [createPost] = useMutation(CREATE_POST, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = '';
    },
    variables: values,
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
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <TextField
                variant='outlined'
                required
                id='post'
                label='What do you want to say?'
                name='body'
                className={classes.input}
                onChange={onChange}
                value={values.body}
                error={errors.body ? true : false}
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

const FETCH_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default PostForm;
