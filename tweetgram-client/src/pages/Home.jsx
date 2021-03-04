import React, { useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Post from '../components/Post';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/container';

import { AuthContext } from '../context';
import PostForm from '../components/PostForm';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '2rem',
  },
  title: {
    margin: '2rem auto',
  },
  progress: {
    position: 'absolute',
    top: '50%',
    right: '50%'
  }
}));

const Home = () => {
  const { user } = useContext(AuthContext);
  const { data, loading } = useQuery(FETCH_POSTS_QUERY);
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid container spacing={4}>
        <Typography variant='h3' className={classes.title}>
          Recent Posts
        </Typography>
        {loading ? (
          <CircularProgress className={classes.progress}/>
        ) : (
          <Grid container item xs={12} spacing={4}>
            <Grid container justify='flex-start' alignItems='center'>
              {user && (
                <Grid item xs={12} sm={4}>
                  <PostForm />
                </Grid>
              )}
              {data &&
                data.getPosts.map((post) => {
                  return (
                    <Grid item key={post.id} xs={12} sm={4}>
                      <Post post={post} />
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

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

export default Home;
