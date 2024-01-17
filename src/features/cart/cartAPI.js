// A mock function to mimic making an async request for data
export function addToCartItems(cartData) {
  return new Promise(async (resolve) => {
    const response = await fetch('/carts', {
      method: 'POST',
      body: JSON.stringify(cartData),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchCartByUserId() {
  return new Promise(async (resolve) => {
    const response = await fetch(`/carts`);
    const data = await response.json();
    console.log(data, 'cartapi');
    resolve({ data });
  });
}

export function updateQuantityCart(updateCart) {
  const itemId = updateCart.id;
  console.log(updateCart, itemId);
  return new Promise(async (resolve) => {
    const response = await fetch(`/carts/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify(updateCart),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteQuantityCart(cartId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/carts/${cartId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    console.log(data, 'deletequan');
    resolve({ data: { id: cartId } });
  });
}

export function clearCartAfterOrderPlaced() {
  return new Promise(async (resolve) => {
    const response = await fetchCartByUserId();
    const result = await response.data;
    console.log(result);
    for (let index = 0; index < result.length; index++) {
      await deleteQuantityCart(result[index].id);
    }
    resolve({ status: 'success' });
  });
}
