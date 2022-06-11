import { List, ListItem, ListItemText } from '@mui/material';
import React, { useState, useCallback } from 'react';

import { Button } from '@mui/material';
import CommentMoreButton from './CommentMoreButton';
import CommentForm from './CommentForm';

import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import styles from './commentList.module.scss';

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
        <div className={styles.commentCount}>{post?.Comments?.length}</div>
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
