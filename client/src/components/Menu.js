import React from 'react';
import styled from 'styled-components';
import { Router, Route, Routes, Link } from 'react-router-dom';

const Menu = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="/sharelist">거래/나눔</Link>
        </li>
        <li>
          <Link to="/beautylist">미용</Link>
        </li>
        <li>
          <Link to="/hospitallist">병원</Link>
        </li>
        <li>
          <Link to="/foodlist">식당/카페</Link>
        </li>
        <li>
          <Link to="/meetlist">모임</Link>
        </li>
      </ul>
    </>
  );
};

export default Menu;
