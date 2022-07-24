import React, { useEffect } from 'react';
import slugify from 'slugify';
import { format, formatDistance } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useFindContents } from '../hooks/contents/useFindContents';

import HomeLayout from './HomeLayout';
import { chooseContentTypeColor } from '../common/home/home';
import ArticlesCard from './cards/ArticlesCard';

const StyledDiv = styled.div`
  background-color: white;
  max-width: 1040px;
  margin: 0 auto;
`;
const HomeArticlesPage: React.FC = () => {
  const navigate = useNavigate();
  const { findContents, contentList } = useFindContents(false);

  useEffect(() => {
    findContents();
  }, []);
  return (
    <HomeLayout>
      <StyledDiv>
        <div className='bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8'>
          <div className='relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl'>
            <div>
              <h2 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl text-center'>
                Recent Blog Articles
              </h2>
              <p className='mt-3 mb-12 text-xl text-gray-500 sm:mt-4 text-center'>
                All the latest industry news regarding diversity and procurement
              </p>
            </div>

            <div className=''>
              <ArticlesCard />
            </div>
          </div>
        </div>
      </StyledDiv>
    </HomeLayout>
  );
};

export default HomeArticlesPage;
