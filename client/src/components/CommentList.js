import { List, ListItem, ListItemText } from '@mui/material';
import React, { useState, useCallback } from 'react';

import { Button } from '@mui/material';
import CommentMoreButton from './CommentMoreButton';
import CommentForm from './CommentForm';
import { styled } from '@mui/material/styles';

import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';

const CommentCount = styled('div')({
  display: 'inline-block',
  verticalAlign: 'middle',
});

const CommentList = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev);
  }, []);

  return (
    post.Comments && (
      <>
        <Button
          onClick={onToggleComment}
          sx={{ minWidth: '50px', marginTop: '10px', paddingBottom: '11px' }}
          aria-label="commentlist button"
        >
          <InsertCommentOutlinedIcon sx={{ width: '100%' }} />
        </Button>
        <CommentCount>{post?.Comments?.length}</CommentCount>
        {commentFormOpened ? (
          <>
            <CommentForm post={post} />
            <List>
              {post?.Comments?.map(comment => (
                <ListItem
                  alignItems="flex-start"
                  sx={{ padding: '10px 20px' }}
                  key={`comment${comment.id}`}
                >
                  <ListItemText
                    primary={comment.User.nickname}
                    secondary={comment.content}
                  />
                  <CommentMoreButton comment={comment} />
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          ''
        )}
      </>
    )
  );
};
export default CommentList;
