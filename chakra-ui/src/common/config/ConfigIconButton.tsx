import React from 'react';

import { IconButton, withStyles } from '@material-ui/core';

export const StyledIconButton = withStyles({})(IconButton);

const ConfigIconButton: React.FC<
  React.ComponentProps<typeof StyledIconButton>
> = ({ children, size, ...props }) => {
  return (
    <StyledIconButton size={size || 'small'} {...props}>
      {children}
    </StyledIconButton>
  );
};

export default ConfigIconButton;
