import {
  AnnotationIcon,
  ClockIcon,
  GlobeIcon,
  LocationMarkerIcon,
  MailOpenIcon,
  PlusIcon,
  PlusSmIcon,
  ShareIcon,
  StatusOnlineIcon,
} from '@heroicons/react/solid';
import { Disclosure, Transition } from '@headlessui/react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import lottieSuccessIcon from '../common/icon/lottie-success.json';
import getHavenDescriptionHandler from '../common/getHavenDescriptionHandler';
import Lottie from 'lottie-react';
import {
  Icon,
  Tooltip,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getFriendlyCertificationColorRevisedDot } from '../certification/Certification';
import CertificationLabels from '../certification/cards/CertificationLabels';
import CertificationsList from '../certification/CertificationsList';
import { FavoriteOpportunity } from '../common/home/FavoriteOpportunity';
import FriendlyCertificationLabels from '../certification/cards/FriendlyCertificationLabels';
import { Helmet } from 'react-helmet';
import HomeLayout from './HomeLayout';
import { Organization } from '../interfaces/Organization';
import PleaseLoginDialog from '../common/home/PleaseLoginDialog';
import { Rating } from '@material-ui/lab';
import Truncate from 'react-truncate';
import { format } from 'date-fns';
import styled from 'styled-components';
import { useFindOpportunities } from '../hooks/opportunities/useFindOpportunities';
import { useFindOpportunity } from '../hooks/opportunities/useFindOpportunity';
import { useUserContext } from '../user/UserContext';
import { useReturnSectorTypeIcon } from '../hooks/opportunities/useReturnSectorTypeIcon';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { shortenName } from '../opportunity/cards/OpportunityListCard';

const StyledDiv = styled.div`
  font-family: 'Inter', sans-serif !important;
  h4,
  h6,
  button,
  input {
    font-family: 'Inter', sans-serif !important;
  }

  background-color: white;

  .blur {
    filter: blur(4px);
    cursor: pointer;
  }

  .slate-bg {
    background-color: #f9f9f9;
  }

  .slate-text {
    color: #ababab;
  }

  .description-box {
    background: #fdfdfd;
    border: 1px solid rgba(0, 0, 0, 0.12);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  }

  .opportunity-sector-type::after {
    content: '•';
    margin: 0 5px 0 0;
    width: 1em;
    font-size: 1rem;
  }

  .opportunity-small-business {
    border-color: #3970ff;
  }

  .opportunity-8a {
    border-color: #5dccb1;
  }

  .opportunity-disability {
    border-color: #026a3f;
  }

  .opportunity-dbe {
    border-color: #fec337;
  }

  .opportunity-veteran {
    border-color: #ffffff;
  }

  .opportunity-woman {
    border-color: #e14034;
  }

  .opportunity-minority {
    border-color: #9470de;
  }

  .opportunity-local {
    border-color: #3cc5e7;
  }

  .opportunity-local {
    border-color: #3cc5e7;
  }

  .handle-certifications-and-group {
    max-width: 200px;
    ${(props) => props.theme.breakpoints.down('lg')} {
      max-width: 100px;
    }
    ${(props) => props.theme.breakpoints.down('md')} {
      max-width: 100px;
    }

    ${(props) => props.theme.breakpoints.down('sm')} {
      max-width: 200px;
    }
    ${(props) => props.theme.breakpoints.down('xs')} {
      max-width: 0;
    }
  }

  .similar-job-item-container {
    min-height: 30px;
  }

  .similar-job-item-description {
    max-height: 60px;
  }

  .similar-job-wrapper {
    width: 100% !important;
    max-width: 100%;
    width: 480px;
    height: 480px;

    ${(props) => props.theme.breakpoints.down('xs')} {
      max-width: 480px;
      max-height: 480px;
    }
  }
`;
const ShareDialog = styled(Dialog)`
  max-width: 350px;
  margin-left: auto;
  margin-right: auto;
  .react-share__ShareButton:hover {
    opacity: 0.8;
  }
`;

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

function getOrganizationName(organization: Organization) {
  let name = organization?.name;
  if (organization?.source?.name === 'SAM.gov') {
    const xName = name.split(', ');
    name = xName[1];
  }
  return name;
}

