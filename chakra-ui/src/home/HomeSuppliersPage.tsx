import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useFindOrganizations } from '../hooks/organizations/useFindOrganizations';

import HomeLayout from './HomeLayout';

const StyledDiv = styled.div`
  background-color: white;
  margin: 0 auto;
`;
const HomeSuppliersPage: React.FC = () => {
  const navigate = useNavigate();
  const { organizationList, findOrganizations } = useFindOrganizations();
  useEffect(() => {
    findOrganizations({ type: 'supplier' });
  }, []);
  return (
    <HomeLayout>
      <StyledDiv>
        <div className='w-3/4 mx-auto  bg-white '>
          <div>
            <main className='mx-auto'>
              <div className='border-b border-gray-200 pt-24 pb-10'>
                <h1 className='text-4xl font-extrabold tracking-tight text-gray-900'>
                  Browsing Suppliers
                </h1>
                <p className='mt-4 text-base text-gray-500'>
                  Checkout out the suppliers from all backgrounds and from all
                  over the world!
                </p>
              </div>
              <div className='pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4'>
                <aside>
                  <h2 className='sr-only'>Filters</h2>
                  {/* Mobile filter dialog toggle, controls the 'mobileFilterDialogOpen' state. */}
                  <button
                    type='button'
                    className='inline-flex items-center lg:hidden'
                  >
                    <span className='text-sm font-medium text-gray-700'>
                      Filters
                    </span>
                    {/* Heroicon name: solid/plus-sm */}
                    <svg
                      className='flex-shrink-0 ml-1 h-5 w-5 text-gray-400'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                  <div className='hidden lg:block'>
                    <form className='divide-y divide-gray-200 space-y-10'>
                      <div>
                        <fieldset>
                          <legend className='block text-sm font-medium text-gray-900'>
                            Certification
                          </legend>
                          <div className='pt-6 space-y-3'>
                            <div className='flex items-center'>
                              <input
                                id='color-0'
                                name='color[]'
                                defaultValue='white'
                                type='checkbox'
                                className='h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500'
                              />
                              <label
                                htmlFor='color-0'
                                className='ml-3 text-sm text-gray-600'
                              >
                                DBE
                              </label>
                            </div>
                            <div className='flex items-center'>
                              <input
                                id='color-1'
                                name='color[]'
                                defaultValue='beige'
                                type='checkbox'
                                className='h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500'
                              />
                              <label
                                htmlFor='color-1'
                                className='ml-3 text-sm text-gray-600'
                              >
                                DVBE
                              </label>
                            </div>
                            <div className='flex items-center'>
                              <input
                                id='color-2'
                                name='color[]'
                                defaultValue='blue'
                                type='checkbox'
                                className='h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500'
                              />
                              <label
                                htmlFor='color-2'
                                className='ml-3 text-sm text-gray-600'
                              >
                                8(a) Set-Aside (FAR 19.8)
                              </label>
                            </div>
                            <div className='flex items-center'>
                              <input
                                id='color-3'
                                name='color[]'
                                defaultValue='brown'
                                type='checkbox'
                                className='h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500'
                              />
                              <label
                                htmlFor='color-3'
                                className='ml-3 text-sm text-gray-600'
                              >
                                Women-Owned (WOSB)
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                      <div className='pt-10'>
                        <fieldset>
                          <legend className='block text-sm font-medium text-gray-900'>
                            Agency
                          </legend>
                          <div className='pt-6 space-y-3'>
                            <div className='flex items-center'>
                              <input
                                id='category-0'
                                name='category[]'
                                defaultValue='new-arrivals'
                                type='checkbox'
                                className='h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500'
                              />
                              <label
                                htmlFor='category-0'
                                className='ml-3 text-sm text-gray-600'
                              >
                                Department of General Services
                              </label>
                            </div>
                            <div className='flex items-center'>
                              <input
                                id='category-1'
                                name='category[]'
                                defaultValue='tees'
                                type='checkbox'
                                className='h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500'
                              />
                              <label
                                htmlFor='category-1'
                                className='ml-3 text-sm text-gray-600'
                              >
                                Depart of Fish and Wildlife
                              </label>
                            </div>
                            <div className='flex items-center'>
                              <input
                                id='category-2'
                                name='category[]'
                                defaultValue='crewnecks'
                                type='checkbox'
                                className='h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500'
                              />
                              <label
                                htmlFor='category-2'
                                className='ml-3 text-sm text-gray-600'
                              >
                                CSU Dominguez Hills
                              </label>
                            </div>
                            <div className='flex items-center'>
                              <input
                                id='category-3'
                                name='category[]'
                                defaultValue='sweatshirts'
                                type='checkbox'
                                className='h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500'
                              />
                              <label
                                htmlFor='category-3'
                                className='ml-3 text-sm text-gray-600'
                              >
                                Department of Defense
                              </label>
                            </div>
                            <div className='flex items-center'>
                              <input
                                id='category-4'
                                name='category[]'
                                defaultValue='pants-shorts'
                                type='checkbox'
                                className='h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500'
                              />
                              <label
                                htmlFor='category-4'
                                className='ml-3 text-sm text-gray-600'
                              >
                                City of Imperial
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                      <div className='pt-10'>
                        <fieldset>
                          <legend className='block text-sm font-medium text-gray-900'>
                            Location
                          </legend>
                          <div className='pt-6 space-y-3'>
                            <div className='flex items-center'>
                              <input
                                id='sizes-0'
                                name='sizes[]'
                                defaultValue='xs'
                                type='checkbox'
                                className='h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500'
                              />
                              <label
                                htmlFor='sizes-0'
                                className='ml-3 text-sm text-gray-600'
                              >
                                Los Angeles
                              </label>
                            </div>
                            <div className='flex items-center'>
                              <input
                                id='sizes-0'
                                name='sizes[]'
                                defaultValue='xs'
                                type='checkbox'
                                className='h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500'
                              />
                              <label
                                htmlFor='sizes-0'
                                className='ml-3 text-sm text-gray-600'
                              >
                                San Francisco
                              </label>
                            </div>
                            <div className='flex items-center'>
                              <input
                                id='sizes-0'
                                name='sizes[]'
                                defaultValue='xs'
                                type='checkbox'
                                className='h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500'
                              />
                              <label
                                htmlFor='sizes-0'
                                className='ml-3 text-sm text-gray-600'
                              >
                                Other
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </form>
                  </div>
                </aside>
                <section
                  aria-labelledby='product-heading'
                  className='mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3'
                >
                  <h2 id='product-heading' className='sr-only'>
                    Suppliers
                  </h2>
                  <div className='grid grid-cols-1 gap-4'>
                    {organizationList?.data.map((organization) => (
                      <div className='group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden hover:border-green-500'>
                        <div className='flex-1 p-4 space-y-2 flex flex-col'>
                          <h3 className='text-lg font-medium text-gray-900'>
                            <Link to={`/suppliers/${organization.id}`}>
                              <span
                                aria-hidden='true'
                                className='absolute inset-0'
                              />
                              {organization.name}
                            </Link>
                          </h3>
                          {/* <p className="text-sm text-gray-500">
                          Get the full lineup of our Basic Tees. Have a fresh
                          shirt all week, and an extra for laundry day.
                        </p> */}
                          <div className='flex-1 flex flex-col justify-end'>
                            <p className='text-sm italic text-gray-500'>
                              Certifying Agencies
                            </p>
                            <p className='text-base font-medium text-gray-900'>
                              DGS, Metro
                            </p>
                          </div>
                          <div className='flex-1 flex flex-col justify-end'>
                            <p className='text-sm italic text-gray-500'>
                              Certificates
                            </p>
                            <p className='text-base font-medium text-gray-900'>
                              DVBE, DBE
                            </p>
                          </div>
                          {organization.city && organization.state && (
                            <div className='flex-1 flex flex-col justify-end'>
                              <p className='text-sm italic text-gray-500'>
                                Location
                              </p>
                              <p className='text-base font-medium text-gray-900'>
                                {organization.city}, {organization.state}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </main>
          </div>
        </div>
      </StyledDiv>
    </HomeLayout>
  );
};

export default HomeSuppliersPage;
