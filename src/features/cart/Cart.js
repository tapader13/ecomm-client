import { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';
import { Link, Navigate } from 'react-router-dom';
import {
  deleteQuantityCartAsync,
  selectCartItems,
  selectCartLoad,
  updateQuantityCartAsync,
} from './cartSlice';
import Modal from '../common/Modal';

export default function Cart() {
  const dispatch = useDispatch();
  const products = useSelector(selectCartItems);
  const cartLoad = useSelector(selectCartLoad);
  const [open, setOpen] = useState(true);
  const [modal, setmodal] = useState(null);
  const totalAmount = products.reduce(
    (amount, p) => products && p.quantity * p.product.price + amount,
    0
  );

  const totalItemsInCart = products.reduce((qnt, p) => qnt + p.quantity, 0);
  const handleUpdateQty = (e, p) => {
    console.log(e.target.value, p);
    dispatch(updateQuantityCartAsync({ id: p.id, quantity: +e.target.value }));
  };
  const handleDeleteCart = (e, crId) => {
    dispatch(deleteQuantityCartAsync(crId));
  };
  console.log(products);
  return (
    <>
      {!products.length && cartLoad && (
        <Navigate to={'/'} replace={true}></Navigate>
      )}

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
                          <p className='text-gray-500'>{pro.product.brand}</p>
                        </h3>
                        <p className='ml-4 font-bold'>${pro.product.price}</p>
                      </div>
                      {/* <p className='mt-1 text-sm text-gray-500'>
                      {product.product.color}
                    </p> */}
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
                          // onClick={(e) => handleDeleteCart(e, product.id)}
                          onClick={(e) => setmodal(pro.id)}
                          className='font-bold text-indigo-600 hover:text-indigo-500'
                        >
                          Remove
                        </button>
                        <Modal
                          title={`${pro.product.title}`}
                          message={'Are U Sure to Dlt This Product From Cart ?'}
                          cancelOption={'Cancel'}
                          cancelAction={(e) => setmodal(null)}
                          dangerOption={'Delete'}
                          modalValue={modal === pro.id}
                          dangerAction={(e) => handleDeleteCart(e, pro.id)}
                        />
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
            <Link
              to={'/checkout'}
              className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-indigo-700'
            >
              Checkout
            </Link>
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
    </>
  );
}
