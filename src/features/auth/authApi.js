import { json } from 'react-router-dom';

// A mock function to mimic making an async request for data
export function fetchUser(formdata) {
  return new Promise(async (resolve) => {
    const response = await fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(formdata),
      headers: { 'content-type': 'application/json' },
    });
    const data = response.json();
    resolve({ data });
  });
}

export function checkUser(formdata) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: { 'content-type': 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data, 'ok');
        resolve({ data });
      } else {
        console.log('min');
        const error = await response.text();
        console.log(error.status, 'rej');
        reject(error);
      }
    } catch (error) {
      console.log('nm');

      console.log(error, 'err');
      reject(error);
    }
  });
}
export function checkAlreadyLogged() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/check');
      if (response.ok) {
        const data = await response.json();
        console.log(data, 'ok');
        resolve({ data });
      } else {
        console.log('min');
        const error = await response.text();
        console.log(error.status, 'rej');
        reject(error);
      }
    } catch (error) {
      console.log('nm');

      console.log(error, 'err');
      reject(error);
    }
  });
}

export function fetchLogout(userInfo) {
  return new Promise(async (resolve) => {
    // const response = await fetch('/users');
    // const data = response.json();
    resolve({ data: 'ok' });
  });
}
