import { useField, useFormikContext } from 'formik';
import React, { useMemo } from 'react';
import styled from 'styled-components';

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  GridProps,
  Typography,
} from '@material-ui/core';

const StyledGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  .error-label {
    color: ${(props) => props.theme.palette.error.main};
  }
`;

export interface InlineMultiSelectOption {
  value: string;
  label: string;
}

export interface InlineMultiSelectProps {
  name: string;
  label: string;
  value?: string[];
  error?: string;
  disabled?: boolean;
  options?: (InlineMultiSelectOption | string)[];
  grid?: GridProps;
}

const InlineMultiSelect: React.FC<InlineMultiSelectProps> = (props) => {
  let { label, name, error, disabled, options, grid, children } = props;
  const formik = useFormikContext();
  const [field, meta, { setValue, setTouched }] = useField(props);
  if (!grid) {
    // default field to expand entire width of form
    grid = { xs: 12 };
  }
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    // field.onChange(event);

    let values = [...field.value];
    if (values.includes(value)) {
      values = values.filter((item) => item !== value);
      setValue(values);
    } else {
      values.push(value);
      setValue(values);
    }
    // setTouched(true);
    formik.submitForm();
  };
  return useMemo(
    () => (
      <StyledGrid item className='inline-multi-select' {...grid}>
        <Typography
          variant='h5'
          gutterBottom
          className={error || meta.error ? 'error-label' : ''}
        >
          {label}
        </Typography>
        <FormControl
          error={meta.touched && Boolean(meta.error)}
          component='fieldset'
          {...field}
          name={name}
        >
          <FormGroup>
            {options &&
              options.map((option) =>
                typeof option === 'string' ? (
                  <FormControlLabel
                    key={option}
                    control={
                      <Checkbox
                        value={option}
                        color='primary'
                        disabled={disabled}
                        checked={field.value?.includes(option)}
                        onChange={(event) => handleChange(event, option)}
                      />
                    }
                    label={option}
                  />
                ) : (
                  <FormControlLabel
                    key={option.value}
                    control={
                      <Checkbox
                        value={option.value}
                        color='primary'
                        disabled={disabled}
                        checked={field.value?.includes(option.value)}
                        onChange={(event) => handleChange(event, option.value)}
                      />
                    }
                    label={option.label}
                  />
                )
              )}
            {children}
          </FormGroup>
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

export default InlineMultiSelect;
