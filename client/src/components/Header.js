import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import styles from './header.module.scss';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { LOG_OUT_REQUEST } from '../reducers/user';
import GNB from './GNB';

function Header() {
  const navigate = useNavigate();

  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const { user, logOutDone } = useSelector(state => state.user);

  useEffect(() => {
    if (logOutDone) {
      Navigate('/');
    }
  }, [logOutDone]);

  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsShowDropdown(prev => !prev);
  };

  const onLogout = useCallback(() => {
    try {
      dispatch({
        type: LOG_OUT_REQUEST,
      });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, navigate]);

  return (
    <header>
      <Link to="/">
        <img
          className={styles.titleImage}
          src={require('../Assets/Images/cardtoontitle.png')}
          alt="cardtoon title"
        />
      </Link>
      <GNB />
      <button onClick={toggleDropdown} aria-label="profilepic">
        {user?.profileimagesrc === null ? (
          <AccountCircleIcon sx={{ width: 40, height: 40 }} />
        ) : (
          <img src={`/api/${user?.profileimagesrc}`} alt="profile picture" />
        )}
      </button>
      {isShowDropdown && (
        <ul>
          <li>
            <Link
              to="/profile"
              style={{
                textDecoration: 'none',
                color: 'black',
              }}
            >
              <button type="button" className={styles.iconMenuButton}>
                프로필
              </button>
            </Link>
          </li>
          <li>
            <button
              type="button"
              className={styles.iconMenuButton}
              onClick={onLogout}
            >
              로그아웃
            </button>
          </li>
        </ul>
      )}
    </header>
  );
}

export default Header;
