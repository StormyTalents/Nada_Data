import React, { SVGProps } from 'react';

const OfferingSharesIcon: React.FC<
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
        d='M89 43V14C89 11.2386 86.7614 9 84 9H10C7.23858 9 5 11.2386 5 14V62C5 64.7614 7.23858 67 10 67H47'
        stroke={primary || '#0E4DA4'}
        strokeWidth='6'
        strokeLinecap='round'
      />
      <path
        d='M60.0603 68L53 76.2569L59.526 77.5059L62.1364 85L69 74.5782'
        stroke={secondary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M84.381 68L91 76.2569L84.8819 77.5059L82.4346 85L76 74.5782'
        stroke={secondary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M72 74C79.732 74 86 67.732 86 60C86 52.268 79.732 46 72 46C64.268 46 58 52.268 58 60C58 67.732 64.268 74 72 74Z'
        stroke={secondary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M72 67C75.866 67 79 63.866 79 60C79 56.134 75.866 53 72 53C68.134 53 65 56.134 65 60C65 63.866 68.134 67 72 67Z'
        stroke={secondary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18 22H77'
        stroke={secondary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18 30H70'
        stroke={secondary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18 38H58'
        stroke={secondary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18 46H47'
        stroke={secondary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18 54H47'
        stroke={secondary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default OfferingSharesIcon;
