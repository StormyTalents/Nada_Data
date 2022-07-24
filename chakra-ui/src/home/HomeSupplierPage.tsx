import { Divider } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useFindOrganization } from '../hooks/organizations/useFindOrganization';
import HomeLayout from './HomeLayout';

const StyledDiv = styled.div`
  background-color: white;
  margin: 0 auto;
`;

const reviews = {
  average: 4,
  totalCount: 1624,
  counts: [
    { rating: 5, count: 1019 },
    { rating: 4, count: 162 },
    { rating: 3, count: 97 },
    { rating: 2, count: 199 },
    { rating: 1, count: 147 },
  ],
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: 'Emily Selman',
      avatarSrc:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
    // More reviews...
  ],
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const HomeSupplierPage: React.FC = () => {
  const navigate = useNavigate();
  const { id = 0 } = useParams<{
    id: string;
  }>();
  const { organization, findOrganization } = useFindOrganization(+id || 0);

  useEffect(() => {
    if (id) {
      findOrganization({ id });
    }
  }, [id]);

  return (
    <HomeLayout>
      <StyledDiv>
        <div className='w-3/4 mx-auto bg-white pt-24 pb-10 blurry'>
          <div className='mx-auto'>
            <div className=''>
              <h1 className='text-3xl font-extrabold tracking-tight text-black w-1/2'>
                {organization?.name}
              </h1>
              <div className='mt-4 mb-4'>
                <Rating
                  name='simple-controlled'
                  value={4}
                  onChange={(event, newValue) => {}}
                />
                <p className='sr-only'>5 out of 5 stars</p>
                <p className='text-sm text-black'>Based on 5 reviews</p>
              </div>
            </div>
            <p className='mt-4 text-base text-black'>
              We are a group of small minority based company based in Los
              Angeles, CA building construction materials for over 14 years.
            </p>
          </div>

          <div className='mx-auto flex'>
            <div className='mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4'>
              <button
                type='button'
                className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
              >
                <svg
                  className='-ml-1 mr-2 h-5 w-5 text-gray-400'
                  x-description='Heroicon name: solid/mail'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                  <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                </svg>
                <span>Send Message</span>
              </button>
              <button
                type='button'
                className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
              >
                <svg
                  className='-ml-1 mr-2 h-5 w-5 text-gray-400'
                  x-description='Heroicon name: solid/phone'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
                </svg>
                <span>Call</span>
              </button>
            </div>
          </div>

          <article className='mt-10 mx-auto'>
            {/* Tabs */}
            <div className='mt-20 sm:mt-2'>
              <div className='border-b border-gray-200'>
                <div className='mx-auto'>
                  <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
                    <a
                      href='#'
                      className='border-green-500 text-black whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                      aria-current='page'
                    >
                      Profile
                    </a>
                    <a
                      href='#'
                      className='border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                    >
                      Bids (39)
                    </a>
                  </nav>
                </div>
              </div>
            </div>
            {/* Description list */}
            <div className='mt-6'>
              <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
                <div className='sm:col-span-1'>
                  <dt className='text-sm font-medium text-gray-500'>Phone</dt>
                  <dd className='mt-1 text-sm text-black'>(555) 123-4567</dd>
                </div>
                <div className='sm:col-span-1'>
                  <dt className='text-sm font-medium text-gray-500'>Email</dt>
                  <dd className='mt-1 text-sm text-black'>
                    ricardocooper@example.com
                  </dd>
                </div>
                <div className='sm:col-span-1'>
                  <dt className='text-sm font-medium text-gray-500'>NAICS</dt>
                  <dd className='mt-1 text-sm text-black'>23523, 923531</dd>
                </div>
                <div className='sm:col-span-1'>
                  <dt className='text-sm font-medium text-gray-500'>UNSPSC</dt>
                  <dd className='mt-1 text-sm text-black'>123, 525, 235, 39</dd>
                </div>
                <div className='sm:col-span-1'>
                  <dt className='text-sm font-medium text-gray-500'>
                    Location
                  </dt>
                  <dd className='mt-1 text-sm text-black'>San Francisco</dd>
                </div>
                <div className='sm:col-span-1'>
                  <dt className='text-sm font-medium text-gray-500'>Sits</dt>
                  <dd className='mt-1 text-sm text-black'>Oasis, 4th floor</dd>
                </div>
                <div className='sm:col-span-1'>
                  <dt className='text-sm font-medium text-gray-500'>
                    Compensation
                  </dt>
                  <dd className='mt-1 text-sm text-black'>$1M - $2M</dd>
                </div>
                <div className='sm:col-span-1'>
                  <dt className='text-sm font-medium text-gray-500'>
                    End Date
                  </dt>
                  <dd className='mt-1 text-sm text-black'>June 8, 2022</dd>
                </div>
                <div className='sm:col-span-2'>
                  <dt className='text-sm font-medium text-gray-500'>
                    Description
                  </dt>
                  <dd className='mt-1 max-w-prose text-sm text-black space-y-5'>
                    <p>
                      Tincidunt quam neque in cursus viverra orci, dapibus nec
                      tristique. Nullam ut sit dolor consectetur urna, dui cras
                      nec sed. Cursus risus congue arcu aenean posuere aliquam.
                    </p>
                    <p>
                      Et vivamus lorem pulvinar nascetur non. Pulvinar a sed
                      platea rhoncus ac mauris amet. Urna, sem pretium sit
                      pretium urna, senectus vitae. Scelerisque fermentum,
                      cursus felis dui suspendisse velit pharetra. Augue et duis
                      cursus maecenas eget quam lectus. Accumsan vitae nascetur
                      pharetra rhoncus praesent dictum risus suspendisse.
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
            {/* Team member list */}
            <div className='mt-8 pb-12'>
              <h2 className='text-sm font-medium text-gray-500'>
                Certifications
              </h2>
              <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div className='relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500'>
                  <div className='flex-1 min-w-0'>
                    <a href='#' className='focus:outline-none'>
                      <span className='absolute inset-0' aria-hidden='true' />
                      <p className='text-sm font-medium text-black'>DVE</p>
                      <p className='text-sm text-gray-500 truncate'>
                        Disabled Veterans Exceptions
                      </p>
                    </a>
                  </div>
                </div>
                <div className='relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500'>
                  <div className='flex-1 min-w-0'>
                    <a href='#' className='focus:outline-none'>
                      <span className='absolute inset-0' aria-hidden='true' />
                      <p className='text-sm font-medium text-black'>DBVE</p>
                      <p className='text-sm text-gray-500 truncate'>
                        Disabled Busines Veteran Edition
                      </p>
                    </a>
                  </div>
                </div>
                <div className='relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500'>
                  <div className='flex-1 min-w-0'>
                    <a href='#' className='focus:outline-none'>
                      <span className='absolute inset-0' aria-hidden='true' />
                      <p className='text-sm font-medium text-black'>WOSB</p>
                      <p className='text-sm text-gray-500 truncate'>
                        Women Owned Small Business
                      </p>
                    </a>
                  </div>
                </div>
                <div className='relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500'>
                  {/* <div className="flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            />
                          </div> */}
                  <div className='flex-1 min-w-0'>
                    <a href='#' className='focus:outline-none'>
                      <span className='absolute inset-0' aria-hidden='true' />
                      <p className='text-sm font-medium text-black'>
                        Set-Aside FAR 19.8
                      </p>
                      <p className='text-sm text-gray-500 truncate'></p>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Team member list */}

            <div className='bg-white mt-8'>
              <div className='mx-auto lg:grid lg:grid-cols-12 lg:gap-x-8'>
                <div className='lg:col-span-4'>
                  <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>
                    Customer Reviews
                  </h2>

                  <div className='mt-3 flex items-center'>
                    <div>
                      <div className='flex items-center'>
                        <Rating
                          name='simple-controlled'
                          value={4}
                          onChange={(event, newValue) => {}}
                        />
                      </div>
                      <p className='sr-only'>
                        {reviews.average} out of 5 stars
                      </p>
                    </div>
                    <p className='ml-2 text-sm text-gray-900'>
                      Based on {reviews.totalCount} reviews
                    </p>
                  </div>

                  <div className='mt-6'>
                    <h3 className='sr-only'>Review data</h3>

                    <dl className='space-y-3'>
                      {reviews.counts.map((count) => (
                        <div
                          key={count.rating}
                          className='flex items-center text-sm'
                        >
                          <dt className='flex-1 flex items-center'>
                            <p className='w-3 font-medium text-gray-900'>
                              {count.rating}
                              <span className='sr-only'> star reviews</span>
                            </p>
                            <div
                              aria-hidden='true'
                              className='ml-1 flex-1 flex items-center'
                            >
                              <Rating
                                name='simple-controlled'
                                value={4}
                                onChange={(event, newValue) => {}}
                              />

                              <div className='ml-3 relative flex-1'>
                                <div className='h-3 bg-gray-100 border border-gray-200 rounded-full' />
                                {count.count > 0 ? (
                                  <div
                                    className='absolute inset-y-0 bg-yellow-400 border border-yellow-400 rounded-full'
                                    style={{
                                      width: `calc(${count.count} / ${reviews.totalCount} * 100%)`,
                                    }}
                                  />
                                ) : null}
                              </div>
                            </div>
                          </dt>
                          <dd className='ml-3 w-10 text-right tabular-nums text-sm text-gray-900'>
                            {Math.round(
                              (count.count / reviews.totalCount) * 100
                            )}
                            %
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className='mt-10'>
                    <h3 className='text-lg font-medium text-gray-900'>
                      Share your thoughts
                    </h3>
                    <p className='mt-1 text-sm text-gray-600'>
                      If you’ve used this product, share your thoughts with
                      other customers
                    </p>

                    <a
                      href='#'
                      className='mt-6 inline-flex w-full bg-white border border-gray-300 rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full'
                    >
                      Write a review
                    </a>
                  </div>
                </div>

                <div className='mt-16 lg:mt-0 lg:col-start-6 lg:col-span-7'>
                  <h3 className='sr-only'>Recent reviews</h3>

                  <div className='flow-root'>
                    <div className='-my-12 divide-y divide-gray-200'>
                      {reviews.featured.map((review) => (
                        <div key={review.id} className='py-12'>
                          <div className='flex items-center'>
                            <img
                              src={review.avatarSrc}
                              alt={`${review.author}.`}
                              className='h-12 w-12 rounded-full'
                            />
                            <div className='ml-4'>
                              <h4 className='text-sm font-bold text-gray-900'>
                                {review.author}
                              </h4>
                              <div className='mt-1 flex items-center'>
                                <Rating
                                  name='simple-controlled'
                                  value={4}
                                  onChange={(event, newValue) => {}}
                                />
                              </div>
                              <p className='sr-only'>
                                {review.rating} out of 5 stars
                              </p>
                            </div>
                          </div>

                          <div
                            className='mt-4 space-y-6 text-base italic text-gray-600'
                            dangerouslySetInnerHTML={{
                              __html: review.content,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </StyledDiv>
    </HomeLayout>
  );
};

export default HomeSupplierPage;
