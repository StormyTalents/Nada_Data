import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  border-bottom: 1px solid #ccc;
`;

export type ConfigCardProps = React.ComponentProps<typeof StyledDiv>;

export const ConfigCard: React.FC<ConfigCardProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <StyledDiv
      className={`config-card${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
    </StyledDiv>
  );
};

export default ConfigCard;
