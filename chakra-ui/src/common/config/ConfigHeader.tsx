import React, { ComponentProps, HTMLProps } from 'react';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding: 12px 12px 8px 12px;
  .header-title {
    flex: 1;
  }
`;

export type ConfigHeaderProps = ComponentProps<typeof StyledDiv> &
  HTMLProps<HTMLDivElement> & {
    end?: JSX.Element;
  };

export const ConfigHeader: React.FC<ConfigHeaderProps> = ({
  className,
  end,
  children,
  ...props
}) => {
  return (
    <StyledDiv
      className={`config-header${className ? ` ${className}` : ''}`}
      {...props}
    >
      <Typography variant='overline' className='header-title'>
        {children}
      </Typography>
      {end}
    </StyledDiv>
  );
};

export default ConfigHeader;