const HomeOpportunityPage: React.FC = () => {
  const navigate = useNavigate();
  const { id = 0 } = useParams<{ id: string }>();
  const { opportunity, loadingOpportunity } = useFindOpportunity(+id, true);
  const [expanded, setExpanded] = useState(false);
  const { slug = '' } = useParams<{ slug: string }>();
  const [activeSimilarJobsTab, setActiveSimilarJobsTab] = useState(1);

  const { user, refreshUser } = useUserContext();
  const { changeIconForSectorType } = useReturnSectorTypeIcon();
  const [expandCertifications, setExpandCertifications] = useState(false);

  const {
    opportunities,
    findOpportunities,
    loadingError,
    loadingOpportunities,
  } = useFindOpportunities();

  useEffect(() => {
    findOpportunities({ page: 0, limit: 10 });
  }, []);

  const faqs = [
    {
      id: 1,
      title: 'How do I apply for this opportunity',
      text: 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.',
    },
    {
      id: 2,
      title: 'Is there a way to gain an advantage?',
      text: 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.',
    },
    {
      id: 3,
      title: 'What if I have multiple certifications?',
      text: 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.',
    },
    {
      id: 4,
      title: 'What industry code should I be using?',
      text: 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.',
    },
    {
      id: 5,
      title: 'How does procurement work?',
      text: 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.',
    },
    {
      id: 6,
      title: 'Should I call or email?',
      text: 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.',
    },
  ];

  const SimilarJob = ({ item, className }: any) => {
    return (
      <div
        style={{ width: 340 }}
        key={item?.id}
        className={classNames(
          'flex flex-col justify-between border items-start py-8 px-8 similar-job-wrapper rounded-xl shadow-lg',
          className
        )}
      >
        <div className='flex md:justify-end md:items-start justify-center items-center md:text-left text-center flex-col w-full'>
          <div className='text-left flex justify-center items-center md:flex-row flex-col similar-job-item-container'>
            {!item?.organization && (
              <>
                <img
                  style={{ width: 48 }}
                  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX09PS+vr7Pz8/d3d3q6urv7+/y8vK7u7v39/ff39/MzMza2trGxsbBwcHk5OTz8/PU1NSV4ZV1AAAEA0lEQVR4nO2d6ZajIBBGFVmUTd7/aSfI4hLTY5x2wfnun24Odh/uIRGqipiqAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAXeqV3Qqwe+FebqfeiuvXrsm+Bkp2BdC3v14DdBzX5D1189+i1QsduwJuzq0W8BhjC8P8lQsS9QojxD8c3i1jYlGjYwnADDewHDNWB4L2C4Bgzvxf9n+Np1jp2cMZ4bfW6UbNh3UssuWVGntUsWXElN7BDVl2xo/e9Ghfmk0rdk0OiVb2jruwo2pDqEUkOisCWhK2RjbOgxXqpgQ2tiKOV7uIxx7vCiVaEhvPxTDKuZYfMMQx5emHoYeRukTNCleugioadYQ/9GFK/bSehizghRq3hnfc2vqGV4hxZsWFFFxoIE7wjpctbXOtIEpaINq7adbG7aZSv+UrThFmB4L2C4BgzvxdKQ8zFeqnrOJyXC3BgN+Q7Ocwss10NHnE1WrCFE5RFZJx2dGRpJvsfRk+uqiz2N37ikAj0bCuAuKnbve5p96JOL44voKbSChwsNFaKnYVMuNP9nw1qfe4rjX6KnvahTD3FsMGS/bUiuM2RyaJnwKo1SKlwXwn/5C6/SKw3DJJpmeqdJi94QLc7zNCUaVpakhJpX9Lm2tFr4NNxytdDfYe5g6Mc/7W7nrfgjGAr71UjblBa53PDvJMMvD7b1jzfkMDwGGK5RuOEPO//UVbQha9wkm2iVyotjRZXrZtnEIg2Z35vpuM5xZ3whKl5ofdcseirRMOxLhQlZ/Xg+rwnXDftSIf2UFmyYYoshRu3XKjP1JLYo2TBET7GY+DF6KtFwXiFdifFDWapgw6obGi526eGdF26tfPhYhukm0VORhlWja92kNKgv5Mu0drzurELOTiqUaVj10wxpxabZTc5i+FS24RZg+AEYHgQM14DhB2B4EDBco3jDntF32GSrU7hhS53U8h1Cx6x42YbUrJddxFi7LdxQfawrkbQNL9uQff70ukxR1WMNc/0dhh+4naHIbDRs35n1382QKBdRZINhT7vmnW56POhmhsb2+ZhWt8FQabPKeMb4fob5ktb+3dB+evNO/s99DTfMIZNLs0xeYwo31DCsYHgYv2w4vY0+0tAomyGPNNTTIPKhhvmP0tHGBxs+fw5heBYw9MAQhhEYHgQMPTCEYQSGBwFDDwz/V8O7RcDdm+GYj7CLse6cw2s/2ZWfQUuTYTc+cjbP4fwZtKLJV6TDxdpOHlQbDfNfsWsNzwSGMIThwvB8wdqdavhD5e8ozNmPjSCTMwknUOvuXMHXLO78jpKdNBd8t8nKKZEjOV8QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACr/AFpmWSuqvcLYwAAAABJRU5ErkJggg=='
                />
              </>
            )}
            {/* <Link to={`/organizations/${opportunity.organizationId}`}> */}
            <img
              style={{ width: 12, height: 12 }}
              className='mr-1'
              src={`/assets/images/icons/${changeIconForSectorType(
                item?.sectorType || undefined
              )}.svg`}
            />
            {item?.organization && (
              <>
                {/* <strong>
                          {opportunity.organization.name}
                        </strong> */}

                <div className='text-center md:text-left '>
                  <span className='pl-2 leading-6 slate-text text-sm font-normal font-medium leading-6'>
                    {item.organization?.name}
                  </span>
                </div>
              </>
            )}
            {/* </Link> */}
          </div>
          <div className=''>
            <h1 className='leading-8 text-xl font-medium text-gray-900 text-center md:text-left text-center mt-4 '>
              {item?.name}
            </h1>
          </div>
          <div className='flex justify-between items-center w-full my-4 similar-job-item-container'>
            <div className='leading-6 text-sm w-full'>{item?.city}</div>

            <div className='flex w-full justify-end items-center'>
              <img
                style={{ width: 16, height: 15 }}
                className='mr-2'
                src='/assets/images/icons/clock_icon.svg'
              />
              <span className='leading-6 text-sm'>
                <b className='font-bold'>Due:</b>{' '}
                {item?.endDate && format(item.endDate, 'MMMM dd, yyyy')}
              </span>
            </div>
          </div>
          <div className='flex items-end justify-end w-full m-0 p-0'>
            <FavoriteOpportunity
              user={user || undefined}
              opportunityId={item?.id}
              onUpdate={() => refreshUser()}
            />
          </div>
          <div className='mt-3 w-full flex justify-start items-start similar-job-item-description'>
            <p className='whitespace-pre-line break-word w-full overflow-hidden similar-job-item-description'>
              {item?.description}
            </p>
          </div>{' '}
        </div>

        <div className='flex justify-between items-center w-full'>
          <div className='flex justify-start items-center w-full'>
            <CertificationsList indexKey={item?.indexKey} opportunity={item} />{' '}
            <img
              style={{ width: 9, height: 12 }}
              className='mr-6'
              src='/assets/images/icons/right_arrow_icon.svg'
            />
          </div>
          <div className='w-full flex justify-end'>
            <span className='text-gray-600 leading-5 font-normal text-base'>
              See more
            </span>
          </div>{' '}
        </div>
      </div>
    );
  };

  const currentUrl = window.location.href;
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <HomeLayout>
      <Helmet>
        <title>
          Government Jobs | {slug ? slug.replaceAll('-', ' ') : 'Opportunity'}
        </title>
      </Helmet>
      <StyledDiv>
        <div className='w-full mx-auto mt-20 '>
          <div className='home-opportunity-wrapper relative w-full'>
            <div className='w-full flex md:flex-row flex-col justify-between items-center  relative w-1/6'>
              <div className='w-1/6'>
                {' '}
                <img
                  style={{ width: 128, marginBottom: 20 }}
                  className='absolute -top-10 left-5'
                  src='/assets/images/icons/building_big_icon.svg'
                />
              </div>
              <div className='flex md:justify-end md:items-start justify-center items-center md:text-left text-center flex-col w-4/6 lg:pt-4 md:pt-20 xl:pt-0 pt-20'>
                <div className='text-left flex justify-center items-center md:flex-row flex-col pt-4 pb-2'>
                  {!opportunity?.organization && (
                    <>
                      <img
                        style={{ width: 48 }}
                        src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX09PS+vr7Pz8/d3d3q6urv7+/y8vK7u7v39/ff39/MzMza2trGxsbBwcHk5OTz8/PU1NSV4ZV1AAAEA0lEQVR4nO2d6ZajIBBGFVmUTd7/aSfI4hLTY5x2wfnun24Odh/uIRGqipiqAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAXeqV3Qqwe+FebqfeiuvXrsm+Bkp2BdC3v14DdBzX5D1189+i1QsduwJuzq0W8BhjC8P8lQsS9QojxD8c3i1jYlGjYwnADDewHDNWB4L2C4Bgzvxf9n+Np1jp2cMZ4bfW6UbNh3UssuWVGntUsWXElN7BDVl2xo/e9Ghfmk0rdk0OiVb2jruwo2pDqEUkOisCWhK2RjbOgxXqpgQ2tiKOV7uIxx7vCiVaEhvPxTDKuZYfMMQx5emHoYeRukTNCleugioadYQ/9GFK/bSehizghRq3hnfc2vqGV4hxZsWFFFxoIE7wjpctbXOtIEpaINq7adbG7aZSv+UrThFmB4L2C4BgzvxdKQ8zFeqnrOJyXC3BgN+Q7Ocwss10NHnE1WrCFE5RFZJx2dGRpJvsfRk+uqiz2N37ikAj0bCuAuKnbve5p96JOL44voKbSChwsNFaKnYVMuNP9nw1qfe4rjX6KnvahTD3FsMGS/bUiuM2RyaJnwKo1SKlwXwn/5C6/SKw3DJJpmeqdJi94QLc7zNCUaVpakhJpX9Lm2tFr4NNxytdDfYe5g6Mc/7W7nrfgjGAr71UjblBa53PDvJMMvD7b1jzfkMDwGGK5RuOEPO//UVbQha9wkm2iVyotjRZXrZtnEIg2Z35vpuM5xZ3whKl5ofdcseirRMOxLhQlZ/Xg+rwnXDftSIf2UFmyYYoshRu3XKjP1JLYo2TBET7GY+DF6KtFwXiFdifFDWapgw6obGi526eGdF26tfPhYhukm0VORhlWja92kNKgv5Mu0drzurELOTiqUaVj10wxpxabZTc5i+FS24RZg+AEYHgQM14DhB2B4EDBco3jDntF32GSrU7hhS53U8h1Cx6x42YbUrJddxFi7LdxQfawrkbQNL9uQff70ukxR1WMNc/0dhh+4naHIbDRs35n1382QKBdRZINhT7vmnW56POhmhsb2+ZhWt8FQabPKeMb4fob5ktb+3dB+evNO/s99DTfMIZNLs0xeYwo31DCsYHgYv2w4vY0+0tAomyGPNNTTIPKhhvmP0tHGBxs+fw5heBYw9MAQhhEYHgQMPTCEYQSGBwFDDwz/V8O7RcDdm+GYj7CLse6cw2s/2ZWfQUuTYTc+cjbP4fwZtKLJV6TDxdpOHlQbDfNfsWsNzwSGMIThwvB8wdqdavhD5e8ozNmPjSCTMwknUOvuXMHXLO78jpKdNBd8t8nKKZEjOV8QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACr/AFpmWSuqvcLYwAAAABJRU5ErkJggg=='
                      />
                    </>
                  )}
                  {/* <Link to={`/organizations/${opportunity.organizationId}`}> */}
                  <img
                    style={{ width: 30, height: 30 }}
                    className='mr-1 opacity-50'
                    src={`/assets/images/icons/${changeIconForSectorType(
                      opportunity?.sectorType || undefined
                    )}.svg`}
                  />
                  {opportunity?.organization && (
                    <>
                      {/* <strong>
                          {opportunity.organization.name}
                        </strong> */}
                      {/* {!opportunity.organization.logoUrl && (
                        <img
                          style={{ width: 48 }}
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX09PS+vr7Pz8/d3d3q6urv7+/y8vK7u7v39/ff39/MzMza2trGxsbBwcHk5OTz8/PU1NSV4ZV1AAAEA0lEQVR4nO2d6ZajIBBGFVmUTd7/aSfI4hLTY5x2wfnun24Odh/uIRGqipiqAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAXeqV3Qqwe+FebqfeiuvXrsm+Bkp2BdC3v14DdBzX5D1189+i1QsduwJuzq0W8BhjC8P8lQsS9QojxD8c3i1jYlGjYwnADDewHDNWB4L2C4Bgzvxf9n+Np1jp2cMZ4bfW6UbNh3UssuWVGntUsWXElN7BDVl2xo/e9Ghfmk0rdk0OiVb2jruwo2pDqEUkOisCWhK2RjbOgxXqpgQ2tiKOV7uIxx7vCiVaEhvPxTDKuZYfMMQx5emHoYeRukTNCleugioadYQ/9GFK/bSehizghRq3hnfc2vqGV4hxZsWFFFxoIE7wjpctbXOtIEpaINq7adbG7aZSv+UrThFmB4L2C4BgzvxdKQ8zFeqnrOJyXC3BgN+Q7Ocwss10NHnE1WrCFE5RFZJx2dGRpJvsfRk+uqiz2N37ikAj0bCuAuKnbve5p96JOL44voKbSChwsNFaKnYVMuNP9nw1qfe4rjX6KnvahTD3FsMGS/bUiuM2RyaJnwKo1SKlwXwn/5C6/SKw3DJJpmeqdJi94QLc7zNCUaVpakhJpX9Lm2tFr4NNxytdDfYe5g6Mc/7W7nrfgjGAr71UjblBa53PDvJMMvD7b1jzfkMDwGGK5RuOEPO//UVbQha9wkm2iVyotjRZXrZtnEIg2Z35vpuM5xZ3whKl5ofdcseirRMOxLhQlZ/Xg+rwnXDftSIf2UFmyYYoshRu3XKjP1JLYo2TBET7GY+DF6KtFwXiFdifFDWapgw6obGi526eGdF26tfPhYhukm0VORhlWja92kNKgv5Mu0drzurELOTiqUaVj10wxpxabZTc5i+FS24RZg+AEYHgQM14DhB2B4EDBco3jDntF32GSrU7hhS53U8h1Cx6x42YbUrJddxFi7LdxQfawrkbQNL9uQff70ukxR1WMNc/0dhh+4naHIbDRs35n1382QKBdRZINhT7vmnW56POhmhsb2+ZhWt8FQabPKeMb4fob5ktb+3dB+evNO/s99DTfMIZNLs0xeYwo31DCsYHgYv2w4vY0+0tAomyGPNNTTIPKhhvmP0tHGBxs+fw5heBYw9MAQhhEYHgQMPTCEYQSGBwFDDwz/V8O7RcDdm+GYj7CLse6cw2s/2ZWfQUuTYTc+cjbP4fwZtKLJV6TDxdpOHlQbDfNfsWsNzwSGMIThwvB8wdqdavhD5e8ozNmPjSCTMwknUOvuXMHXLO78jpKdNBd8t8nKKZEjOV8QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACr/AFpmWSuqvcLYwAAAABJRU5ErkJggg=="
                        />
                      )} */}
                      {/* {opportunity.organization.logoUrl && (
                        <img
                          style={{ width: 48 }}
                          src={opportunity.organization.logoUrl}
                        />
                      )} */}

                      <a
                        href={opportunity.organization.websiteUrl}
                        target='_blank'
                        rel='noreferrer'
                      >
                        <p className='text-center md:text-left title-text font-medium text-base leading-6'>
                          {opportunity.sectorType && (
                            <span className='opportunity-sector-type'>
                              {opportunity.sectorType}{' '}
                            </span>
                          )}
                          {shortenName(
                            getOrganizationName(
                              opportunity.organization
                            ).toLocaleLowerCase(),
                            opportunity.source?.name
                          )
                            .replace(/(^\w{1})|(\s+\w{1})/g, (letter: any) =>
                              letter.toUpperCase()
                            )
                            .replace(/dla/gi, 'DLA')}
                        </p>
                      </a>
                      {/* {opportunity.organization.secondaryUrl && (
                        <p>
                          <a
                            href={opportunity.organization.secondaryUrl}
                            target='_blank'
                            rel='noreferrer'
                          >
                            {opportunity.organization.secondaryUrl}
                          </a>
                        </p>
                      )} */}
                    </>
                  )}
                  {/* </Link> */}
                </div>
                <div className=''>
                  <h1 className='text-3xl font-extrabold tracking-tight text-gray-900 text-center md:text-left text-center mt-4 md:mt-0'>
                    {opportunity?.name}
                  </h1>
                </div>
              </div>
              <div className='flex xl:flex-row lg:flex-col flex-col justify-between items-center w-1/6 lg:pt-0 md:pt-20 pt-10'>
                <button
                  onClick={handleClickOpen}
                  className='flex justify-between items-center border border-gray-300 hover:border-gray-400  rounded-md py-2 px-4'
                >
                  <img
                    alt=''
                    src='/assets/images/icons/new_share_icon.svg'
                    className='w-5 h-5 text-gray-500'
                  />
                  <span className='mx-3 text-gray-500 font-semibold w-10'>
                    Share{' '}
                  </span>
                </button>
                <ShareDialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby='alert-dialog-title'
                  aria-describedby='alert-dialog-description'
                >
                  <DialogTitle id='alert-dialog-title'>
                    Share This Page
                  </DialogTitle>
                  <DialogContent className='flex items-center justify-around'>
                    <EmailShareButton url={currentUrl}>
                      <EmailIcon size={32} round />
                    </EmailShareButton>
                    <FacebookShareButton url={currentUrl}>
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton url={currentUrl}>
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>

                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(currentUrl);
                        setCopied(true);
                      }}
                    >
                      {!copied ? 'Copy link' : 'Copied!'}
                    </Button>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                  </DialogActions>
                </ShareDialog>
                <div>
                  <FavoriteOpportunity
                    user={user || undefined}
                    opportunityId={opportunity?.id || 0}
                    onUpdate={() => refreshUser()}
                    detailView={true}
                  />
                </div>
              </div>
            </div>

            <div className='w-full flex justify-between items-start mt-10 md:flex-row flex-col md:px-0 px-6 '>
              <div className='flex flex-col justify-between items-start h-full min-h-full md:w-3/6 '>
                <div className='flex flex-col justify-start items-start text-left w-full'>
                  <h3 className='font-bold text-gray-900'>Haven Description</h3>
                  <div className='my-6 w-full'>
                    {opportunity && getHavenDescriptionHandler(opportunity)}
                  </div>
                </div>

                <div className='flex flex-col justify-start items-start text-left w-full'>
                  <h3 className='font-bold text-gray-900'>Details</h3>
                  <div className='my-6 w-full'>
                    {' '}
                    {loadingOpportunity && (
                      <p className='w-full mt-4 text-gray-500 font-semibold tracking-wide leading-loose ' />
                    )}
                    {opportunity && (
                      <div className='text-gray-500 font-semibold tracking-wide leading-loose w-full'>
                        <Truncate
                          width={1900}
                          lines={!expanded && 3}
                          ellipsis={
                            <span className='text-gray-500 font-semibold tracking-wide leading-loose w-full min-w-xl'>
                              ... <br />
                              <div className='py-8 w-full'>
                                <a
                                  className='text-blue-400 font-normal w-full'
                                  href='#'
                                  onClick={(e) => {
                                    setExpanded(expanded ? false : true);
                                    e.preventDefault();
                                    return false;
                                  }}
                                >
                                  {expanded ? 'Collapse' : 'Read More...'}
                                </a>
                              </div>
                            </span>
                          }
                        >
                          <div
                            className={`text-gray-500 font-semibold tracking-wide leading-loose description w-full`}
                            dangerouslySetInnerHTML={{
                              __html:
                                opportunity?.description ||
                                'No description found, please visit the source link below for full info.',
                            }}
                          ></div>
                        </Truncate>
                      </div>
                    )}
                  </div>
                </div>
                <div className='flex  flex-col justify-start items-start text-left w-full'>
                  <h3 className='font-bold text-gray-900'>Industry Codes</h3>
                  <div className='my-6 w-full'>
                    {loadingOpportunity && (
                      <p className='cp-paragraph w-full mt-4' />
                    )}

                    {opportunity && (
                      <>
                        {opportunity?.industrycodes &&
                          opportunity?.industrycodes.length === 0 && (
                            <p>Not Specified</p>
                          )}
                        {opportunity?.industrycodes &&
                          opportunity?.industrycodes.length > 0 && (
                            <div className='text-sm text-gray-900'>
                              {opportunity?.industrycodes?.map(
                                (industrycode, i) => (
                                  <div key={i}>
                                    {industrycode.code} - {industrycode.name} (
                                    {industrycode.type})
                                  </div>
                                )
                              )}
                            </div>
                          )}
                      </>
                    )}
                  </div>
                </div>
                <div className='flex  flex-col justify-start items-start text-left w-full'>
                  <h3 className='font-bold text-gray-900'>Keywords</h3>
                  <p></p>
                </div>
                <a
                  href={opportunity?.refUrl || '/'}
                  className='flex justify-between items-center bg-black border hover:border-black rounded-md py-2 px-2 w-30 mt-10'
                >
                  <span className='mx-3 text-white '>Go to Source</span>
                </a>
              </div>
              <ul className='my-2 lg:my-0 flex flex-col  justify-start items-start md:w-2/6 w-full mt-6 lg:mt-0 description-box p-10 rounded-xl'>
                <li className='flex flex-col lg:flex-row md:justify-start justify-start md:items-start lg:items-center w-full py-2 '>
                  <div className='text-gray-400 flex justify-start items-start w-44 mb-2 lg:mb-0'>
                    <img
                      alt=''
                      src='/assets/images/icons/status_new_icon.svg'
                      className='w-5 h-5 mr-2'
                    />
                    <span>Status</span>
                  </div>{' '}
                  <div>
                    {opportunity?.endDate ? (
                      new Date(opportunity?.endDate) > new Date() ? (
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800`}
                        >
                          Open
                        </span>
                      ) : (
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'}`}
                        >
                          Closed
                        </span>
                      )
                    ) : (
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800`}
                      >
                        Open
                      </span>
                    )}
                  </div>
                </li>
                <li className='flex flex-col lg:flex-row md:justify-start justify-start md:items-start lg:items-center w-full py-2 '>
                  <div className='text-gray-400 flex justify-start items-start w-44 mb-2 lg:mb-0'>
                    <img
                      alt=''
                      src='/assets/images/icons/clock_new_icon.svg'
                      className='w-5 h-5 mr-2'
                    />
                    <span>Due</span>
                  </div>{' '}
                  <div>
                    {' '}
                    <div className='text-left'>
                      {opportunity?.endDate &&
                      new Date(opportunity?.endDate) < new Date() ? (
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'}`}
                        >
                          Closed
                        </span>
                      ) : (
                        opportunity?.endDate &&
                        format(opportunity.endDate, 'MMMM dd, yyyy')
                      )}
                      {!opportunity?.endDate && '-'}
                    </div>
                    {opportunity?.secondaryUrl && (
                      <>
                        <h2 className='text-2xl font-extrabold tracking-tight text-gray-900 mt-8 mb-4'>
                          Links
                        </h2>
                        <div className='text-left'>
                          {opportunity?.secondaryUrl}
                        </div>
                      </>
                    )}
                  </div>
                </li>

                <li className='mt-2 lg:mt-8 flex flex-col lg:flex-row md:justify-start justify-start md:items-start lg:items-center w-full py-2'>
                  <div className='text-gray-400 flex justify-start items-start w-44 mb-2 lg:mb-0'>
                    <img
                      alt=''
                      src='/assets/images/icons/location_new_icon.svg'
                      className='w-5 h-5 mr-2'
                    />
                    <span>Location</span>
                  </div>
                  <div className='text-left'>
                    {' '}
                    {opportunity?.placeOfPerformance ? (
                      <>
                        {opportunity?.placeOfPerformance.replace(
                          'undefined',
                          ''
                        )}
                      </>
                    ) : (
                      <>
                        {!opportunity?.city &&
                          !opportunity?.state &&
                          'Not Specified'}
                        {opportunity?.city} {opportunity?.state}
                      </>
                    )}
                  </div>
                </li>
                <li className='my-2 lg:mb-8 flex flex-col lg:flex-row md:justify-start justify-start md:items-start lg:items-center w-full pb-2'>
                  <div className='text-gray-400 flex justify-start items-start w-44 mb-2 lg:mb-0'>
                    <img
                      alt=''
                      src='/assets/images/icons/reference_new_icon.svg'
                      className='w-5 h-5 mr-2'
                    />
                    <span>Reference ID</span>
                  </div>
                  <div>
                    <a
                      target='_blank'
                      href={opportunity?.refUrl}
                      rel='noreferrer'
                      style={{
                        wordWrap: 'break-word',
                      }}
                    >
                      <div className='font-normal text-black flex justify-center items-center'>
                        <div>
                          #<strong>{opportunity?.refId}</strong>{' '}
                        </div>
                        <img
                          alt=''
                          src='/assets/images/icons/external_arrow_icon.svg'
                          className='w-3 h-3 ml-2'
                        />
                      </div>
                    </a>
                  </div>
                </li>
                {/* <li className='my-2 lg:my-0 flex flex-col lg:flex-row md:justify-start justify-start md:items-start lg:items-center w-full py-2'>
                  <div className='text-gray-400 flex justify-start items-start w-44 mb-2 lg:mb-0'>
                    <img
                      alt=''
                      src='/assets/images/icons/url_icon.svg'
                      className='w-5 h-5 mr-2'
                    />
                    <span>URL</span>
                  </div>
                  <div>
                    <a
                      target='_blank'
                      href={opportunity?.source?.websiteUrl}
                      rel='noreferrer'
                    >
                      {opportunity?.source?.websiteUrl}
                    </a>
                  </div>
                </li>*/}
                {/* <li className="my-2 lg:my-0 flex flex-col lg:flex-row md:justify-start justify-start md:items-start lg:items-center w-full py-2">
                  <div className="text-gray-400 flex justify-start items-start w-44 mb-2 lg:mb-0">
                    <img
                      alt=""
                      src="/assets/images/icons/assignee_icon.svg"
                      className="w-5 h-5 mr-2"
                    />
                    <span>Assignee</span>
                  </div>
                  <div className="flex md:justify-center justify-start items-center">
                    <img className="w-6 h-6 rounded-full mr-1 border border-gray-400 " />
                    <span>Maxi Maurer</span>
                  </div>
                </li>  */}
                {opportunity?.contactName && (
                  <li className='my-2 lg:my-0 flex flex-col lg:flex-row md:justify-start justify-start md:items-start lg:items-center w-full py-2'>
                    <div className='text-gray-400 flex justify-start items-start w-44 mb-2 lg:mb-0'>
                      <img
                        alt=''
                        src='/assets/images/icons/contact_new_icon.svg'
                        className='w-5 h-5 mr-2'
                      />
                      <span>Contact</span>
                    </div>

                    <div className=''>
                      <p className='py-1 lg:py-0'>{opportunity?.contactName}</p>
                    </div>
                  </li>
                )}

                {opportunity?.contactEmail && (
                  <li className='my-2 lg:my-0 flex flex-col lg:flex-row md:justify-start justify-start md:items-start lg:items-center w-full py-2'>
                    <div className='text-gray-400 flex justify-start items-start w-44 mb-2 lg:mb-0'>
                      <img
                        alt=''
                        src='/assets/images/icons/contact_email_icon.svg'
                        className='w-5 h-5 mr-2'
                      />
                      <span>Email</span>
                    </div>

                    <div className=''>
                      <p className='py-1 lg:py-0'>
                        {opportunity?.contactEmail}
                      </p>
                    </div>
                  </li>
                )}

                {opportunity?.contactPhone && (
                  <li className='my-2 lg:my-0 flex flex-col lg:flex-row md:justify-start justify-start md:items-start lg:items-center w-full py-2'>
                    <div className='text-gray-400 flex justify-start items-start w-44 mb-2 lg:mb-0'>
                      <img
                        alt=''
                        src='/assets/images/icons/contact_phone_icon.svg'
                        className='w-5 h-5 mr-2'
                      />
                      <span>Phone</span>
                    </div>
                    <div className=''>
                      {opportunity?.contactPhone && (
                        <p className='py-1 lg:py-0'>
                          {opportunity?.contactPhone}
                        </p>
                      )}
                    </div>
                  </li>
                )}

                <li className='flex lg:mt-8  flex-col lg:flex-row md:justify-start justify-start md:items-start lg:items-center w-full py-2'>
                  <div className='text-gray-400 flex justify-start items-start w-44 mb-2 lg:mb-0'>
                    <img
                      alt=''
                      src='/assets/images/icons/group_new_icon.svg'
                      className='w-5 h-5 mr-2'
                    />
                    <span>Group</span>
                  </div>
                  <div className='my-2 lg:my-0'>
                    {/* {opportunity?.certifications?.some(
                      (cert) => cert.isHavenOpp
                    ) && (
                      <div>
                        <Tooltip
                          title={
                            'Haven Opportunities mean that they have been approved and qualify for minority and disadvantaged businesses'
                          }
                        >
                          <img
                            alt=''
                            style={{ height: 40 }}
                            src='/assets/images/haven-op.png'
                            className='w-full my-3 lg:my-0'
                          />
                        </Tooltip>
                      </div>
                    )}*/}

                    {opportunity?.certifications && (
                      <CertificationsList
                        opportunity={opportunity}
                        indexKey={opportunity?.refUrl}
                      />
                    )}
                  </div>
                </li>
                <li className='flex flex-col lg:flex-row md:justify-start justify-start md:items-start lg:items-center w-full py-2'>
                  <div className='text-gray-400 flex justify-start items-start w-44 mb-2 lg:mb-0'>
                    <img
                      alt=''
                      className='w-5 h-5 mr-2'
                      src='/assets/images/icons/certifications_new_icon.svg'
                    />
                    <span>Certifications</span>
                  </div>
                  <div className='handle-certifications-and-group mt-6'>
                    {loadingOpportunity && <p className='w-full mt-4' />}

                    {opportunity && (
                      <div className='lg:px-3 xl:px-0'>
                        {opportunity?.certifications &&
                          opportunity?.certifications.length === 0 && (
                            <p>Not Specified</p>
                          )}
                        {opportunity?.certifications &&
                          opportunity?.certifications.length > 0 && (
                            <>
                              <CertificationLabels
                                certifications={opportunity?.certifications}
                              />
                            </>
                          )}
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-2xl text-center my-5 md:text-left'>
                Similar Opportunities
              </h3>

              {/* 
              <div>
                <div className='border-b border-gray-200'>
                  <nav
                    className='-mb-px flex flex-col items-center justify-start md:flex-row'
                    aria-label='Tabs'
                  >
                    <button
                      type='button'
                      onClick={() => setActiveSimilarJobsTab(1)}
                      className={classNames(
                        activeSimilarJobsTab == 1
                          ? 'border-blue-400 text-blue-400'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                        'cursor-pointer border-t-2 border-b-2  py-4 px-1 text-center text-sm font-medium  md:border-t-0 md:mr-2'
                      )}
                    >
                      View all
                    </button>

                    <button
                      type='button'
                      onClick={() => setActiveSimilarJobsTab(2)}
                      className={classNames(
                        activeSimilarJobsTab == 2
                          ? 'border-blue-400 text-blue-400'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                        'cursor-pointer border-t-2 border-b-2  py-4 px-1 text-center text-sm font-medium md:border-t-0 md:mx-2'
                      )}
                    >
                      Keyword
                    </button>
                    <button
                      type='button'
                      onClick={() => setActiveSimilarJobsTab(3)}
                      className={classNames(
                        activeSimilarJobsTab == 3
                          ? 'border-blue-400 text-blue-400'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                        'cursor-pointer border-t-2 border-b-2  py-4 px-1 text-center text-sm font-medium  md:border-t-0 md:mx-2'
                      )}
                    >
                      Certification
                    </button>
                    <button
                      type='button'
                      onClick={() => setActiveSimilarJobsTab(4)}
                      className={classNames(
                        activeSimilarJobsTab == 4
                          ? 'border-blue-400 text-blue-400'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                        'cursor-pointer border-t-2 border-b-2  py-4 px-1 text-center text-sm font-medium  md:border-t-0 md:mx-2'
                      )}
                    >
                      Industry Code
                    </button>
                  </nav>
                </div>
              </div>*/}
              <Swiper
                className='overflow-hidden'
                spaceBetween={50}
                breakpoints={{
                  576: {
                    // width: 576,
                    slidesPerView: 1,
                  },
                  768: {
                    // width: 768,
                    slidesPerView: 2,
                  },
                  1099: {
                    // width: 768,
                    slidesPerView: 3,
                  },
                }}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
              >
                {opportunities?.data?.map((item: any, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <SimilarJob
                        item={item}
                        className={
                          item.certifications[0]?.friendlyNames?.length == 1
                            ? getFriendlyCertificationColorRevisedDot(
                                item.certifications[0].friendlyNames[0]
                              )
                            : 'border-gray-300'
                        }
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <hr
              style={{ border: '1px solid rgba(0, 0, 0, 0.12)' }}
              className='my-20'
            />
            <div className='relative'>
              <img
                className='transform absolute -top-10 md:top-16 bottom-0 z-50 left-0'
                src='/assets/images/icons/opportunity_detail_plane_icon.svg'
              />
              <div className='bg-transparent mt-10 md:py-10 pt-20 pb-10'>
                <div className=''>
                  <div className='mx-auto  max-w-xl px-4 text-center flex justify-center items-center flex-col'>
                    <img
                      alt=''
                      src='/assets/images/icons/haven_colorless_icon.svg'
                      style={{ width: '36.72px', height: '34.39px' }}
                    />
                    <h2 className='text-2xl  lg:text-2xl mt-6'>
                      Haven Learning
                    </h2>
                    <p className='text-gray-400 font-normal mt-6'>
                      This section is for the quick tips that help with this
                      oppertunity type
                    </p>
                  </div>
                </div>
                <div className='mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8'>
                  <div className='mx-auto max-w-3xl divide-y-2 divide-gray-200'>
                    <dl className=' space-y-6 divide-y divide-gray-200'>
                      {faqs.map((faq, index) => {
                        return (
                          <Disclosure as='div' key={index} className='pt-6'>
                            {({ open }: any) => (
                              <>
                                <dt className='text-lg'>
                                  <Disclosure.Button className='flex w-full items-start justify-between text-left text-gray-400'>
                                    <span className='font-medium text-gray-900'>
                                      {faq.title}
                                    </span>
                                    <span className='ml-6 flex h-7 items-center'>
                                      {open ? (
                                        <img
                                          className='transform'
                                          src='/assets/images/icons/minus_icon.svg'
                                        />
                                      ) : (
                                        <img
                                          className='transform'
                                          src='/assets/images/icons/plus_icon.svg'
                                        />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </dt>
                                <Disclosure.Panel
                                  as='dd'
                                  className='mt-6 pr-12'
                                >
                                  <p className='text-base text-gray-500'>
                                    {faq.text}
                                  </p>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        );
                      })}
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{ height: 294 }}
              className='w-full justify-center items-center flex flex-col text-center mt-10 relative slate-bg'
            >
              <div className='flex justify-center items-center relative'>
                <img
                  className='transform relative z-10 pt-3 pr-2'
                  src='/assets/images/person_image_2.png'
                />
                <img
                  className='transform absolute top-0 bottom-0 z-50'
                  src='/assets/images/person_image_1.png'
                />
                <img
                  className='transform relative z-10 pt-3 pl-2'
                  src='/assets/images/person_image_3.png'
                />
              </div>

              <h2 className='text-lg font-bold mt-6'>
                Any questions or feedback on this opportunity?
              </h2>
              <p className='text-gray-400 font-normal mt-2'>
                We promise we don’t bite, reach out to us :)
              </p>
              <button className='mt-6 flex justify-between items-center bg-black border hover:border-black  rounded-md py-2 px-4   w-30'>
                <span className='mx-3 text-white '>Get in touch </span>
              </button>
            </div>
            {!user && <PleaseLoginDialog />}
          </div>
        </div>
      </StyledDiv>
    </HomeLayout>
  );
};

export default HomeOpportunityPage;
