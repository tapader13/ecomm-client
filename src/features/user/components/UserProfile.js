import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchLoggedInUserOrdersAsync,
  selectUserInfo,
  selectUserOrders,
  updateUserInfoAsync,
} from '../userSlice';
import { useForm } from 'react-hook-form';
export default function UserProfile() {
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [selectedForm, setSelectedForm] = useState(-1);
  const [newAddressForm, setNewAddressForm] = useState(false);
  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, [dispatch]);
  const handleDeleteAddress = (e, i) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(i, 1);
    dispatch(updateUserInfoAsync(newUser));
    // console.log(newUser.addresses.splice(i, 1), i);
  };
  const handleEditForm = (index) => {
    setSelectedForm(index);
    const address = user.addresses[index];
    setValue('name', address.name);
    setValue('email', address.email);
    setValue('phone', address.phone);
    setValue('city', address.city);
    setValue('upazila', address.upazila);
    setValue('postalcode', address.postalcode);
  };
  console.log(newAddressForm);
  const handleEdit = (i, data) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(i, 1, data);
    dispatch(updateUserInfoAsync(newUser));
    reset();
    setSelectedForm(-1);
  };
  const handleNewAddress = () => {
    setNewAddressForm(!newAddressForm);
    setSelectedForm(-1);
    reset();
  };
  return (
    <div>
      (
      <div className='mx-auto my-10 py-3 bg-white max-w-7xl px-4 sm:px-6 lg:px-8'>
        <h3 className='text-3xl ml-7 py-3 font-bold tracking-tight text-gray-900'>
          Name: {user.name ? user.name : 'guest'}
        </h3>
        <h1 className='text-2xl ml-7 py-3 font-bold tracking-tight text-red-900'>
          Email: {user.email}
        </h1>
        <h1 className='text-2xl ml-7 py-3 font-bold tracking-tight text-red-900'>
          {user.role === 'admin' && <span>Role: {user.role}</span>}
        </h1>
        <div className='my-3 mx-3 flex items-center justify-start gap-x-6'>
          <button
            type='button'
            onClick={handleNewAddress}
            className='rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Add New Address
          </button>
        </div>
        {newAddressForm === true ? (
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              //   handleEdit(data);
              dispatch(
                updateUserInfoAsync({
                  ...user,
                  addresses: [...user.addresses, data],
                })
              );
              reset();
              setNewAddressForm(false);
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
                    type='submit'
                    className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : null}
        {user.addresses.map((address, i) => (
          <>
            {selectedForm === i ? (
              <form
                noValidate
                onSubmit={handleSubmit((data) => {
                  handleEdit(i, data);
                  // dispatch(
                  //   updateUserInfoAsync({
                  //     ...user,
                  //     addresses: [...user.addresses, data],
                  //   })
                  // );
                  // reset();
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
                        onClick={(e) => setSelectedForm(-1)}
                        className='text-sm font-semibold leading-6 text-gray-900'
                      >
                        Cancel
                      </button>
                      <button
                        type='submit'
                        className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            ) : null}
            {selectedForm === -1 ? (
              <li
                key={i}
                className='flex text-center sm:text-left flex-col sm:flex-row mb-4 border border-dashed border-1 border-gray-400 justify-between gap-x-6 py-1 px-6'
              >
                <div className='flex min-w-0 gap-x-4'>
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
                <div className=' shrink-0 sm:flex sm:flex-col sm:items-end'>
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
                <div className='mt-6 flex sm:flex items-center justify-center gap-x-6'>
                  <button
                    type='button'
                    onClick={(e) => handleEditForm(i)}
                    className='text-sm font-semibold leading-6 text-gray-900'
                  >
                    Edit
                  </button>
                  <button
                    type='submit'
                    onClick={(e) => handleDeleteAddress(e, i)}
                    className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  >
                    Remove
                  </button>
                </div>
              </li>
            ) : null}
          </>
        ))}
      </div>
      )
    </div>
  );
}
