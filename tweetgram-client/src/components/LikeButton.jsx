import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors';

const LikeButton = ({ user, post: { id, likes } }) => {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likes, user]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  function clickLike() {
    if (user) {
      likePost();
    }
  }

  return (
    <div>
        {user ? (
          liked ? (
            <IconButton aria-label='add to favorites' onClick={clickLike}>
              <FavoriteIcon style={{ color: red[400] }} />
            </IconButton>
          ) : (
            <IconButton aria-label='add to favorites' onClick={clickLike}>
              <FavoriteIcon />
            </IconButton>
          )
        ) : (
          <IconButton component={Link} to='/login'>
            <FavoriteIcon />
          </IconButton>
        )}
    </div>
  );
};

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
