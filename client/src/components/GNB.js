import React from 'react';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import styles from './gnb.module.scss';

import {
  AiOutlineFire,
  AiOutlineEdit,
  AiOutlineUser,
  AiOutlineStar,
} from 'react-icons/ai';

const GNB = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/popularcardtoon"
            className={({ isActive }) => cx({ [styles.isActive]: isActive })}
          >
            <span>
              <AiOutlineFire />
            </span>
            <p>인기툰</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/uploadpost"
            className={({ isActive }) => cx({ [styles.isActive]: isActive })}
          >
            <span>
              <AiOutlineEdit />
            </span>
            <p>글쓰기</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => cx({ [styles.isActive]: isActive })}
          >
            <span>
              <AiOutlineUser />
            </span>
            <p>프로필</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favorites"
            className={({ isActive }) => cx({ [styles.isActive]: isActive })}
          >
            <span>
              <AiOutlineStar />
            </span>
            <p>즐겨찾기</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default GNB;
