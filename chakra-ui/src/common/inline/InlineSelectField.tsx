import { useField, useFormikContext } from 'formik';
import React, { useMemo } from 'react';
import styled from 'styled-components';

import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  GridProps,
  MenuItem,
  OutlinedInput,
  Select,
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

export interface InlineSelectOption {
  value: string | number;
  label: string;
}

export interface InlineSelectProps {
  name: string;
  label: string;
  labelHtml?: string;
  value?: string | number | undefined;
  error?: string;
  disabled?: boolean;
  options?: InlineSelectOption[] | string[] | number[];
  grid?: GridProps;
  style?: {};
}

const InlineSelect: React.FC<InlineSelectProps> = (props) => {
  let {
    label,
    name,
    error,
    disabled,
    value,
    labelHtml,
    options,
    grid,
    children,
    style,
  } = props;
  const formik = useFormikContext();
  const [field, meta, { setValue, setTouched }] = useField(props);
  if (!grid) {
    // default field to expand entire width of form
    grid = { xs: 12 };
  }

  const handleChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    const {
      target: { value },
    } = event;
    setValue(value);
    formik.submitForm();
  };

  return useMemo(
    () => (
      <StyledGrid item className="inline-select" {...grid}>
        {!labelHtml && (
          <Typography
            variant="h5"
            gutterBottom
            className={error || meta.error ? 'error-label' : ''}
          >
            {label}
          </Typography>
        )}

        {labelHtml && (
          <>
            <Typography
              variant="h5"
              gutterBottom
              className={error || meta.error ? 'error-label' : ''}
            >
              {label}
              <div
                style={{ display: 'inline-block' }}
                dangerouslySetInnerHTML={{ __html: labelHtml }}
              ></div>
            </Typography>
          </>
        )}
        <FormControl
          error={meta.touched && Boolean(meta.error)}
          component="fieldset"
          {...field}
          name={name}
        >
          <Select
            value={field.value || ''}
            onChange={handleChange}
            variant="outlined"
            style={style}
          >
            {options?.map((option, i) => (
              <MenuItem
                key={i}
                value={typeof option === 'object' ? option.value : option}
              >
                {typeof option === 'object' ? option.label : option}
              </MenuItem>
            ))}
          </Select>
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

export default InlineSelect;
