import React from 'react';
import Navvar from '../features/nav/Navvar';
import AdminOrders from '../features/admin/component/AdminOrders';

function AdminOrdersPage() {
  return (
    <div>
      <Navvar>
        <AdminOrders />
      </Navvar>
    </div>
  );
}

export default AdminOrdersPage;
