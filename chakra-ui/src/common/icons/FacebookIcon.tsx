import React, { SVGProps } from 'react';

const FacebookIcon: React.FC<
  SVGProps<SVGSVGElement> & { primary?: string; secondary?: string }
> = ({ primary, secondary, ...props }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M18 1.5C18 1.5 16.5 1 15.5 1C12 1 9 3 9 6V9H6.00937C5.45191 9 5 9.44335 5 10.0094V11.9906C5 12.5481 5.44335 13 6.00937 13H9V22.0046C9 22.5543 9.44335 23 10.0094 23H11.9906C12.5481 23 13 22.5443 13 22.0046V13H15.9906C16.5481 13 17.107 12.5719 17.2421 12.0317L17.7579 9.96829C17.8916 9.43352 17.5563 9 17.0002 9H13V7C13 5.89543 13.8939 5 15.0049 5H18V1.5Z'
        stroke='white'
        strokeWidth='2'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default FacebookIcon;
