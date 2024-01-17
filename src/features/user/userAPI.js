export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) => {
    const response = await fetch(`/orders`);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUserInfo(userdata) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/users/${userdata.id}`, {
      method: 'PATCH',
      body: JSON.stringify(userdata),
      headers: { 'content-type': 'application/json' },
    });
    const data = response.json();
    resolve({ data });
  });
}

export function fetchLoginUserInfo() {
  return new Promise(async (resolve) => {
    const response = await fetch(`/users/own`);
    const data = await response.json();
    resolve({ data });
  });
}
