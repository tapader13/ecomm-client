import React, { useEffect } from 'react';
import Navvar from '../features/nav/Navvar';
import UserOrders from '../features/user/components/UserOrders';
import Footer from '../features/common/Footer';
import { useDispatch, useSelector } from 'react-redux';

function UserOrdersPage() {
  const dispatch = useDispatch();

  return (
    <div>
      <>
        {' '}
        <Navvar>
          <h1 className='mx-auto text-2xl font-bold'>My Orders:-</h1>
          <UserOrders />
        </Navvar>
        <Footer />
      </>
    </div>
  );
}

export default UserOrdersPage;
