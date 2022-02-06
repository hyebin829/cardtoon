import React from 'react';
import styled from 'styled-components';
import { Router, Route, Routes, Link } from 'react-router-dom';

const Menu = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="/latestwebtoon">최신 웹툰</Link>
        </li>
        <li>
          <Link to="/popularwebtoon">인기 웹툰</Link>
        </li>
      </ul>
    </>
  );
};

export default Menu;
