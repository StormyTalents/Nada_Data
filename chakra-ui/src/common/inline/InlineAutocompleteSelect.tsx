import {
  FormControl,
  FormHelperText,
  Grid,
  GridProps,
  TextField,
  Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useField, useFormikContext } from 'formik';
import React, { useMemo } from 'react';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  .error-label {
    color: ${(props) => props.theme.palette.error.main};
  }
`;
export interface InlineAutocompleteSelectProps {
  name: string;
  label: string;
  optionLabel: (optionLabel: any) => string;
  error?: string;
  disabled?: boolean;
  options?: object[];
  grid?: GridProps;
}

const InlineAutocompleteSelect: React.FC<InlineAutocompleteSelectProps> = (
  props
) => {
  let { label, name, error, disabled, options, optionLabel, grid } = props;
  const formik = useFormikContext();
  const [field, meta, { setValue, setTouched }] = useField(props.name);
  if (!grid) {
    grid = { xs: 12 };
  }

  const handleChange = (event: any, values: any) => {
    setValue(values.id);
    formik.submitForm();
  };

  return useMemo(
    () => (
      <StyledGrid item className="inline-multi-select" {...grid}>
        <Typography
          variant="h5"
          gutterBottom
          className={error || meta.error ? 'error-label' : ''}
        >
          {label}
        </Typography>
        <FormControl
          error={meta.touched && Boolean(meta.error)}
          component="fieldset"
          {...field}
          name={name}
        >
          <Autocomplete
            options={options as any[]}
            getOptionLabel={optionLabel}
            defaultValue={options?.find(
              (option: any) => option.id === field.value
            )}
            disabled={disabled}
            renderInput={(params) => (
              <>
                <TextField {...params} variant="outlined" />
              </>
            )}
            onChange={handleChange}
          />
          {(error || meta.error) && (
            <FormHelperText error>{error || meta.error}</FormHelperText>
          )}
        </FormControl>
      </StyledGrid>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [field.value, meta.error, label, options]
  );
};

export default InlineAutocompleteSelect;
