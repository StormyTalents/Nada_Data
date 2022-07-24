import { useField, useFormikContext } from 'formik';
import React from 'react';
import styled from 'styled-components';

import {
  FormControlTypeMap,
  Grid,
  GridProps,
  Typography
} from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

import IconPicker from './IconPicker';

const StyledGrid = styled(Grid)``;

export interface InlineIconPickerProps {
  name: string;
  label?: string;
  grid?: GridProps<OverridableComponent<FormControlTypeMap<{}, 'div'>>>;
}

const InlineIconPicker: React.FC<InlineIconPickerProps> = props => {
  let { label, grid } = props;
  const formik = useFormikContext();
  const [field, , { setValue }] = useField(props);
  if (!grid) {
    // default field to expand entire width of form
    grid = { xs: 12 };
  }
  return (
    <StyledGrid item {...grid}>
      {label && (
        <Typography variant='h5' gutterBottom>
          {label}
        </Typography>
      )}
      <IconPicker
        value={field.value || ''}
        onChange={icon => {
          setValue(icon);
          formik.submitForm();
        }}
      />
    </StyledGrid>
  );
};

export default InlineIconPicker;
