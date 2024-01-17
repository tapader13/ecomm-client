import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import {
  deleteQuantityCartAsync,
  selectCartItems,
  selectCartLoad,
  updateQuantityCartAsync,
} from '../features/cart/cartSlice';
import { useForm } from 'react-hook-form';
import {
  createOrderAsync,
  selectCurrentOrder,
} from '../features/order/orderSlice';
import {
  selectUserInfo,
  updateUserInfoAsync,
} from '../features/user/userSlice';

function CheckOut() {
  const dispatch = useDispatch();
  const products = useSelector(selectCartItems);
  const user = useSelector(selectUserInfo);
  const cartLoad = useSelector(selectCartLoad);

  const orderPlaced = useSelector(selectCurrentOrder);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [open, setOpen] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const totalAmount = products.reduce(
    (amount, p) => p.quantity * p.product.price + amount,
    0
  );
  // console.log(userInfo, 'ckout');
  const totalItemsInCart = products.reduce((qnt, p) => qnt + p.quantity, 0);
  const handleUpdateQty = (e, p) => {
    console.log(e.target.value, p);
    dispatch(updateQuantityCartAsync({ id: p.id, quantity: +e.target.value }));
  };
  const handleDeleteCart = (e, crId) => {
    dispatch(deleteQuantityCartAsync(crId));
  };
  const handleAddresses = (e) => {
    setSelectedAddress(user.addresses[e.target.value]);
  };
  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };
  console.log(selectedAddress);
  console.log(paymentMethod);
  const handleOrderPlace = () => {
    if (selectedAddress && paymentMethod) {
      dispatch(
        createOrderAsync({
          totalAmount,
          totalItemsInCart,
          products,
          status: 'pending',
          selectedAddress,
          paymentMethod,
        })
      );
      console.log(orderPlaced);
    } else {
      alert('please add address or payment method');
    }
  };
  return (
    <>
      {!products.length && cartLoad && (
        <Navigate to={'/'} replace={true}></Navigate>
      )}
      {orderPlaced && (
        <Navigate
          to={`/order-success/${orderPlaced.id}`}
          replace={true}
        ></Navigate>
      )}
      {/* {orderPlaced && orderPlaced.paymentMethod === 'cash' && (
        <Navigate
          to={`/order-success/${orderPlaced.id}`}
          replace={true}
        ></Navigate>
      )} */}
      {/* {orderPlaced && orderPlaced.paymentMethod === 'card' && (
        <Navigate to={`/stripe-payment/`} replace={true}></Navigate>
      )} */}
      {user && (
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5'>
            <div className='lg:col-span-3 bg-white p-5 mt-11'>
              <form
                noValidate
                onSubmit={handleSubmit((data) => {
                  dispatch(
                    updateUserInfoAsync({
                      ...user,
                      addresses: [...user.addresses, data],
                    })
                  );
                  reset();
                })}
              >
                <div className='space-y-12'>
                  <div className='border-b border-gray-900/10 pb-12'>
                    <h2 className='text-base font-semibold leading-7 text-gray-900'>
                      Personal Information
                    </h2>
                    <p className='mt-1 text-sm leading-6 text-gray-600'>
                      Use a permanent address where you can receive mail.
                    </p>

                    <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                      <div className='sm:col-span-3'>
                        <label
                          htmlFor='name'
                          className='block text-sm font-medium leading-6 text-gray-900'
                        >
                          Full name
                        </label>
                        <div className='mt-2'>
                          <input
                            type='text'
                            name='name'
                            id='name'
                            {...register('name', {
                              required: 'name is requerd',
                            })}
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                          />
                        </div>
                        <p className='text-red-600'>
                          {errors.name && errors.name.message}
                        </p>
                      </div>

                      <div className='sm:col-span-4'>
                        <label
                          htmlFor='email'
                          className='block text-sm font-medium leading-6 text-gray-900'
                        >
                          Email
                        </label>
                        <div className='mt-2'>
                          <input
                            id='email'
                            name='email'
                            type='email'
                            {...register('email', {
                              required: 'email is requerd',
                            })}
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                          />
                        </div>
                        <p className='text-red-600'>
                          {errors.name && errors.name.message}
                        </p>
                      </div>

                      <div className='sm:col-span-3'>
                        <label
                          htmlFor='phone'
                          className='block text-sm font-medium leading-6 text-gray-900'
                        >
                          Phone
                        </label>
                        <div className='mt-2'>
                          <input
                            id='phone'
                            name='phone'
                            type='tel'
                            {...register('phone', {
                              required: 'phone is requerd',
                            })}
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                          />
                        </div>
                        <p className='text-red-600'>
                          {errors.phone && errors.phone.message}
                        </p>
                      </div>

                      <div className='sm:col-span-2 sm:col-start-1'>
                        <label
                          htmlFor='city'
                          className='block text-sm font-medium leading-6 text-gray-900'
                        >
                          City
                        </label>
                        <div className='mt-2'>
                          <input
                            type='text'
                            name='city'
                            id='city'
                            {...register('city', {
                              required: 'city is requerd',
                            })}
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                          />
                        </div>
                        <p className='text-red-600'>
                          {errors.city && errors.city.message}
                        </p>
                      </div>

                      <div className='sm:col-span-2'>
                        <label
                          htmlFor='upazila'
                          className='block text-sm font-medium leading-6 text-gray-900'
                        >
                          Upazila
                        </label>
                        <div className='mt-2'>
                          <input
                            type='text'
                            name='upazila'
                            id='upazila'
                            {...register('upazila', {
                              required: 'upazila is requerd',
                            })}
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                          />
                        </div>
                        <p className='text-red-600'>
                          {errors.upazila && errors.upazila.message}
                        </p>
                      </div>

                      <div className='sm:col-span-2'>
                        <label
                          htmlFor='postalcode'
                          className='block text-sm font-medium leading-6 text-gray-900'
                        >
                          Postal code
                        </label>
                        <div className='mt-2'>
                          <input
                            type='text'
                            name='postalcode'
                            id='postalcode'
                            {...register('postalcode', {
                              required: 'postalcode is requerd',
                            })}
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                          />
                        </div>
                        <p className='text-red-600'>
                          {errors.postalcode && errors.postalcode.message}
                        </p>
                      </div>
                    </div>
                    <div className='mt-6 flex items-center justify-end gap-x-6'>
                      <button
                        type='button'
                        className='text-sm font-semibold leading-6 text-gray-900'
                      >
                        Reset
                      </button>
                      <button
                        type='submit'
                        className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                      >
                        Save Address
                      </button>
                    </div>
                  </div>

                  <div className='border-b border-gray-900/10 pb-12'>
                    <h2 className='text-base font-semibold leading-7 text-gray-900'>
                      Address
                    </h2>
                    <p className='mt-1 text-sm leading-6 text-gray-600'>
                      Choose Address from Existing Anyone.
                    </p>
                    <ul role='list' className='divide-y divide-gray-100'>
                      {user.addresses.map((address, i) => (
                        <li
                          key={i}
                          className='flex justify-between gap-x-6 py-5'
                        >
                          <div className='flex min-w-0 gap-x-4'>
                            <input
                              name='addr'
                              type='radio'
                              onChange={handleAddresses}
                              value={i}
                              className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                            />
                            <div className='min-w-0 flex-auto'>
                              <p className='text-sm font-semibold leading-6 text-gray-900'>
                                {address.name}
                              </p>
                              <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                                {address.email}
                              </p>
                              <p className='text-sm leading-6 text-gray-500'>
                                {address.upazila}
                              </p>
                            </div>
                          </div>
                          <div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
                            <p className='text-sm leading-6 text-gray-900'>
                              Phone: {address.phone}
                            </p>
                            <p className='text-sm leading-6 text-gray-500'>
                              {address.postalcode}
                            </p>
                            <p className='text-sm leading-6 text-gray-500'>
                              {address.city}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className='mt-10 space-y-10'>
                      <fieldset>
                        <legend className='text-sm font-semibold leading-6 text-gray-900'>
                          Payment Methods
                        </legend>
                        <p className='mt-1 text-sm leading-6 text-gray-600'>
                          Choose anyone.
                        </p>
                        <div className='mt-6 space-y-6'>
                          <div className='flex items-center gap-x-3'>
                            <input
                              id='cash'
                              name='payments'
                              type='radio'
                              value={'cash'}
                              onChange={handlePayment}
                              checked={paymentMethod === 'cash'}
                              className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                            />
                            <label
                              htmlFor='cash'
                              className='block text-sm font-medium leading-6 text-gray-900'
                            >
                              Cash Method
                            </label>
                          </div>
                          <div className='flex items-center gap-x-3'>
                            <input
                              id='card'
                              name='payments'
                              type='radio'
                              value={'card'}
                              checked={paymentMethod === 'card'}
                              onChange={handlePayment}
                              className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                            />
                            <label
                              htmlFor='card'
                              className='block text-sm font-medium leading-6 text-gray-900'
                            >
                              Card Method
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className='lg:col-span-2'>
              <div className='mx-auto my-10 bg-white max-w-7xl px-4 sm:px-6 lg:px-8'>
                <h3 className='text-3xl ml-7 py-3 font-bold tracking-tight text-gray-900'>
                  Cart
                </h3>

                <div className=' border-gray-200 px-4 py-6 sm:px-6'>
                  <div className='flow-root'>
                    <ul role='list' className='-my-6 divide-y divide-gray-200'>
                      {products.map((pro) => (
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
                                  <p className='text-gray-500'>
                                    {pro.product.brand}
                                  </p>
                                </h3>
                                <p className='ml-4 font-bold'>
                                  ${pro.product.price}
                                </p>
                              </div>
                              <p className='mt-1 text-sm text-gray-500'>
                                {pro.product.color}
                              </p>
                            </div>
                            <div className='flex  flex-1 items-end justify-between text-sm'>
                              <div>
                                <label
                                  htmlFor='quantity'
                                  className='inline font-bold mr-4 text-xl  leading-6 text-gray-500'
                                >
                                  Qty
                                </label>
                                <select
                                  className=''
                                  onChange={(e) => handleUpdateQty(e, pro)}
                                  value={pro.quantity}
                                >
                                  <option value='1'>1</option>
                                  <option value='2'>2</option>
                                  <option value='3'>3</option>
                                  <option value='4'>4</option>
                                  <option value='5'>5</option>
                                  <option value='6'>6</option>
                                </select>
                              </div>
                              <div className='flex'>
                                <button
                                  type='button'
                                  onClick={(e) => handleDeleteCart(e, pro.id)}
                                  className='font-bold text-indigo-600 hover:text-indigo-500'
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                  <div className='flex font-bold justify-between text-base  text-gray-900'>
                    <p>Subtotal</p>
                    <p>$ {totalAmount}</p>
                  </div>
                  <div className='flex font-bold justify-between text-base  text-gray-900'>
                    <p>Total Items In Cart</p>
                    <p>{totalItemsInCart} items</p>
                  </div>
                  <p className='mt-0.5 text-sm text-gray-500'>
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className='mt-6'>
                    <div
                      onClick={handleOrderPlace}
                      className='flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-indigo-700'
                    >
                      Payment
                    </div>
                  </div>
                  <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                    <p>
                      or
                      <Link to={'/'}>
                        <button
                          type='button'
                          className='font-medium ml-2 text-indigo-600 hover:text-indigo-500'
                          onClick={() => setOpen(false)}
                        >
                          Continue Shopping
                          <span aria-hidden='true'> &rarr;</span>
                        </button>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CheckOut;
