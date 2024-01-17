import React, { useEffect } from 'react';
import Navvar from '../features/nav/Navvar';
import AdminProList from '../features/admin/component/AdminProList';

function AdminHome() {
  return (
    <div>
      <Navvar>
        <AdminProList />
      </Navvar>
    </div>
  );
}

export default AdminHome;
