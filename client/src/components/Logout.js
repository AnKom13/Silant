import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../authReducer';

import MyButton from '../UI/Button/MyButton';

import "../styles/Login.css"

export default function Logout() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <MyButton onClick={handleLogout}>Выход</MyButton>
  );
};

