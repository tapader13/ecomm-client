import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import CheckOut from './pages/CheckOut';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Protected from './features/auth/components/Protected';
import PageNotFound from './pages/404';
import OrderSuccess from './pages/OrderSuccess';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import Logout from './features/auth/components/Logout';
import ForgotPassPage from './pages/ForgotPassPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
import AdminProFormPage from './pages/AdminProFormPage';
import AdminPrDtlsPage from './pages/AdminPrDtlsPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkAlreadyLoggedAsync,
  selectCkededUser,
  selectLoggedinUser,
} from './features/auth/authSlice';
import { fetchCartByUserIdAsync } from './features/cart/cartSlice';
import { fetchLoginUserInfoAsync } from './features/user/userSlice';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/cart',
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: '/checkout',
    element: (
      <Protected>
        <CheckOut />
      </Protected>
    ),
  },
  {
    path: '/product-details/:id',
    element: (
      <Protected>
        <ProductDetailsPage />
      </Protected>
    ),
  },
  {
    path: '/order-success/:id',
    element: <OrderSuccess />,
  },
  {
    path: '/orders',
    element: (
      <Protected>
        <UserOrdersPage />
      </Protected>
    ),
  },

  {
    path: '/profile',
    element: (
      <Protected>
        <UserProfilePage />
      </Protected>
    ),
  },
  {
    path: '/logout',
    element: (
      <Protected>
        <Logout />
      </Protected>
    ),
  },

  {
    path: '/forgot-password',
    element: <ForgotPassPage />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedAdmin>
        <AdminHome />
      </ProtectedAdmin>
    ),
  },
  {
    path: '/product-form',
    element: (
      <ProtectedAdmin>
        <AdminProFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: '/product-form/edit/:id',
    element: (
      <ProtectedAdmin>
        <AdminProFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: 'admin/product-details/:id',
    element: (
      <ProtectedAdmin>
        <AdminPrDtlsPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: 'admin/orders',
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const users = useSelector(selectLoggedinUser);
  const chk = useSelector(selectCkededUser);
  useEffect(() => {
    if (users) {
      dispatch(fetchCartByUserIdAsync());
      dispatch(fetchLoginUserInfoAsync());
    }
  }, [dispatch, users, chk]);
  useEffect(() => {
    dispatch(checkAlreadyLoggedAsync());
  }, [dispatch]);
  return (
    <div className='App'>
      {chk && (
        <div>
          <RouterProvider router={router} />
          <ToastContainer />
        </div>
      )}
    </div>
  );
}

export default App;
