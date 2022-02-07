import React, { useCallback, useEffect, useState } from 'react';
import { Route, Link, Navigate } from 'react-router-dom';
import LoginPage from './login';
import MenuBar from '../components/MenuBar';
import { useDispatch, useSelector } from 'react-redux';

import HomePostForm from '../components/HomePostForm';
import HomePostContent from '../components/HomePostContent';

import { LOG_OUT_REQUEST } from '../reducers/user';
import { LOAD_HOMEPOSTS_REQUEST } from '../reducers/post';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import PostImage from '../components/HomePostImage';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';

const Home = () => {
  const dispatch = useDispatch();
  const { user, logOutDone } = useSelector(state => state.user);
  const { homePosts, loadHomePostsLoading, hasMorePost } = useSelector(
    state => state.post
  );

  useEffect(() => {
    if (logOutDone) {
      Navigate('/');
    }
  }, [logOutDone]);

  useEffect(() => {
    dispatch({
      type: LOAD_HOMEPOSTS_REQUEST,
    });
  }, []);

  useEffect(() => {}, [hasMorePost, loadHomePostsLoading]);

  const onLogout = useCallback(() => {
    try {
      dispatch({
        type: LOG_OUT_REQUEST,
      });
    } catch (error) {
      console.error(error);
    }
  });
  console.log(homePosts);

  return (
    <>
      <Link to="/profile">프로필</Link>
      <button onClick={onLogout}>로그아웃</button>

      <MenuBar />
      {homePosts.map(post => (
        <Card sx={{ height: '100%' }}>
          <CardHeader
            title="아이디"
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
          />
          <PostImage />
          <CardContent>
            <HomePostContent post={post} key={post.id} />
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default Home;
