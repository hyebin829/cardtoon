import React, { useCallback, useEffect, useState } from 'react';
import { Route, Link, Navigate } from 'react-router-dom';
import LoginPage from './login';
import Menu from '../components/Menu';
import { useDispatch } from 'react-redux';

import HomePostForm from '../components/HomePostForm';
import HomePostContent from '../components/HomePostContent';

import { LOG_OUT_REQUEST } from '../reducers/user';
import { LOAD_HOMEPOSTS_REQUEST } from '../reducers/post';
import { useSelector } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const { user, logOutDone } = useSelector(state => state.user);
  const { homePosts, loadHomePostsLoading } = useSelector(state => state.post);

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
      <div>Home입니다</div>
      <Link to="/profile">프로필</Link>

      <button onClick={onLogout}>로그아웃</button>
      <HomePostForm></HomePostForm>
      {homePosts.map(post => (
        <HomePostContent post={post} />
      ))}

      <Menu />
    </>
  );
};

export default Home;
