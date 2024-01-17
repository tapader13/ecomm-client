import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchLoggedInUserOrdersAsync,
  selectUserInfo,
  selectUserOrders,
} from '../userSlice';
export default function UserOrders() {
  const orders = useSelector(selectUserOrders);
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, [dispatch]);
  console.log(orders);
  return (
    <div>
      {orders.map((order) => (
        <div className='mx-auto my-10 py-3 bg-white max-w-7xl px-4 sm:px-6 lg:px-8'>
          <h3 className='text-3xl ml-7 py-3 font-bold tracking-tight text-gray-900'>
            Order #{order.id}
          </h3>
          <h1 className='text-3xl ml-7 py-3 font-bold tracking-tight text-red-900'>
            order status: {order.status}
          </h1>
          <div className=' border-gray-200 px-4 py-6 sm:px-6'>
            <div className='flow-root'>
              <ul role='list' className='-my-6 divide-y divide-gray-200'>
                {order.products.map((pro) => (
                  <li key={pro.id} className='flex py-6'>
                    <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                      <img
                        src={pro.product.thumbnail}
                        alt={pro.product.title}
                        className='h-full w-full object-cover object-center'
                      />
                    </div>

                    <div className='ml-4 flex flex-1 flex-col'>
                      <div>
                        <div className='flex  justify-between text-base font-medium text-gray-900'>
                          <h3>
                            <p className='font-bold text-lg  '>
                              {pro.product.title}
                            </p>
                            <p className='text-gray-500'>{pro.product.brand}</p>
                          </h3>
                          <p className='ml-4 font-bold'>${pro.product.price}</p>
                        </div>
                        <p className='mt-1 text-sm text-gray-500'>
                          {pro.product.color}
                        </p>
                      </div>
                      <div className='flex  flex-1 items-end justify-between text-sm'>
                        <div>
                          <label
                            htmlFor='quantity'
                            className='inline  font-bold mr-4 text-xl  leading-6 text-gray-500'
                          >
                            Qty{' '}
                            <span className=' text-black font-normal'>
                              {pro.quantity}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className='border-t border-gray-200 pt-4 sm:pt-6'>
            <div className='flex font-bold justify-between text-base  text-gray-900'>
              <p>Subtotal</p>
              <p>$ {order.totalAmount}</p>
            </div>
            <div className='flex font-bold justify-between text-base  text-gray-900'>
              <p>Total Items In Cart</p>
              <p>{order.totalItemsInCart} items</p>
            </div>
            <p className='my-0.5 text-sm text-gray-500'>Shipping Address: </p>
          </div>
          <li className='flex mb-4 border border-dashed border-1 border-gray-400 justify-between gap-x-6 py-1 px-6'>
            <div className='flex min-w-0 gap-x-4'>
              <div className='min-w-0 flex-auto'>
                <p className='text-sm font-semibold leading-6 text-gray-900'>
                  {order.selectedAddress.name}
                </p>
                <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                  {order.selectedAddress.email}
                </p>
                <p className='text-sm leading-6 text-gray-500'>
                  {order.selectedAddress.upazila}
                </p>
              </div>
            </div>
            <div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
              <p className='text-sm leading-6 text-gray-900'>
                Phone: {order.selectedAddress.phone}
              </p>
              <p className='text-sm leading-6 text-gray-500'>
                {order.selectedAddress.postalcode}
              </p>
              <p className='text-sm leading-6 text-gray-500'>
                {order.selectedAddress.city}
              </p>
            </div>
          </li>
        </div>
      ))}
    </div>
  );
}
