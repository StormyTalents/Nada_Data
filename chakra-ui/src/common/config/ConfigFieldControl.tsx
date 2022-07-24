import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  box-sizing: border-box;
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    padding-bottom: 0;
  }
  .checkbox {
    box-sizing: border-box;
    padding: 2px 9px;
  }
`;

export type ConfigFieldControlProps = React.ComponentProps<typeof StyledDiv>;

export const ConfigFieldControl: React.FC<ConfigFieldControlProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <StyledDiv
      className={`config-field-control${className ? ` ${className}` : ''}`}
    >
      {children}
    </StyledDiv>
  );
};

export default ConfigFieldControl;
