import React, { SVGProps } from 'react';

const OfferingValuationIcon: React.FC<
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
        d='M77.7504 28C79.2028 31.7192 80 35.7665 80 40C80 58.2254 65.2254 73 47 73C28.7746 73 14 58.2254 14 40C14 21.7746 28.7746 7 47 7C52.4013 7 57.4996 8.29767 62 10.5983'
        stroke={primary || '#0E4DA4'}
        strokeWidth='6'
        strokeLinecap='round'
      />
      <path
        d='M40.9999 16.7561C33.073 18.7964 26.731 24.7847 24.1951 32.5'
        stroke={secondary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
      />
      <path
        d='M27.4252 68C24.596 68 22.1512 69.9764 21.5584 72.7428L19.8441 80.7428C19.0438 84.4779 21.8911 88 25.711 88H67.289C71.1089 88 73.9562 84.4779 73.1559 80.7428L71.4416 72.7428C70.8488 69.9764 68.404 68 65.5748 68H27.4252Z'
        fill='white'
        stroke={primary || '#0E4DA4'}
        strokeWidth='6'
      />
      <path
        d='M71 8L72.5274 16.0908L79 18L72.5274 19.9092L71 28L69.4726 19.9092L63 18L69.4726 16.0908L71 8Z'
        fill={secondary || '#1A406E'}
      />
      <path
        d='M62 27L63.096 31.6848L67 33L63.096 34.3152L62 39L60.904 34.3152L57 33L60.904 31.6848L62 27Z'
        fill={secondary || '#1A406E'}
      />
      <path
        d='M85 9L85.8768 12.5136L89 13.5L85.8768 14.4864L85 18L84.1232 14.4864L81 13.5L84.1232 12.5136L85 9Z'
        fill={secondary || '#1A406E'}
      />
    </svg>
  );
};

export default OfferingValuationIcon;
