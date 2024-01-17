// A mock function to mimic making an async request for data
export function fetchProduct() {
  return new Promise(async (resolve) => {
    const response = await fetch('/products');
    const data = response.json();
    console.log(data);
    resolve({ data });
  });
}

export function fetchProductByFilter(filter, sort, pagi, admin) {
  let filterUrl = '';
  for (let key in filter) {
    let filterValues = filter[key];
    if (filterValues.length > 0) {
      let lastFilterValue = filterValues[filterValues.length - 1];
      filterUrl += `${key}=${lastFilterValue}&`;
    }
  }
  for (let key in sort) {
    filterUrl += `${key}=${sort[key]}&`;
  }
  for (let key in pagi) {
    filterUrl += `${key}=${pagi[key]}&`;
  }
  if (admin) {
    filterUrl += `admin=true`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch('/products?' + filterUrl);
    const data = await response.json();
    const totalItems = response.headers.get('X-Total-Count');
    resolve({ data: { products: data, totalItems: totalItems } });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch('/brands');
    const data = response.json();
    resolve({ data });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch('/categories');
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch('/products/' + id);
    const data = await response.json();
    resolve({ data });
  });
}

export function createProduct(productInfo) {
  return new Promise(async (resolve) => {
    const response = await fetch('/products', {
      method: 'POST',
      body: JSON.stringify(productInfo),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function productUpdate(product) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/products/${product.id}`, {
      method: 'PATCH',
      body: JSON.stringify(product),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}
