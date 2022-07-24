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
        d='M63.6875 45.0522L54.6165 35.9812C53.6543 34.8525 52.2457 34.2023 50.7625 34.2023C49.2793 34.2023 47.8707 34.8525 46.9085 35.9812C42.6824 40.2073 52.3918 56.3479 48.154 60.5857C47.1455 61.6331 45.754 62.2249 44.3 62.2249C42.846 62.2249 41.4545 61.6331 40.446 60.5857L31.375 51.5147'
        stroke={secondary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M57.2251 38.5897L62.07 33.7448'
        stroke={secondary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M32.9888 62.826L37.8376 57.9772'
        stroke={secondary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M71.5 26C73.9853 26 76 23.9853 76 21.5C76 19.0147 73.9853 17 71.5 17C69.0147 17 67 19.0147 67 21.5C67 23.9853 69.0147 26 71.5 26Z'
        stroke={secondary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M83.232 5.00001H48.2355C46.6422 5.00001 45.1194 5.65735 44.028 6.81819L6.56007 46.6574C5.49037 47.7931 4.9296 49.3157 5.00709 50.874C5.08457 52.4322 5.79364 53.8917 6.97074 54.9157L44.42 87.5792C46.7649 89.62 50.3036 89.4419 52.4318 87.176L87.4469 49.7785C88.4439 48.7151 88.9991 47.3123 89 45.8547V10.7495C88.998 9.22199 88.3891 7.75792 87.3073 6.67958C86.2254 5.60124 84.7594 4.99705 83.232 5.00001Z'
        stroke={primary || '#0E4DA4'}
        strokeWidth='6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default OfferingPriceIcon;
