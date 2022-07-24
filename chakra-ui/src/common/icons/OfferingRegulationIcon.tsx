import React, { SVGProps } from 'react';

const OfferingRegulationIcon: React.FC<
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
        d='M43 46L59 31'
        stroke={primary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M59 31L61.0455 17.4952L72.7424 6L74.5503 15.4497L84 17.2576L72.5048 28.9545L59 31Z'
        stroke={primary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M79.8231 37.8179C83.7835 53.0427 77.5277 69.1111 64.3797 77.4857C51.2316 85.8602 34.2425 84.5976 22.4388 74.3686C10.6351 64.1396 6.7561 47.318 12.8628 32.8414C18.9694 18.3648 33.6446 9.5927 49.0912 11.1858'
        stroke={primary || '#0E4DA4'}
        strokeWidth='6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M64.4254 42.4264C66.4278 50.294 63.0873 58.5331 56.1072 62.9427C49.127 67.3522 40.0445 66.9611 33.4907 61.9687C26.937 56.9763 24.3554 48.4821 27.0624 40.8173C29.7693 33.1525 37.1686 28.0053 45.4873 28'
        stroke={primary || '#1A406E'}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M27 78L24 88'
        stroke={primary || '#0E4DA4'}
        strokeWidth='6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M65 78L68 88'
        stroke={primary || '#0E4DA4'}
        strokeWidth='6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default OfferingRegulationIcon;
