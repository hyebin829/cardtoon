import React, { useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';

import { useSelector, useDispatch } from 'react-redux';
import { LOAD_FAVORITES_REQUEST } from '../reducers/user';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import FollowDeleteButton from './FollowDeleteButton';

const CardBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('tabletM')]: {
    padding: '10px 70px',
  },
  [theme.breakpoints.up('tabletL')]: {
    padding: '20px 300px',
  },
  [theme.breakpoints.up('desktop')]: {
    padding: '30px 500px',
  },
}));

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
    <CardBox>
      {userFavorites
        ? userFavorites.map(x => (
            <List sx={{ width: '100%' }} key={x.id}>
              <ListItem secondaryAction={<FollowDeleteButton userid={x.id} />}>
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
    </CardBox>
  );
};

export default FollowList;
