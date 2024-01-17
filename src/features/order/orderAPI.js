export function createOrder(orderInfo) {
  return new Promise(async (resolve) => {
    const response = await fetch('/orders', {
      method: 'POST',
      body: JSON.stringify(orderInfo),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchAllOrder(pagi, sort) {
  let filterUrl = '';

  for (let key in pagi) {
    filterUrl += `${key}=${pagi[key]}&`;
  }
  for (let key in sort) {
    filterUrl += `${key}=${sort[key]}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch('/orders?' + filterUrl);
    const data = await response.json();
    const totalItems = response.headers.get('X-Total-Count');
    console.log(filterUrl, 'async');
    resolve({ data: { products: data, totalItems: totalItems } });
  });
}

export function updateOrderStatus(orderInfo) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/orders/${orderInfo.id}`, {
      method: 'PATCH',
      body: JSON.stringify(orderInfo),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}
