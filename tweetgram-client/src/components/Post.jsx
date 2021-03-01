import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: 400,
      backgroundColor: 'gray',
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
  })
);

const Post = ({
  post: {
    id,
    body,
    createdAt,
    username,
    likeCount,
    likes,
    commentCount,
    comments,
  },
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const likePost = () => {
    console.log('liked');
  }
  const commentOnPost = () => {

  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}>
            {username.charAt(0).toUpperCase()}
          </Avatar>
        }
        style={{ textDecoration: 'none', color: 'black' }}
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        component={Link}
        to={`/posts/${id}`}
        title={username}
        subheader={`${moment(createdAt).fromNow(true)} and ${`${likeCount} likes`}`}
      />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites' onClick={likePost}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label='share' onClick={commentOnPost}>
          <ShareIcon />
        </IconButton>
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
          {comments.map((comment) => {
            return <Typography paragraph>{comment.body}</Typography>;
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Post;
