import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

export type ConfigContentProps = React.ComponentProps<typeof StyledDiv>;

export const ConfigContent: React.FC<ConfigContentProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <StyledDiv
      className={`config-content${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
    </StyledDiv>
  );
};

export default ConfigContent;
