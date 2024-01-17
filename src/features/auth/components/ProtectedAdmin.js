import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedinUser } from '../authSlice';
import { selectUserInfo } from '../../user/userSlice';

function ProtectedAdmin({ children }) {
  const user = useSelector(selectLoggedinUser);
  const userInfo = useSelector(selectUserInfo);
  if (!user) {
    return <Navigate to={'/login'}></Navigate>;
  } else if (user && userInfo.role !== 'admin') {
    return <Navigate to={'/'}></Navigate>;
  } else {
    return children;
  }
}

export default ProtectedAdmin;
