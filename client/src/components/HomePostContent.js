import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostImage from './HomePostImage';
import { useState, useCallback } from 'react';
import styled from 'styled-components';

import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Menu, MenuItem, Stack } from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import { REMOVE_POST_REQUEST } from '../reducers/post';

const ContentWrap = styled.div`
  word-break: break-word;
  padding-top: 15px;
`;

const HomePostContent = ({ post }) => {
  const dispatch = useDispatch();
  const [anchorElMyPost, setAnchorElMyPost] = useState(null);

  const id = useSelector(state => state.user.user?.id);

  const handleOpenMyPost = event => {
    setAnchorElMyPost(event.currentTarget);
  };

  const handleCloseMyPost = () => {
    setAnchorElMyPost(null);
  };

  const onRemovePost = useCallback(() => {
    if (!id) {
      return '로그인이 필요합니다.';
    }
    if (window.confirm('삭제하시겠습니까?')) {
      dispatch({
        type: REMOVE_POST_REQUEST,
        data: post.id,
      });
      alert('삭제되었습니다.');
    } else {
      return;
    }
  }, []);

  return (
    <div>
      <PostImage images={post.Images} key={post.Images.id} />
      <ContentWrap> {post.content}</ContentWrap>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse', mt: '10px' }}>
        {post.User.id === id ? (
          <Box>
            <MoreVertIcon onClick={handleOpenMyPost} />
            <Menu
              sx={{ mt: '25px' }}
              id="menu-appbar"
              anchorEl={anchorElMyPost}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElMyPost)}
              onClose={handleCloseMyPost}
            >
              <MenuItem onClick={handleCloseMyPost}>
                <Stack>
                  <Typography textAlign="left" onClick={onRemovePost}>
                    삭제
                  </Typography>
                </Stack>
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </div>
  );
};

export default HomePostContent;
