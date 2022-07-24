import { InputBase, InputBaseProps } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const StyledInputBase = styled(InputBase)`
  padding: 0 8px;
  &:hover,
  &:focus-within {
    border: solid 1px #ccc;
    border-radius: 4px;
    margin: -1px;
  }
  &:focus-within {
    background: #fff;
  }
  &.MuiInputBase-multiline {
    padding: 8px;
    background: #f4f4f4;
    &:hover,
    &:focus-within {
      background: #fff;
    }
  }
`;

export const ConfigInput: React.FC<
  React.ComponentProps<typeof StyledInputBase> & InputBaseProps
> = props => {
  return <StyledInputBase {...props} />;
};

export default ConfigInput;
