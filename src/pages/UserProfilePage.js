import React from 'react';
import Navvar from '../features/nav/Navvar';
import UserProfile from '../features/user/components/UserProfile';
import Footer from '../features/common/Footer';

function UserProfilePage() {
  return (
    <div>
      <Navvar>
        <h1 className='mx-auto text-2xl font-bold'>My Profile:-</h1>
        <UserProfile />
      </Navvar>
      <Footer />
    </div>
  );
}

export default UserProfilePage;
