import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Menu, MenuItem, Stack, Typography, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { REMOVE_COMMENT_REQUEST } from '../reducers/post';

const CommentMoreButton = ({ comment }) => {
  const [anchorElMyComment, setAnchorElMyComment] = useState(null);

  const dispatch = useDispatch();
  const id = useSelector(state => state.user.user?.id);

  const handleOpenMyCommentMenu = event => {
    setAnchorElMyComment(event.currentTarget);
  };

  const handleCloseMyCommentMenu = () => {
    setAnchorElMyComment(null);
  };

  const onRemoveComment = useCallback(() => {
    if (!id) {
      return '로그인이 필요합니다.';
    }
    if (window.confirm('삭제하시겠습니까?')) {
      dispatch({
        type: REMOVE_COMMENT_REQUEST,
        data: { commentId: comment.id, postId: comment.PostId },
      });
      alert('삭제되었습니다.');
    } else {
      return;
    }
  }, []);

  return (
    <>
      {comment.User.id === id ? (
        <Box>
          <MoreVertIcon onClick={handleOpenMyCommentMenu} />
          <Menu
            sx={{ mt: '25px' }}
            id="menu-appbar"
            anchorEl={anchorElMyComment}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElMyComment)}
            onClose={handleCloseMyCommentMenu}
          >
            <MenuItem onClick={handleCloseMyCommentMenu}>
              <Stack>
                <Typography textAlign="left" onClick={onRemoveComment}>
                  삭제
                </Typography>
              </Stack>
            </MenuItem>
          </Menu>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};
export default CommentMoreButton;
