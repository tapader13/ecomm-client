import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useSelector, useDispatch } from 'react-redux';
import { createUserAsync, selectLoggedinUser } from '../authSlice';

export default function Signup() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedinUser);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <>
      {user && <Navigate to={'/'} replace={true}></Navigate>}

      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            className='mx-auto h-10 w-auto'
            src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
            alt='Your Company'
          />
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Create a new account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form
            noValidate
            onSubmit={handleSubmit((data) =>
              dispatch(
                createUserAsync({
                  email: data.email,
                  password: data.password,
                  addresses: [],
                  role: 'user',
                })
              )
            )}
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
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: 'email not valid',
                    },
                  })}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
              <p className='text-red-600'>
                {errors.email && errors.email.message}
              </p>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
                <div className='text-sm'>
                  <Link
                    to={'/forgot-password'}
                    className='font-semibold text-indigo-600 hover:text-indigo-500'
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  {...register('password', {
                    required: 'password is requered',
                    pattern: {
                      value:
                        /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g,
                      message:
                        ' password is 8 to 64 characters long and contains \n a mix of upper and lower case characters,\n one numeric and one special character',
                    },
                  })}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
              <p className='text-red-600'>
                {errors.password && errors.password.message}
              </p>
            </div>
            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='confirmPassword'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Confirm Password
                </label>
              </div>
              <div className='mt-2'>
                <input
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  {...register('confirmPassword', {
                    required: 'password not match',
                    validate: (value, formValues) =>
                      value === formValues.password || 'password not match',
                  })}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
              <p className='text-red-600'>
                {errors.confirmPassword && errors.confirmPassword.message}
              </p>
            </div>
            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Create account
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            have a account?{' '}
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
