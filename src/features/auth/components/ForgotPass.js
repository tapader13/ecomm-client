import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useSelector, useDispatch } from 'react-redux';
import { checkUserAsync, selectErr, selectLoggedinUser } from '../authSlice';

export default function ForgotPass() {
  const error = useSelector(selectErr);
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedinUser);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log(user, 1);
  return (
    <>
      {user && <Navigate to={'/'} replace={true}></Navigate>}
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Enter email to reset Password
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form
            noValidate
            onSubmit={handleSubmit((data) => console.log(data))}
            className='space-y-6'
          >
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email address
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
                {errors.email && errors.email.message}
              </p>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                send email{' '}
              </button>
            </div>
            <p className='text-red-600'>{error && error.message}</p>
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Back to?{' '}
            <Link
              to={'/login'}
              className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
