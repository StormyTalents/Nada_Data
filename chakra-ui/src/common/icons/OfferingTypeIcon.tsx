import React, { SVGProps } from 'react';

const OfferingTypeIcon: React.FC<
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
      <rect
        x='16'
        y='11'
        width='62'
        height='78'
        rx='5'
        stroke={primary || '#0E4DA4'}
        strokeWidth='6'
      />
      <mask id='path-2-inside-1' fill='white'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M56.4003 5H60C62.7614 5 65 7.23858 65 10V15C65 16.1046 64.1046 17 63 17H31C29.8954 17 29 16.1046 29 15V10C29 7.23858 31.2386 5 34 5H37.5997C38.5101 3.21916 40.3627 2 42.5 2H51.5C53.6373 2 55.4899 3.21916 56.4003 5Z'
        />
      </mask>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M56.4003 5H60C62.7614 5 65 7.23858 65 10V15C65 16.1046 64.1046 17 63 17H31C29.8954 17 29 16.1046 29 15V10C29 7.23858 31.2386 5 34 5H37.5997C38.5101 3.21916 40.3627 2 42.5 2H51.5C53.6373 2 55.4899 3.21916 56.4003 5Z'
        fill='white'
      />
      <path
        d='M56.4003 5L52.8387 6.82068L53.9527 9H56.4003V5ZM37.5997 5V9H40.0473L41.1613 6.82068L37.5997 5ZM56.4003 9H60V1H56.4003V9ZM60 9C60.5523 9 61 9.44771 61 10H69C69 5.02944 64.9706 1 60 1V9ZM61 10V15H69V10H61ZM61 15C61 13.8954 61.8954 13 63 13V21C66.3137 21 69 18.3137 69 15H61ZM63 13H31V21H63V13ZM31 13C32.1046 13 33 13.8954 33 15H25C25 18.3137 27.6863 21 31 21V13ZM33 15V10H25V15H33ZM33 10C33 9.44772 33.4477 9 34 9V1C29.0294 1 25 5.02944 25 10H33ZM34 9H37.5997V1H34V9ZM41.1613 6.82068C41.4147 6.32509 41.9228 6 42.5 6V-2C38.8025 -2 35.6055 0.113237 34.0381 3.17932L41.1613 6.82068ZM42.5 6H51.5V-2H42.5V6ZM51.5 6C52.0772 6 52.5853 6.32509 52.8387 6.82068L59.9619 3.17932C58.3945 0.113239 55.1975 -2 51.5 -2V6Z'
        fill={primary || '#0E4DA4'}
        mask='url(#path-2-inside-1)'
      />
      <path
        d='M26 32.3158L30 36L36 26'
        stroke={primary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M26 52.3158L30 56L36 46'
        stroke={primary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M26 72.3158L30 76L36 66'
        stroke={primary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M44 26H66'
        stroke={primary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M44 46H66'
        stroke={primary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M44 66H66'
        stroke={primary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M44 36H58'
        stroke={primary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M44 56H53'
        stroke={primary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M44 76H62'
        stroke={primary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default OfferingTypeIcon;
