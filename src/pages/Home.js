import React, { useEffect } from 'react';
import Navvar from '../features/nav/Navvar';
import Produlist from '../features/product/component/Produlist';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartByUserIdAsync } from '../features/cart/cartSlice';
import { fetchLoginUserInfoAsync } from '../features/user/userSlice';
import Footer from '../features/common/Footer';
import {
  checkAlreadyLoggedAsync,
  selectLoggedinUser,
} from '../features/auth/authSlice';

function Home() {
  const dispatch = useDispatch();
  const users = useSelector(selectLoggedinUser);
  useEffect(() => {
    dispatch(checkAlreadyLoggedAsync());
  }, [dispatch]);
  useEffect(() => {
    if (users) {
      dispatch(fetchCartByUserIdAsync());
      dispatch(fetchLoginUserInfoAsync());
    }
  }, [dispatch, users]);
  return (
    <div>
      <Navvar>
        <Produlist />
      </Navvar>
      <Footer />
    </div>
  );
}

export default Home;
