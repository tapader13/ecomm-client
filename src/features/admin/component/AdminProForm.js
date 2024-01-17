import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useSelector, useDispatch } from 'react-redux';

import {
  cleareSelectedProduct,
  createProductAsync,
  productByIdAsync,
  productUpdateAsync,
  selectProductById,
  selectTotalBrands,
  selectTotalCategories,
} from '../../product/productSlice';
import { Navigate, useParams } from 'react-router-dom';
import Modal from '../../common/Modal';
import { toast } from 'react-toastify';
function AdminProForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const brands = useSelector(selectTotalBrands);
  const categories = useSelector(selectTotalCategories);
  const params = useParams();
  const proDetails = useSelector(selectProductById);
  const [modal, setModal] = useState(null);
  const handleAddProduct = (data) => {
    const newData = { ...data };
    newData.images = [data.image1, data.image2, data.image3, data.image4];
    newData.rating = 0;
    newData.price = +data.price;
    delete newData['image1'];
    delete newData['image2'];
    delete newData['image3'];
    delete newData['image4'];
    console.log(newData);
    if (params.id) {
      newData.id = params.id;
      newData.rating = proDetails.rating;
      console.log(newData);
      dispatch(productUpdateAsync(newData));
    } else {
      dispatch(createProductAsync(newData));
    }
  };
  useEffect(() => {
    if (params.id) {
      dispatch(productByIdAsync(params.id));
    } else {
      dispatch(cleareSelectedProduct());
    }
  }, [params.id, dispatch]);
  useEffect(() => {
    // reset();
    if (proDetails && params.id) {
      setValue('title', proDetails.title);
      setValue('description', proDetails.description);
      setValue('price', proDetails.price);
      setValue('discountPercentage', proDetails.discountPercentage);
      setValue('stock', proDetails.stock);
      setValue('brand', proDetails.brand);
      setValue('category', proDetails.category);
      setValue('thumbnail', proDetails.thumbnail);
      setValue('image1', proDetails.images[0]);
      setValue('image2', proDetails.images[1]);
      setValue('image3', proDetails.images[2]);
      setValue('image4', proDetails.images[3]);
    } else {
      dispatch(cleareSelectedProduct());
    }
  }, [proDetails, setValue]);
  const handleProductDlt = () => {
    const newProDlts = { ...proDetails };
    newProDlts.deleted = true;
    dispatch(productUpdateAsync(newProDlts));
    toast.success('Product Info Deleted', { position: 'top-right' });
  };
  return (
    <>
      {proDetails && (
        <Modal
          title={proDetails.title}
          message={'Are U Sure to Dlt This Product ?'}
          cancelOption={'Cancel'}
          cancelAction={(e) => setModal(null)}
          dangerOption={'Delete'}
          modalValue={modal}
          dangerAction={(e) => handleProductDlt()}
        />
      )}
      <div className='mx-auto max-w-2xl  bg-white p-5  px-4 py-5 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8 lg:py-5'>
        <form
          noValidate
          onSubmit={handleSubmit((data) => handleAddProduct(data))}
        >
          <div className='space-y-12'>
            <div className='border-b border-gray-900/10 pb-12'>
              <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                <div className='sm:col-span-4'>
                  <label
                    htmlFor='tite'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Title
                  </label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                      <span className='flex select-none items-center pl-3 text-gray-500 sm:text-sm'></span>
                      <input
                        type='text'
                        {...register('title', {
                          required: 'title is requerd',
                        })}
                        name='title'
                        id='title'
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        placeholder='mackbook pro'
                      />
                    </div>
                    <p className='text-red-600'>
                      {errors.title && errors.title.message}
                    </p>
                  </div>
                </div>

                <div className='col-span-full'>
                  <label
                    htmlFor='description'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Description
                  </label>
                  <div className='mt-2'>
                    <textarea
                      id='description'
                      name='description'
                      rows={3}
                      {...register('description', {
                        required: 'description is requerd',
                      })}
                      className='block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      defaultValue={''}
                    />
                  </div>
                  <p className='text-red-600'>
                    {errors.description && errors.description.message}
                  </p>
                </div>
              </div>
            </div>

            <div className='  pb-12'>
              <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                <div className='sm:col-span-2'>
                  <label
                    htmlFor='price'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Price
                  </label>
                  <div className='mt-2'>
                    <input
                      type='number'
                      name='price'
                      id='price'
                      {...register('price', {
                        required: 'price is requerd',
                      })}
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                  <p className='text-red-600'>
                    {errors.price && errors.price.message}
                  </p>
                </div>
                <div className='sm:col-span-2'>
                  <label
                    htmlFor='discountPercentage'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Discount Percentage{' '}
                  </label>
                  <div className='mt-2'>
                    <input
                      type='number'
                      name='discountPercentage'
                      id='discountPercentage'
                      {...register('discountPercentage', {
                        required: 'discountPercentage is requerd',
                      })}
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                  <p className='text-red-600'>
                    {errors.discountPercentage &&
                      errors.discountPercentage.message}
                  </p>
                </div>

                <div className='sm:col-span-2'>
                  <label
                    htmlFor='stock'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Stock{' '}
                  </label>
                  <div className='mt-2'>
                    <input
                      type='number'
                      name='stock'
                      id='stock'
                      {...register('stock', {
                        required: 'stock is requerd',
                      })}
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                  <p className='text-red-600'>
                    {errors.stock && errors.stock.message}
                  </p>
                </div>
              </div>
            </div>
            <div className='  pb-12'>
              <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                <div className='sm:col-span-3'>
                  <label
                    htmlFor='brand'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Brand
                  </label>
                  <div className='mt-2'>
                    <select
                      name='brand'
                      id='brand'
                      {...register('brand', {
                        required: 'brand is requerd',
                      })}
                    >
                      {brands.map((brd) => (
                        <option value={brd.value}>{brd.label}</option>
                      ))}{' '}
                    </select>
                    <p className='text-red-600'>
                      {errors.brand && errors.brand.message}
                    </p>
                  </div>
                </div>
                <div className='sm:col-span-3'>
                  <label
                    htmlFor='categorie'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Category
                  </label>
                  <div className='mt-2'>
                    <select
                      name='category'
                      {...register('category', {
                        required: 'category is requerd',
                      })}
                      id='category'
                    >
                      {categories.map((ctgr) => (
                        <option value={ctgr.value}>{ctgr.label}</option>
                      ))}{' '}
                    </select>
                    <p className='text-red-600'>
                      {errors.categorie && errors.categorie.message}
                    </p>
                  </div>
                </div>

                <div className='sm:col-span-4'>
                  <label
                    htmlFor='thumbnail'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Thumbnail
                  </label>
                  <div className='mt-2'>
                    <input
                      id='thumbnail'
                      name='thumbnail'
                      type='text'
                      {...register('thumbnail', {
                        required: 'thumbnail is requerd',
                      })}
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                    <p className='text-red-600'>
                      {errors.thumbnail && errors.thumbnail.message}
                    </p>
                  </div>
                </div>
                <div className='sm:col-span-4'>
                  <label
                    htmlFor='image1'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Image 1
                  </label>
                  <div className='mt-2'>
                    <input
                      id='image1'
                      name='image1'
                      type='text'
                      {...register('image1', {
                        required: 'image1 is requerd',
                      })}
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                    <p className='text-red-600'>
                      {errors.image1 && errors.image1.message}
                    </p>
                  </div>
                </div>
                <div className='sm:col-span-4'>
                  <label
                    htmlFor='image2'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Image 2
                  </label>
                  <div className='mt-2'>
                    <input
                      id='image2'
                      name='image2'
                      type='text'
                      {...register('image2', {
                        required: 'image2 is requerd',
                      })}
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                    <p className='text-red-600'>
                      {errors.image2 && errors.image2.message}
                    </p>
                  </div>
                </div>
                <div className='sm:col-span-4'>
                  <label
                    htmlFor='image3'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Image 3
                  </label>
                  <div className='mt-2'>
                    <input
                      id='image3'
                      name='image3'
                      {...register('image3', {
                        required: 'image3 is requerd',
                      })}
                      type='text'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                    <p className='text-red-600'>
                      {errors.image3 && errors.image3.message}
                    </p>
                  </div>
                </div>
                <div className='sm:col-span-4'>
                  <label
                    htmlFor='image4'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Image 4
                  </label>
                  <div className='mt-2'>
                    <input
                      id='image4'
                      {...register('image4', {
                        required: 'image4 is requerd',
                      })}
                      name='image4'
                      type='text'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                    <p className='text-red-600'>
                      {errors.image4 && errors.image4.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='border-b border-gray-900/10 pb-12'>
              <h2 className='text-base font-semibold leading-7 text-gray-900'>
                Notifications
              </h2>
              <p className='mt-1 text-sm leading-6 text-gray-600'>
                We'll always let you know about important changes, but you pick
                what else you want to hear about.
              </p>

              <div className='mt-10 space-y-10'>
                <fieldset>
                  <legend className='text-sm font-semibold leading-6 text-gray-900'>
                    By Email
                  </legend>
                  <div className='mt-6 space-y-6'>
                    <div className='relative flex gap-x-3'>
                      <div className='flex h-6 items-center'>
                        <input
                          id='comments'
                          name='comments'
                          type='checkbox'
                          className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                        />
                      </div>
                      <div className='text-sm leading-6'>
                        <label
                          htmlFor='comments'
                          className='font-medium text-gray-900'
                        >
                          Comments
                        </label>
                        <p className='text-gray-500'>
                          Get notified when someones posts a comment on a
                          posting.
                        </p>
                      </div>
                    </div>
                    <div className='relative flex gap-x-3'>
                      <div className='flex h-6 items-center'>
                        <input
                          id='candidates'
                          name='candidates'
                          type='checkbox'
                          className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                        />
                      </div>
                      <div className='text-sm leading-6'>
                        <label
                          htmlFor='candidates'
                          className='font-medium text-gray-900'
                        >
                          Candidates
                        </label>
                        <p className='text-gray-500'>
                          Get notified when a candidate applies for a job.
                        </p>
                      </div>
                    </div>
                    <div className='relative flex gap-x-3'>
                      <div className='flex h-6 items-center'>
                        <input
                          id='offers'
                          name='offers'
                          type='checkbox'
                          className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                        />
                      </div>
                      <div className='text-sm leading-6'>
                        <label
                          htmlFor='offers'
                          className='font-medium text-gray-900'
                        >
                          Offers
                        </label>
                        <p className='text-gray-500'>
                          Get notified when a candidate accepts or rejects an
                          offer.
                        </p>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset>
                  <legend className='text-sm font-semibold leading-6 text-gray-900'>
                    Push Notifications
                  </legend>
                  <p className='mt-1 text-sm leading-6 text-gray-600'>
                    These are delivered via SMS to your mobile phone.
                  </p>
                  <div className='mt-6 space-y-6'>
                    <div className='flex items-center gap-x-3'>
                      <input
                        id='push-everything'
                        name='push-notifications'
                        type='radio'
                        className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                      <label
                        htmlFor='push-everything'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        Everything
                      </label>
                    </div>
                    <div className='flex items-center gap-x-3'>
                      <input
                        id='push-email'
                        name='push-notifications'
                        type='radio'
                        className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                      <label
                        htmlFor='push-email'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        Same as email
                      </label>
                    </div>
                    <div className='flex items-center gap-x-3'>
                      <input
                        id='push-nothing'
                        name='push-notifications'
                        type='radio'
                        className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                      <label
                        htmlFor='push-nothing'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        No push notifications
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>

          <div className='mt-6 flex items-center justify-end gap-x-6'>
            {proDetails && (
              <button
                type='button'
                onClick={(e) => setModal(true)}
                className='rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Delete
              </button>
            )}
            <button
              type='submit'
              className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AdminProForm;
