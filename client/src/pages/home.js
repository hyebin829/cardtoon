import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import MenuBar from '../components/MenuBar';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import HomePostContent from '../components/HomePostContent';
import CommentList from '../components/CommentList';
import FollowButton from '../components/FollowButton';

import { LOG_OUT_REQUEST } from '../reducers/user';
import { LOAD_HOMEPOSTS_REQUEST } from '../reducers/post';

import { Box } from '@mui/system';
import { Card, CardHeader, CardContent, Button, Divider } from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { red } from '@mui/material/colors';

import {
  Toolbar,
  IconButton,
  AppBar,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Stack,
} from '@mui/material';
import LikeButton from '../components/LikeButton';
import CardtoonAppBar from '../components/CardtoonAppBar';

const EmptyPost = styled.div`
  font-size: 25px;
  margin: 80% 0;
  text-align: center;
  color: #40101d;
`;

const Home = () => {
  const dispatch = useDispatch();
  const { user, logOutDone, logInDone } = useSelector(state => state.user);
  const {
    homePosts,
    loadHomePostsLoading,
    hasMorePost,
    removeCommentLoading,
    userPost,
    nickname,
  } = useSelector(state => state.post);

  const id = useSelector(state => state.user.user?.id);

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
  }, [
    hasMorePost,
    loadHomePostsLoading,
    homePosts,
    loader,
    removeCommentLoading,
    nickname,
  ]);

  return (
    <>
      <CardtoonAppBar />
      <Box sx={{ mb: '65px' }}>
        {/* 포스트 */}
        {homePosts.length !== 0 ? (
          homePosts.map((post, i) => (
            <Card
              sx={{ height: '100%', margin: '20px 5px' }}
              variant="outlined"
              key={i}
            >
              <CardHeader
                key={post.User.id}
                title={
                  <Link
                    to={`/userprofile/${post.User.id}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    {post.User.nickname}
                  </Link>
                }
                avatar={
                  <Link to={`/userprofile/${post.User.id}`} key={post.User.id}>
                    <Avatar
                      sx={{ bgcolor: red[500] }}
                      aria-label="profilepic"
                      src={`http://localhost:3065/${post.User.profileimagesrc}`}
                    />
                  </Link>
                }
                action={
                  <FollowButton post={post} key={`FollowButton${post.id}`} />
                }
              />
              <CardContent key={post.id}>
                <HomePostContent
                  sx={{ whiteSpace: 'normal' }}
                  post={post}
                  key={post.id}
                />
              </CardContent>
              <Divider variant="middle" />
              <LikeButton post={post} key={`LikeButton${post.id}`} />
              <CommentList post={post} key={`CommentList${post.id}`} />
            </Card>
          ))
        ) : (
          <EmptyPost>작성된 게시글이 없습니다.</EmptyPost>
        )}
        <div ref={hasMorePost && !loadHomePostsLoading ? loader : undefined} />
      </Box>
      <MenuBar />
    </>
  );
};

export default Home;
