import React, { SVGProps } from 'react';

const OfferingInvestorsIcon: React.FC<
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
        d='M71 55L55 58'
        stroke={secondary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M56.0553 38.9524L47.5518 42.5899C46.196 43.1571 44.6695 43.1351 43.3302 42.5289C41.9726 41.9152 40.9143 40.7766 40.3916 39.3675C39.3362 36.6223 40.4779 33.512 43.048 32.1306L51.5477 27.8379C53.4062 26.8627 55.5865 26.7326 57.5453 27.4799L72.5 34.5'
        stroke={secondary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M23 58.2463H28.712L39.5969 66.9521C40.6552 68.206 42.4709 68.3549 43.7024 67.289L58.9106 54.1217C60.16 53.0375 60.3638 51.1097 59.3711 49.765L52 41'
        stroke={secondary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M43 31.9976L42.1086 31.2699C40.3116 29.9332 37.9566 29.629 35.8834 30.4657L23 36'
        stroke={secondary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9 60.994H18.6477C20.9209 61.1148 22.8656 59.3912 23 57.1365V37.8599C22.8637 35.6067 20.9196 33.8852 18.6477 34.006H9'
        stroke={secondary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M86 60.994H75.6632C73.2276 61.1148 71.144 59.3912 71 57.1365V37.8599C71.1461 35.6067 73.229 33.8852 75.6632 34.006H86'
        stroke={secondary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M47 87C69.0914 87 87 69.0914 87 47C87 24.9086 69.0914 7 47 7C24.9086 7 7 24.9086 7 47C7 69.0914 24.9086 87 47 87Z'
        stroke={primary || '#0E4DA4'}
        strokeWidth='6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default OfferingInvestorsIcon;
