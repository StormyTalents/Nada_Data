import React, { SVGProps } from 'react';

const OfferingPriceIcon: React.FC<
  SVGProps<SVGSVGElement> & { primary?: string; secondary?: string }
> = ({ primary, secondary, ...props }) => {
  return (
    <svg
      width='94'
      height='94'
      viewBox='0 0 94 94'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M36 65.5L11 32L47 59'
        stroke={secondary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M35 74V71C35 64.3726 40.3726 59 47 59C53.6274 59 59 64.3726 59 71V74'
        stroke={secondary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M55.5 30C53.567 30 52 31.567 52 33.5C52 35.433 53.567 37 55.5 37C57.433 37 59 35.433 59 33.5C59 31.567 57.433 30 55.5 30Z'
        fill={secondary || '#1A406E'}
      />
      <path
        d='M22 27.4089C29.1803 22.0473 37.929 19.0686 47 19C70.37 19.1767 89.1726 38.264 88.9988 61.6347V70C88.9988 72.7614 86.7602 75 83.9988 75H10.0013C7.23983 75 5.00126 72.7614 5.00126 70V61.6459C4.95682 55.8774 6.091 50.2213 8.27312 45'
        stroke={primary || '#0E4DA4'}
        strokeWidth='6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M77.5 58C75.567 58 74 59.567 74 61.5C74 63.433 75.567 65 77.5 65C79.433 65 81 63.433 81 61.5C81 59.567 79.433 58 77.5 58Z'
        fill={secondary || '#1A406E'}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16.5 58C14.567 58 13 59.567 13 61.5C13 63.433 14.567 65 16.5 65C18.433 65 20 63.433 20 61.5C20 59.567 18.433 58 16.5 58Z'
        fill={secondary || '#1A406E'}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M69.5 42C67.567 42 66 43.567 66 45.5C66 47.433 67.567 49 69.5 49C71.433 49 73 47.433 73 45.5C73 43.567 71.433 42 69.5 42Z'
        fill={secondary || '#1A406E'}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M38.5 30C36.567 30 35 31.567 35 33.5C35 35.433 36.567 37 38.5 37C40.433 37 42 35.433 42 33.5C42 31.567 40.433 30 38.5 30Z'
        fill={secondary || '#1A406E'}
      />
    </svg>
  );
};

export default OfferingPriceIcon;
