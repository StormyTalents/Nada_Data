import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';

export const ConfigTextField: React.FC<TextFieldProps> = ({
  children,
  ...props
}) => {
  return (
    <TextField variant='outlined' {...props}>
      {children}
    </TextField>
  );
};

export default ConfigTextField;
