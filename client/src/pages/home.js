import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Route, Link, Navigate } from 'react-router-dom';
import LoginPage from './login';
import MenuBar from '../components/MenuBar';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import HomePostForm from '../components/HomePostForm';
import HomePostContent from '../components/HomePostContent';

import { LOG_OUT_REQUEST } from '../reducers/user';
import { LOAD_HOMEPOSTS_REQUEST } from '../reducers/post';

import { Box } from '@mui/system';
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

  const loader = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25,
    };
    const intersectHandler = entries =>
      entries.forEach(entry => {
        const lastId = homePosts[homePosts.length - 1]?.id;
        if (!entry.isIntersecting) return;
        if (entry.isIntersecting && hasMorePost && !loadHomePostsLoading) {
          dispatch({
            type: LOAD_HOMEPOSTS_REQUEST,
            lastId,
          });
        }
      });

    const observer = new IntersectionObserver(intersectHandler, options);

    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => observer && observer.disconnect();
  }, [hasMorePost, loadHomePostsLoading, homePosts, loader]);

  const onLogout = useCallback(() => {
    try {
      dispatch({
        type: LOG_OUT_REQUEST,
      });
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <Box sx={{ marginBottom: '65px' }}>
        <Link to="/profile">프로필</Link>
        <button onClick={onLogout}>로그아웃</button>
        <MenuBar />
        {homePosts.map(post => (
          <Card sx={{ height: '100%', margin: '40px 5px' }}>
            <CardHeader
              title="아이디"
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="profilepic">
                  R
                </Avatar>
              }
            />
            <CardContent>
              <HomePostContent post={post} key={post.id} />
            </CardContent>
          </Card>
        ))}
        <div ref={hasMorePost && !loadHomePostsLoading ? loader : undefined} />
      </Box>
    </>
  );
};

export default Home;
