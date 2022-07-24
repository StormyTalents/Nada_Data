import { formatDistance } from 'date-fns';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import slugify from 'slugify';
import styled from 'styled-components';
import { NumberParam, useQueryParam } from 'use-query-params';

import { chooseContentTypeColor } from '../../common/home/home';
import { useFindContents } from '../../hooks/contents/useFindContents';

const StyledDiv = styled.div`
  .title {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .summary {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
const ArticlesCard: React.FC<{ showLimit?: number; columns?: number }> = ({
  showLimit,
  columns = 3,
}) => {
  const navigate = useNavigate();
  const { findContents, contentList } = useFindContents(false);
  const [page = 0, setPage] = useQueryParam('page', NumberParam);
  const [limit = showLimit || 100, setLimit] = useQueryParam(
    'limit',
    NumberParam
  );

  useEffect(() => {
    findContents({
      limit,
    });
  }, []);
  return (
    <StyledDiv>
      <div
        className={`mt-0 grid gap-16 pt-12 lg:grid-cols-${columns} lg:gap-x-5 lg:gap-y-12`}
      >
        {contentList?.data?.map((content) => (
          <div>
            <div>
              <Link
                to={`/articles/${content?.id}/${slugify(content?.title || '')}`}
                className='inline-block'
              >
                <span
                  className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${chooseContentTypeColor(
                    content.contenttype?.name
                  )}`}
                >
                  {content.contenttype?.name || 'Blog'}
                </span>
              </Link>
            </div>
            <Link
              to={`/articles/${content?.id}/${slugify(content?.title)}`}
              className='block mt-4'
            >
              <p className='text-xl font-semibold text-gray-900 title'>
                {content.title}
              </p>
              <p className='mt-3 text-base text-gray-500 summary'>
                {content.summary}
              </p>
            </Link>
            <div className='mt-6 flex items-center'>
              <div className='flex-shrink-0'>
                <span className='sr-only'>{content.createdBy?.firstName}</span>
                <img
                  className='h-10 w-10 rounded-full'
                  src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                  alt=''
                />
              </div>
              <div className='ml-3'>
                <p className='text-sm font-medium text-gray-900'>
                  {content.createdBy?.firstName}
                </p>
                <div className='flex space-x-1 text-sm text-gray-500'>
                  <time dateTime='2020-03-16'>
                    {content.created &&
                      formatDistance(content.created, new Date(), {
                        addSuffix: true,
                      })}
                  </time>
                  <span aria-hidden='true'>&middot;</span>
                  <span>5 min read</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </StyledDiv>
  );
};

export default ArticlesCard;
