import React, { useEffect, useState } from 'react';
import {
  XMarkIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllOrderAsync,
  selectAllOrder,
  selectTotalOrderCount,
  updateOrderStatusAsync,
} from '../../order/orderSlice';
import { LIMIT_PAR_PAGE } from '../../../app/constant';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
function AdminOrders() {
  const [page, setPage] = useState(1);
  const [ordView, setOrdView] = useState(-1);
  const [sort, setSort] = useState({});

  const dispatch = useDispatch();
  const allOrders = useSelector(selectAllOrder);
  const totalOrderCount = useSelector(selectTotalOrderCount);

  const handleOrderView = (id) => {
    setOrdView(id);
  };
  //   console.log(ordView);
  const handleStatus = (status, ord) => {
    console.log(status);
    const newOrd = { ...ord, status: status };
    dispatch(updateOrderStatusAsync(newOrd));
    setOrdView(-1);
    // console.log(newOrd);
  };
  const statusColor = (status) => {
    if (status === 'delivered') {
      return 'bg-green-200 text-green-600';
    } else if (status === 'pending') {
      return 'bg-purple-200 text-purple-600';
    } else if (status === 'dispatched') {
      return 'bg-yellow-200 text-yellow-600';
    } else if (status === 'cancelled') {
      return 'bg-red-200 text-red-600';
    }
  };
  const handleSort = (option) => {
    const newsort = { _sort: option.sort, _order: option.order };
    setSort(newsort);
    // console.log(option);
  };
  const handlePage = (p) => {
    // console.log(p);
    setPage(p);
  };
  //   console.log(sort);
  useEffect(() => {
    const pagi = { _page: page, _limit: LIMIT_PAR_PAGE };
    dispatch(fetchAllOrderAsync({ pagi, sort }));
    console.log({ pagi, sort });
  }, [page, dispatch, sort]);
  //   useEffect(() => {
  //     setPage(1);
  //   }, [totalOrderCount]);

  return (
    <div>
      <div className='overflow-x-auto'>
        <div className=' bg-gray-100 flex items-center justify-center font-sans overflow-hidden'>
          <div className='w-full '>
            <div className='bg-white shadow-md rounded mt-6'>
              <table className='min-w-max w-full table-auto'>
                <thead>
                  <tr className='bg-gray-200 cursor-pointer text-gray-600 uppercase text-sm leading-normal'>
                    <th
                      onClick={(e) =>
                        handleSort({
                          sort: '_id',
                          order: sort._order === 'asc' ? 'desc' : 'asc',
                        })
                      }
                      className='py-3 px-6 text-left'
                    >
                      Order Number{' '}
                      {sort?._sort === '_id' && sort._order === 'asc' ? (
                        <ArrowUpIcon className='h-4 w-4 inline'></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className='h-4 w-4 inline'></ArrowDownIcon>
                      )}
                    </th>
                    <th className='py-3 px-6 text-left'>Items</th>
                    <th
                      onClick={(e) =>
                        handleSort({
                          sort: 'totalAmount',
                          order: sort._order === 'asc' ? 'desc' : 'asc',
                        })
                      }
                      className='py-3 px-6 text-center'
                    >
                      Total Amount{' '}
                      {sort?._sort === 'totalAmount' &&
                      sort._order === 'asc' ? (
                        <ArrowUpIcon className='h-4 w-4 inline'></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className='h-4 w-4 inline'></ArrowDownIcon>
                      )}
                    </th>
                    <th className='py-3 px-6 text-center'>Shipping Address</th>
                    <th className='py-3 px-6 text-center'>Status</th>
                    <th className='py-3 px-6 text-center'>Actions</th>
                  </tr>
                </thead>
                <tbody className='text-gray-600 text-sm font-light'>
                  {allOrders.map((ord, i) => (
                    <tr className='border-b border-gray-200 hover:bg-gray-100'>
                      <td className='py-3 px-6 text-left whitespace-nowrap'>
                        <div className='flex items-center'>
                          <div className='mr-2'>{ord.id}</div>
                        </div>
                      </td>
                      <td className='py-3 px-6 text-left'>
                        <div className='flex  flex-col text-left'>
                          {ord.products.map((prd, i) => (
                            <div className=' flex'>
                              <div className='mr-3'>
                                {' '}
                                <img
                                  className='w-6 h-6 rounded-full'
                                  src={prd.product.thumbnail}
                                />
                              </div>
                              <div className='mr-3'>{prd.title}</div>
                              <div className='mr-3'>#{prd.quantity}</div>
                              <div className='mr-3'>${prd.product.price}</div>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className='py-3 px-6 text-center'>
                        <div className='flex items-center justify-center'>
                          $ {ord.totalAmount}
                        </div>
                      </td>
                      <td className='py-3 px-6 text-center'>
                        <div className='flex items-center justify-center'>
                          <div>
                            <div className='mr-3'>
                              {ord.selectedAddress.name},
                            </div>
                            <div className='mr-3'>
                              {ord.selectedAddress.email},
                            </div>
                            <div className='mr-3'>
                              {ord.selectedAddress.city},
                            </div>{' '}
                            <div className='mr-3'>
                              {ord.selectedAddress.phone},
                            </div>
                            <div className='mr-3'>
                              {ord.selectedAddress.upazila},
                            </div>
                            <div className='mr-3'>
                              {ord.selectedAddress.postalcode}
                            </div>{' '}
                          </div>
                        </div>
                      </td>
                      <td className='py-3 px-6 text-center'>
                        {ord.id === ordView ? (
                          <select
                            name=''
                            defaultValue=''
                            id=''
                            onChange={(e) => handleStatus(e.target.value, ord)}
                          >
                            <option value='' disabled>
                              Change status
                            </option>
                            <option value='dispatched'>dispatched</option>
                            <option value='delivered'>delivered</option>
                            <option value='cancelled'>cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`${statusColor(
                              ord.status
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {ord.status}
                          </span>
                        )}
                      </td>
                      <td className='py-3 px-6 text-center'>
                        <div className='flex item-center justify-center'>
                          <div
                            onClick={(e) => handleOrderView(ord.id)}
                            className='w-6 mr-2 transform hover:text-purple-500 hover:scale-110'
                          >
                            <EyeIcon />
                          </div>
                          <div className='w-6 mr-2 transform hover:text-purple-500 hover:scale-110'>
                            <PencilIcon />
                          </div>
                          <div className='w-6 mr-2 transform hover:text-purple-500 hover:scale-110'>
                            <TrashIcon />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          handlePage={handlePage}
          totalOrderCount={totalOrderCount}
        ></Pagination>
      </div>
    </div>
  );
}
function Pagination({ page, setPage, totalOrderCount, handlePage }) {
  const totalPage = Math.ceil(totalOrderCount / LIMIT_PAR_PAGE);
  return (
    <>
      <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'>
        <div className='flex flex-1 justify-between sm:hidden'>
          <div
            onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
            className='relative cursor-pointer inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
          >
            Previous
          </div>
          <div
            onClick={(e) => handlePage(page < totalPage ? page + 1 : page)}
            className='relative cursor-pointer ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
          >
            Next
          </div>
        </div>
        <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
          <div>
            <p className='text-sm text-gray-700'>
              Showing{' '}
              <span className='font-medium'>
                {(page - 1) * LIMIT_PAR_PAGE + 1}
              </span>{' '}
              to{' '}
              <span className='font-medium'>
                {page * LIMIT_PAR_PAGE > totalOrderCount
                  ? totalOrderCount
                  : page * LIMIT_PAR_PAGE}
              </span>{' '}
              of <span className='font-medium'>{totalOrderCount}</span> results
            </p>
          </div>
          <div>
            <nav
              className='isolate inline-flex -space-x-px rounded-md shadow-sm'
              aria-label='Pagination'
            >
              <div
                onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
                className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
              >
                <span className='sr-only'>Previous</span>
                <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
              </div>

              {Array.from({
                length: totalPage,
              }).map((el, ind) => (
                <div
                  onClick={(e) => handlePage(ind + 1)}
                  aria-current='page'
                  className={`relative cursor-pointer z-10 inline-flex items-center ${
                    ind + 1 === page ? 'bg-indigo-600 text-white' : ''
                  }  px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {ind + 1}
                </div>
              ))}

              <div
                onClick={(e) => handlePage(page < totalPage ? page + 1 : page)}
                className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
              >
                <span className='sr-only'>Next</span>
                <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminOrders;
