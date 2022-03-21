import React, { useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_FAVORITES_REQUEST } from '../reducers/user';
import { Link, useParams } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { Button } from '@mui/material';
import { UNFOLLOW_REQUEST } from '../reducers/user';
import ListButton from './ListButton';

const FollowList = () => {
  const { user, userFavorites } = useSelector(state => state.user);

  const userId = user?.id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch({
        type: LOAD_FAVORITES_REQUEST,
        userId,
      });
    }
  }, [userId, user]);

  return (
    <Box>
      {userFavorites
        ? userFavorites.map(x => (
            <List sx={{ width: '100%' }} key={x.id}>
              <ListItem secondaryAction={<ListButton userid={x.id} />}>
                {x.profileimagesrc ? (
                  <Link
                    to={`/userprofile/${x.id}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <Avatar
                      src={`http://localhost:3065/${x.profileimagesrc}`}
                      sx={{ width: 50, height: 50 }}
                    />
                  </Link>
                ) : (
                  <Link
                    to={`/userprofile/${x.id}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <AccountCircleIcon sx={{ width: 50, height: 50 }} />
                  </Link>
                )}
                <Link
                  to={`/userprofile/${x.id}`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <ListItemText
                    primary={`${x.nickname}`}
                    sx={{ paddingLeft: '15px' }}
                  />
                </Link>
              </ListItem>
            </List>
          ))
        : ''}
    </Box>
  );
};

export default FollowList;
