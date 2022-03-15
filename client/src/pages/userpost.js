import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MainMenu from '../components/MenuBar';

import { LOAD_USER_POST_REQUEST } from '../reducers/post';
import Carousel from 'react-material-ui-carousel';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Avatar,
} from '@mui/material';

import styled from 'styled-components';
import HomePostContent from '../components/HomePostContent';
import LikeButton from '../components/LikeButton';
import CommentList from '../components/CommentList';

const UserpostPage = () => {
  const params = useParams();
  console.log(params);
  const id = params.id;
  const { userPost } = useSelector(state => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_USER_POST_REQUEST,
      data: params.id,
    });
  }, [id]);
  console.log(userPost);
  const oneUserPost = userPost[0];

  return (
    <>
      {/* <Card sx={{ height: '100%', margin: '20px 5px' }} variant="outlined">
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
        <CardContent>
          <HomePostContent post={oneUserPost} />
        </CardContent>
        <Divider variant="middle" />
        <LikeButton post={oneUserPost} />
        <CommentList post={oneUserPost} />
      </Card>
      <MainMenu /> */}
    </>
  );
};

export default UserpostPage;
