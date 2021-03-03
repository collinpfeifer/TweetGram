import React, { useContext, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import { Link } from 'react-router-dom';

import InfoPopover from './Popover';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import { AuthContext } from '../context';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: 400,
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
    avatar: {
      backgroundColor: red[500],
    },
    likeCount: {
      color: 'white',
      fontSize: '0.8rem',
    },
  })
);

const Post = ({
  post: { id, body, createdAt, username, likeCount, likes },
}) => {
  const { user } = useContext(AuthContext);
  const classes = useStyles();
  const [postAnchorEl, setPostAnchorEl] = useState(null);
  const [shareAnchorEl, setShareAnchorEl] = useState(null);

  const postHandleClick = (event) => {
    setPostAnchorEl(event.currentTarget);
    event.preventDefault();
  };

  const postHandleClose = () => {
    setPostAnchorEl(null);
  };

  const shareHandleClick = (event) => {
    setShareAnchorEl(event.currentTarget);
  };

  const shareHandleClose = () => {
    setShareAnchorEl(null);
  };

  return (
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
            <DeleteButton postId={id} />
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
          <InfoPopover content='Settings'>
            <IconButton onClick={postHandleClick} aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          </InfoPopover>
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
        <Menu
          id='simple-menu'
          anchorEl={shareAnchorEl}
          keepMounted
          open={Boolean(shareAnchorEl)}
          onClose={shareHandleClose}>
          <MenuItem onClick={shareHandleClose}>Share on Facebook</MenuItem>
          <MenuItem onClick={shareHandleClose}>Share on Google</MenuItem>
        </Menu>
        <InfoPopover content='Like this post'>
          <LikeButton user={user} post={{ id, likes }} />
        </InfoPopover>
        <InfoPopover content='Share this post'>
          <IconButton aria-label='share' onClick={shareHandleClick}>
            <ShareIcon />
          </IconButton>
        </InfoPopover>
        <IconButton
          className={classes.expand}
          component={Link}
          to={`/posts/${id}`}
          aria-label='show more'>
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
