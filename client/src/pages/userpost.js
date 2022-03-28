import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Avatar,
  Box,
} from '@mui/material';
import MainMenu from '../components/MenuBar';

import { LOAD_USER_POST_REQUEST } from '../reducers/post';

import HomePostContent from '../components/HomePostContent';
import LikeButton from '../components/LikeButton';
import CommentList from '../components/CommentList';
import CardtoonAppBar from '../components/CardtoonAppBar';

const CardBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('tabletM')]: {
    padding: '10px 70px',
  },
  [theme.breakpoints.up('tabletL')]: {
    padding: '20px 120px',
  },
  [theme.breakpoints.up('desktop')]: {
    padding: '30px 400px',
  },
}));

function UserpostPage() {
  const params = useParams();
  const { id } = params;
  const {
    userPost,
    removeCommentLoading,
    addCommentLoading,
    likePostLoading,
    unLikePostLoading,
    removePostLoading,
    removePostDone,
  } = useSelector(state => state.post);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(
    () =>
      dispatch({
        type: LOAD_USER_POST_REQUEST,
        data: params.id,
      }),
    [
      id,
      removeCommentLoading,
      addCommentLoading,
      likePostLoading,
      unLikePostLoading,
      removePostLoading,
      removePostDone,
    ]
  );

  useEffect(() => {
    if (removePostLoading) navigate('/profile');
  }, [removePostLoading]);

  const oneUserPost = userPost[0];

  return userPost.length !== 0 ? (
    <>
      <CardtoonAppBar />
      <CardBox sx={{ mb: '65px' }}>
        <Card
          sx={{ height: '100%', margin: '5px', padding: '10px' }}
          variant="outlined"
        >
          <CardHeader
            title={oneUserPost.User.nickname}
            avatar={
              <Avatar
                sx={{ bgcolor: 'red' }}
                aria-label="profilepic"
                src={`http://localhost:3065/${oneUserPost.User.profileimagesrc}`}
              />
            }
          />
          <Divider variant="middle" />
          <CardContent>
            <HomePostContent post={oneUserPost} />
          </CardContent>
          <Divider variant="middle" />
          <LikeButton post={oneUserPost} />
          <CommentList post={oneUserPost} />
        </Card>
        <MainMenu />
      </CardBox>
    </>
  ) : (
    ''
  );
}

export default UserpostPage;
