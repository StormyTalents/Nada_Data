import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

import { Helmet } from 'react-helmet';
import HomeArticlesCard from './cards/HomeArticlesCard';
import HomeLayout from './HomeLayout';
import OpportunityListCard from '../opportunity/cards/OpportunityListCard';
import Typewriter from 'typewriter-effect';
import { getAccessToken } from 'axios-jwt';
import styled from 'styled-components';
import { useFindOpportunityStats } from '../hooks/opportunities/useFindOpportunityStats';

const incentives = [
  {
    name: 'Free shipping',
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg',
    description:
      "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
  },
  {
    name: '10-year warranty',
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg',
    description:
      "If it breaks in the first 10 years we'll replace it. After that you're on your own though.",
  },
  {
    name: 'Exchanges',
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-exchange-simple.svg',
    description:
      "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though.",
  },
];

function homepageImage() {
  const items = [
    'Construction Worker_Two Color.svg',
    'main.jpg',
    // "undraw_pair_programming_re_or4x.svg",
    // "undraw_work_together_re_5yhn.svg",
  ];
  return items[Math.floor(Math.random() * items.length)];
}

const StyledDiv = styled.div`
  background-color: white;
  a:hover {
    text-decoration: underline;
  }
  .Typewriter {
    display: inline;
    margin-left: 8px;
    ${(props) => props.theme.breakpoints.down('sm')} {
      margin-left: 6px;
    }
  }
`;
const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const token = getAccessToken();

  const { opportunityStats, loadingOpportunityStats } = useFindOpportunityStats(
    true
  );

  return (
    <HomeLayout>
      <Helmet>
        <title>Haven | Procurement for Diversity</title>
      </Helmet>

      <StyledDiv>
        {/* content goes here */}

        <div className='pb-16  mx-auto bg-white '>
          <div className='mt-8 mx-auto px-4'>
            <div className='text-center'>
              <img
                alt='homepageImage'
                style={{ width: 400, margin: '0 auto', marginBottom: 20 }}
                src={`https://images.squarespace-cdn.com/content/v1/61fc69bc03dfee7f5e46f231/a37cfcf6-c7de-456a-bc81-dc33cc2098f6/hero.jpg?format=750w`}
              />
              <h1 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
                <span className='block'>
                  We're here for the
                  <Typewriter
                    options={{
                      delay: 50,
                      loop: false,
                      cursor: '',
                    }}
                    onInit={(typewriter) => {
                      typewriter
                        .typeString(
                          "<span style='color: #9023fc;'>Disabled Veteran</span>"
                        )
                        .pauseFor(4000)
                        .deleteChars(16)
                        .typeString(
                          "<span style='color: #042b69;'>Veteran Owner</span>"
                        )
                        .pauseFor(4000)
                        .deleteChars(13)
                        .typeString(
                          "<span style='color: #fc23cd;'>Black American Owner</span>"
                        )
                        .pauseFor(4000)
                        .deleteChars(20)
                        .typeString(
                          "<span style='color: #fc23cd;'>Hispanic American Owner</span>"
                        )
                        .pauseFor(4000)
                        .deleteChars(23)
                        .typeString(
                          "<span style='color: #fc23cd;'>Asian American Owner</span>"
                        )
                        .pauseFor(4000)
                        .deleteChars(20)
                        .typeString(
                          "<span style='color: #07e3ca;'>Disadvantaged.</span>"
                        )
                        .start();
                    }}
                  />
                </span>
                <span className='block text-gray-600'>
                  One opportunity at a time.
                </span>
              </h1>
              <p className='mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl'>
                As the World’s first opportunity portal that focuses solely on
                small & diverse owned businesses, Haven brings you the most
                up-to-date and relevant opportunities.
              </p>
            </div>
          </div>
        </div>

        <div className='pb-16 w-full md:w-full px-4 lg:px-8 mx-auto'>
          <h3 className='text-lg leading-6 font-medium text-gray-900 text-center md:text-left'>
            Database Updated Daily
          </h3>
          <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4'>
            <div className='px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6'>
              <dt className='text-sm font-medium text-gray-500 truncate'>
                Total Opportunities
              </dt>
              <dd className='mt-1 text-3xl font-semibold text-gray-900'>
                {loadingOpportunityStats && <p className='cp-single' />}
                {opportunityStats?.totalOpportunities?.toLocaleString('en-US')}
              </dd>
            </div>

            <div className='px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6'>
              <dt className='text-sm font-medium text-gray-500 truncate'>
                Open Opportunities
              </dt>
              <dd className='mt-1 text-3xl font-semibold text-gray-900'>
                {loadingOpportunityStats && <p className='cp-single' />}
                {opportunityStats?.totalOpenOpportunities?.toLocaleString(
                  'en-US'
                )}
              </dd>
            </div>

            <div className='px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6'>
              <dt className='text-sm font-medium text-gray-500 truncate'>
                Closing in 48 hours
              </dt>
              <dd className='mt-1 text-3xl font-semibold text-gray-900'>
                {loadingOpportunityStats && <p className='cp-single' />}
                {opportunityStats?.closingIn2Days?.toLocaleString('en-US')}
              </dd>
            </div>

            <div className='px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6'>
              <dt className='text-sm font-medium text-gray-500 truncate'>
                Added in 24 hours
              </dt>
              <dd className='mt-1 text-3xl font-semibold text-gray-900'>
                {loadingOpportunityStats && <p className='cp-single' />}
                {opportunityStats?.scrapedToday?.toLocaleString('en-US')}
              </dd>
            </div>
          </dl>
        </div>

        {/* <div className="px-8 md:w-full mx-auto bg-white ">
          <div className="flex flex-col">
            <h3 className="text-lg leading-6 font-medium text-gray-900 text-left mb-8">
              #diversity
            </h3>
            <div className="-my-2 overflow-x-auto -mx-8  bg-white px-6">
              <div>
                <iframe
                  src="https://twitter.com/jaequery?ref_src=twsrc%5Etfw"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
        </div> */}

        <div className='px-4 lg:px-8 md:w-full mx-auto bg-white mb-12'>
          <h3 className='text-lg leading-6 font-medium text-gray-900 text-center md:text-left mb-8'>
            Latest Headlines
          </h3>
          <HomeArticlesCard showLimit={5} />
        </div>

        <div className='px-4 lg:px-8 md:w-full mx-auto mt-8 bg-white '>
          <div className='flex flex-col'>
            <h3 className='text-lg leading-6 font-medium text-gray-900 text-center md:text-left mb-8'>
              Today's New Opportunities
            </h3>

            <div className=''>
              <OpportunityListCard
                showSearch={false}
                showPagination={false}
                perPage={5}
              />

              <div className='grid justify-items-center m-10'>
                <Link
                  to='/opportunities'
                  className='mt-4 p-2 border border-black px-8 hover:bg-black hover:text-white rounded-2xl'
                >
                  View More
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full mx-auto hidden'>
          <div className='bg-white'>
            <div className='mx-auto sm:px-2 lg:px-4'>
              <div className='max-w-2xl mx-auto px-4 lg:max-w-none'>
                <div className='grid grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-2'>
                  {incentives.map((incentive, i) => (
                    <div key={i} className='sm:flex lg:block'>
                      <div className='sm:flex-shrink-0'>
                        <img
                          className='w-16 h-16'
                          src={incentive.imageSrc}
                          alt=''
                        />
                      </div>
                      <div className='mt-4 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0'>
                        <h3 className='text-sm font-medium text-gray-900'>
                          {incentive.name}
                        </h3>
                        <p className='mt-2 text-sm text-gray-500'>
                          {incentive.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </StyledDiv>
    </HomeLayout>
  );
};

export default HomePage;
