import React, { useContext, useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Menu from '@material-ui/core/Menu';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import { Link } from 'react-router-dom';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

import { AuthContext } from '../context';
import InfoPopover from '../components/Popover';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '80%',
      backgroundColor: '#d3d3d3',
      marginTop: '1rem',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    likeCount: {
      color: 'white',
      fontSize: '0.8rem',
    },
    paper: {
      marginTop: theme.spacing(4),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      marginTop: '1rem',
      width: '16rem',
    },
    post: {
      marginTop: '1.5rem',
    },
    comment: {
      marginTop: '1rem',
    },
  })
);

const SinglePost = (props) => {
  const { user } = useContext(AuthContext);
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [postAnchorEl, setPostAnchorEl] = useState(null);
  const [commentAnchorEl, setCommentAnchorEl] = useState(null);
  const [comment, setComment] = useState('');
  console.log(comment);

  const postHandleClick = (event) => {
    setPostAnchorEl(event.currentTarget);
    event.preventDefault();
  };

  const postHandleClose = () => {
    setPostAnchorEl(null);
  };

  const commentHandleClick = (event) => {
    setCommentAnchorEl(event.currentTarget);
  };

  const commentHandleClose = () => {
    setCommentAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const postId = props.match.params.postId;

  const { data, loading } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [submitComment] = useMutation(COMMENT_CREATION_MUTATION, {
    update() {
      setComment('');
    },
    variables: {
      postId,
      body: comment,
    },
  });

  const deletePostCallback = () => {
    props.history.push('/');
  };

  let postMarkup;
  if (!data || loading) {
    postMarkup = <CircularProgress />;
  } else if (data.getPost) {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = data.getPost;

    postMarkup = (
      <Card className={classes.root}>
        {user && user.username === username && (
          <Menu
            id='simple-menu'
            anchorEl={postAnchorEl}
            keepMounted
            open={Boolean(postAnchorEl)}
            onClose={postHandleClose}>
            <MenuItem onClick={postHandleClose}>Edit</MenuItem>
            <MenuItem onClick={postHandleClose}>
              <DeleteButton postId={id} callback={deletePostCallback} />
            </MenuItem>
          </Menu>
        )}
        <CardHeader
          avatar={
            <Avatar aria-label='recipe' className={classes.avatar}>
              {username.charAt(0).toUpperCase()}
            </Avatar>
          }
          style={{ textDecoration: 'none', color: 'black' }}
          action={
            user &&
            user.username === username && (
              <InfoPopover content='Settings'>
                <IconButton onClick={postHandleClick} aria-label='settings'>
                  <MoreVertIcon />
                </IconButton>
              </InfoPopover>
            )
          }
          component={Link}
          to={`/posts/${id}`}
          title={username}
          subheader={`${moment(createdAt).fromNow(
            true
          )} and ${`${likeCount} likes`}`}
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {body}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <InfoPopover content='Like this post'>
            <LikeButton user={user} post={{ id, likes }} />
          </InfoPopover>
          <InfoPopover content='Share this post'>
            <IconButton aria-label='share'>
              <ShareIcon />
            </IconButton>
          </InfoPopover>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'>
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography paragraph>{`${commentCount} comments:`}</Typography>
            {user && (
              <Container component='main' maxWidth=''>
                <div className={classes.paper}>
                  <form className={classes.form}>
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <TextField
                          variant='outlined'
                          required
                          id='comment'
                          label='Write a comment'
                          name='comment'
                          className={classes.input}
                          onChange={(event) => setComment(event.target.value)}
                          value={comment}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      onClick={submitComment}
                      variant='contained'
                      color='primary'
                      className={classes.post}
                      disabled={comment.trim() === ''}>
                      Post
                    </Button>
                  </form>
                </div>
              </Container>
            )}
            {comments.map((comment) => {
              return (
                <Card className={classes.comment}>
                  <Menu
                    id='simple-menu'
                    anchorEl={commentAnchorEl}
                    keepMounted
                    open={Boolean(commentAnchorEl)}
                    onClose={commentHandleClose}>
                    <MenuItem onClick={commentHandleClose}>Edit</MenuItem>
                    <MenuItem onClick={commentHandleClose}>
                      <DeleteButton postId={id} commentId={comment.id} />
                    </MenuItem>
                  </Menu>
                  <CardHeader
                    action={
                      user &&
                      user.username === comment.username && (
                        <InfoPopover content='Settings'>
                          <IconButton
                            onClick={commentHandleClick}
                            aria-label='settings'>
                            <MoreVertIcon />
                          </IconButton>
                        </InfoPopover>
                      )
                    }
                    avatar={
                      <Avatar aria-label='recipe' className={classes.avatar}>
                        {comment.username.charAt(0).toUpperCase()}
                      </Avatar>
                    }
                    title={comment.username}
                    subheader={moment(comment.createdAt).fromNow()}
                  />
                  <Typography paragraph style={{ padding: '1rem' }}>
                    {comment.body}
                  </Typography>
                </Card>
              );
            })}
          </CardContent>
        </Collapse>
      </Card>
    );
  }
  return (
    <Grid container direction='column' justify='center' alignItems='center'>
      {postMarkup}
    </Grid>
  );
};

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
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

const COMMENT_CREATION_MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

export default SinglePost;
