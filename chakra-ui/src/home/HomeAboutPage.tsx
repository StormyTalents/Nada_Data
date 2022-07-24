import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import HomeLayout from './HomeLayout';

const StyledDiv = styled.div`
  h3 {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;
const HomeAboutPage: React.FC = () => {
  const people = [
    {
      name: 'Mackenzie K.',
      role: 'CEO',
      imageUrl:
        'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
      twitterUrl: '#',
      linkedinUrl: '#',
    },

    {
      name: 'Mitch E.',
      role: 'Chief Operations',
      imageUrl:
        'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
      twitterUrl: '#',
      linkedinUrl: '#',
    },

    {
      name: 'Jae L.',
      role: 'CTO',
      imageUrl:
        'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
      twitterUrl: '#',
      linkedinUrl: '#',
    },

    {
      name: 'Mark S.',
      role: 'Principal Designer',
      imageUrl:
        'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
      twitterUrl: '#',
      linkedinUrl: '#',
    },
    // More people...
  ];
  const navigate = useNavigate();
  return (
    <HomeLayout>
      <StyledDiv>
        <div className='pt-12 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden'>
          <div className='max-w-max lg:max-w-7xl mx-auto'>
            <div className='relative z-10 mb-8 md:mb-2 md:px-6'>
              <div className='text-base max-w-prose lg:max-w-none'>
                <h2 className='leading-6 text-green-600 font-semibold tracking-wide uppercase'>
                  Why Haven Project
                </h2>
                <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
                  On a mission to help diverse-owned businesses THRIVE.
                </p>
              </div>
            </div>
            <div className='relative'>
              <svg
                className='hidden md:block absolute top-0 right-0 -mt-20 -mr-20'
                width='404'
                height='384'
                fill='none'
                viewBox='0 0 404 384'
                aria-hidden='true'
              >
                <defs>
                  <pattern
                    id='95e8f2de-6d30-4b7e-8159-f791729db21b'
                    x='0'
                    y='0'
                    width='20'
                    height='20'
                    patternUnits='userSpaceOnUse'
                  >
                    <rect
                      x='0'
                      y='0'
                      width='4'
                      height='4'
                      className='text-gray-200'
                      fill='currentColor'
                    />
                  </pattern>
                </defs>
                <rect
                  width='404'
                  height='384'
                  fill='url(#95e8f2de-6d30-4b7e-8159-f791729db21b)'
                />
              </svg>
              <svg
                className='hidden md:block absolute bottom-0 left-0 -mb-20 -ml-20'
                width='404'
                height='384'
                fill='none'
                viewBox='0 0 404 384'
                aria-hidden='true'
              >
                <defs>
                  <pattern
                    id='7a00fe67-0343-4a3c-8e81-c145097a3ce0'
                    x='0'
                    y='0'
                    width='20'
                    height='20'
                    patternUnits='userSpaceOnUse'
                  >
                    <rect
                      x='0'
                      y='0'
                      width='4'
                      height='4'
                      className='text-gray-200'
                      fill='currentColor'
                    />
                  </pattern>
                </defs>
                <rect
                  width='404'
                  height='384'
                  fill='url(#7a00fe67-0343-4a3c-8e81-c145097a3ce0)'
                />
              </svg>
              <div className='relative md:bg-white md:p-6'>
                <div className='lg:grid lg:grid-cols-2 lg:gap-6'>
                  <div className='prose prose-green prose-lg text-gray-500 lg:max-w-none'>
                    <h3 className='text-xl'>Radical transparency</h3>
                    <p>
                      Let’s address the elephant in the room — government
                      websites are awful! The red tape and archaic design make
                      it nearly impossible to find the right opportunities and
                      understand the nuances of different certifications. At
                      Haven, we know the simpler, the better. When information
                      is presented in a clear, digestible way, it levels the
                      playing field for everyone.
                    </p>

                    <h3 className='text-xl'>Connection is power</h3>
                    <p>
                      We’ve all heard it at some point: “It’s not what you know,
                      but who you know.” At Haven, we know connections are key
                      to the success of your company. We believe everyone
                      deserves the resources to grow their network and expand
                      their business.
                    </p>

                    <ol role='list'>
                      <li>
                        Integer varius imperdiet sed interdum felis cras in nec
                        nunc.
                      </li>
                      <li>
                        Quam malesuada odio ut sit egestas. Elementum at porta
                        vitae.
                      </li>
                    </ol>
                    <p>
                      Amet, eu nulla id molestie quis tortor. Auctor erat justo,
                      sed pellentesque scelerisque interdum blandit lectus. Nec
                      viverra amet ac facilisis vestibulum. Vestibulum purus
                      nibh ac ultricies congue.
                    </p>
                  </div>
                  <div className='mt-6 prose prose-green prose-lg text-gray-500 lg:mt-0'>
                    <h3 className='text-xl'>Small-business minded</h3>
                    <p>
                      You’ve heard about government policies aimed to help
                      disadvantaged-owned businesses, but you haven’t seen that
                      translate to your bottom line. You’ve registered your
                      business with every relevant certification possible, but
                      you’re not seeing the growth you expect. That’s because
                      most resources are tailor-made for established
                      corporations with zero certification power and thousands
                      of employees. At Haven, we believe the economy shouldn’t
                      be dictated by massive billionaire institutions, but by
                      the people that make your coffee every morning. And every
                      Haven team member is doing their best to further the
                      interests of our customers and challenge the status quo.
                    </p>

                    <h3 className='text-xl'>A bright future</h3>
                    <p>
                      At Haven, we believe supplier diversity programs should be
                      the norm. A diverse supplier base and network can drive
                      better outcomes that can actually enhance business growth
                      and brand reputation. It’s time we open the doors and let
                      everyone in.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-white'>
              <div className='max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24'>
                <div className='space-y-12'>
                  <div className='space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl'>
                    <h2 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>
                      Meet our founders
                    </h2>
                    <p className='text-xl text-gray-500'>
                      We understand the adversity diverse-owned small businesses
                      face because, well — we are one. Our story began in LA,
                      where we became increasingly frustrated with how
                      opportunities were presented to us, if at all. So, we
                      decided to do something about it. Now, we’re on a journey
                      to change the way diverse-owned businesses engage with
                      companies looking to hire them. We hope you join us along
                      the way. Now go out there and kill it!
                    </p>
                  </div>
                  <ul
                    role='list'
                    className='mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3 lg:max-w-5xl'
                  >
                    {people.map((person) => (
                      <li key={person.name}>
                        <div className='space-y-6'>
                          <img
                            className='mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56'
                            src={person.imageUrl}
                            alt=''
                          />
                          <div className='space-y-2'>
                            <div className='text-lg leading-6 font-medium space-y-1'>
                              <h3>{person.name}</h3>
                              <p className='text-indigo-600'>{person.role}</p>
                            </div>
                            <ul
                              role='list'
                              className='flex justify-center space-x-5'
                            >
                              <li>
                                <a
                                  href={person.twitterUrl}
                                  className='text-gray-400 hover:text-gray-500'
                                >
                                  <span className='sr-only'>Twitter</span>
                                  <svg
                                    className='w-5 h-5'
                                    aria-hidden='true'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                  >
                                    <path d='M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84' />
                                  </svg>
                                </a>
                              </li>
                              <li>
                                <a
                                  href={person.linkedinUrl}
                                  className='text-gray-400 hover:text-gray-500'
                                >
                                  <span className='sr-only'>LinkedIn</span>
                                  <svg
                                    className='w-5 h-5'
                                    aria-hidden='true'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                  >
                                    <path
                                      fillRule='evenodd'
                                      d='M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z'
                                      clipRule='evenodd'
                                    />
                                  </svg>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StyledDiv>
    </HomeLayout>
  );
};

export default HomeAboutPage;
