import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostImage from './HomePostImage';
import { styled } from '@mui/material/styles';

import { Box, Menu, MenuItem, Stack, Typography } from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import { REMOVE_POST_REQUEST } from '../reducers/post';

const ContentWrap = styled('div')(({ theme }) => ({
  wordBreak: 'break-word',
  padding: '15px 10px 0 10px',
  [theme.breakpoints.up('tabletM')]: {
    padding: '15px 20px 0 20px',
  },
  [theme.breakpoints.up('tabletL')]: {
    padding: '15px 20px 0 20px',
  },
  [theme.breakpoints.up('desktop')]: {
    padding: '15px 20px 0 20px',
  },
}));

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
      <PostImage images={post.Images} key={`image${post.Images.id}`} />
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
