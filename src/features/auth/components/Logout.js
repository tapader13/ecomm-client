import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogoutAsync, selectLoggedinUser } from '../authSlice';
import { Navigate } from 'react-router-dom';

function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedinUser);
  useEffect(() => {
    dispatch(fetchLogoutAsync());
  }, []);
  return (
    <div>{!user && <Navigate to={'/login'} replace={true}></Navigate>}</div>
  );
}

export default Logout;
