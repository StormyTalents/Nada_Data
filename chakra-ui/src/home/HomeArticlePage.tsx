import { AccessTime, LocationOn } from '@material-ui/icons';
import { format, formatDistance } from 'date-fns';
import React, { useEffect } from 'react';
import nl2br from 'react-nl2br';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import styled from 'styled-components';

import FriendlyCertificationLabels from '../certification/cards/FriendlyCertificationLabels';
import { chooseContentTypeColor } from '../common/home/home';
import { useFindContent } from '../hooks/contents/useFindContent';
import HomeLayout from './HomeLayout';

const StyledDiv = styled.div`
  background-color: white;
  max-width: 1040px;
  margin: 0 auto;

  .content {
    color: #000;
  }
  a {
    color: blue;
  }
`;

function isUrl(str?: string) {
  if (!str) {
    return;
  }
  var urlRegex =
    '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
  var url = new RegExp(urlRegex, 'i');
  return str.length < 2083 && url.test(str);
}

const HomeArticlePage: React.FC = () => {
  const navigate = useNavigate();
  const { id = 0 } = useParams<{ id: string }>();
  const { content, findContent } = useFindContent(+id);

  useEffect(() => {
    findContent();
  }, []);
  return (
    <HomeLayout>
      <StyledDiv>
        <div className='relative py-16 bg-white overflow-hidden'>
          <div className='relative px-4 sm:px-6 lg:px-8'>
            <div className='mb-6'>
              <Link to={`/articles`}>&lt; Back to articles</Link>
            </div>
            <div className='text-lg max-w-prose mx-auto'>
              <h1>
                <span className='mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
                  {content?.title}
                </span>
                <span className='mt-4 block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase'>
                  <span
                    className={`mr-2 px-3 py-0.5 rounded-full text-sm font-medium ${chooseContentTypeColor(
                      content?.contenttype?.name || ''
                    )}`}
                  >
                    {content?.contenttype?.name || 'Blog'}
                  </span>
                  by {content?.createdBy?.firstName} -{' '}
                  <time dateTime='2020-03-16'>
                    {content?.created &&
                      formatDistance(content?.created, new Date(), {
                        addSuffix: true,
                      })}
                  </time>
                </span>
              </h1>
              <div className='flex align-middle justify-center m-4 gap-2'>
                <FacebookShareButton
                  url={window.location.href}
                  title={content?.title}
                >
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
                <TwitterShareButton
                  url={window.location.href}
                  title={content?.title}
                >
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
                <LinkedinShareButton
                  url={window.location.href}
                  title={content?.title}
                >
                  <LinkedinIcon size={32} round={true} />
                </LinkedinShareButton>
                <EmailShareButton
                  url={window.location.href}
                  title={content?.title}
                >
                  <EmailIcon size={32} round={true} />
                </EmailShareButton>
              </div>
              {content?.keywords && content.keywords.length !== 0 && (
                <div className='flex justify-center mt-2'>
                  <div className='text-gray-400'>Tags:&nbsp;</div>
                  <h3 className='text-gray-500'>
                    {content?.keywords
                      ?.map((keyword) => keyword.name)
                      .join(', ')}
                  </h3>
                </div>
              )}

              <div>
                <FriendlyCertificationLabels
                  certifications={content?.certifications}
                  classNames='flex align-middle justify-center m-4 gap-2'
                />
              </div>
            </div>

            {content?.contenttype?.name === 'Events' && (
              <div>
                <dl className='mt-8 space-y-6'>
                  <dt>
                    <span className='sr-only'>When</span>
                  </dt>
                  <dd className='flex text-base text-teal-50'>
                    <AccessTime
                      className='flex-shrink-0 w-6 h-6 text-teal-200'
                      aria-hidden='true'
                    />
                    <span className='ml-3'>
                      {content?.eventTime &&
                        format(
                          content?.eventTime,
                          'EEEE, LLLL dd, yyyy - hh:mm a'
                        )}
                    </span>
                  </dd>
                  <dt>
                    <span className='sr-only'>Where</span>
                  </dt>
                  <dd className='flex text-base text-teal-50'>
                    <LocationOn
                      className='flex-shrink-0 w-6 h-6 text-teal-200'
                      aria-hidden='true'
                    />
                    <span className='ml-3'>
                      {isUrl(content?.eventLocation) ? (
                        <a
                          className='link'
                          href={content.eventLocation}
                          target='_blank'
                          rel='noreferrer'
                        >
                          {content?.eventLocation}
                        </a>
                      ) : (
                        <>{nl2br(content?.eventLocation)}</>
                      )}
                    </span>
                  </dd>
                </dl>
              </div>
            )}

            <p
              className='mt-10 text-xl font-normal content'
              dangerouslySetInnerHTML={{ __html: content?.html || '' }}
            ></p>
          </div>
        </div>
      </StyledDiv>
    </HomeLayout>
  );
};

export default HomeArticlePage;
