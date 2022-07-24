import {
  FormControl,
  FormHelperText,
  Grid,
  GridProps,
  TextField,
  Typography,
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import {
  Autocomplete,
  createFilterOptions,
  FilterOptionsState,
} from '@material-ui/lab';

import { useField, useFormikContext } from 'formik';
import { isBuffer } from 'lodash';
import React, { SyntheticEvent, useMemo } from 'react';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  margin-top: -20px;
  margin-bottom: 20px;
  .error-label {
    color: ${(props) => props.theme.palette.error.main};
  }
`;
export interface InlineMultiSelectChipProps {
  name: string;
  label: string;
  optionLabel: (optionLabel: any) => string;
  filterOptions: (options: any[], params: FilterOptionsState<any>) => unknown[];
  error?: string;
  disabled?: boolean;
  options?: object[];
  grid?: GridProps;
  onInputChange?: (event: any, value: string) => void;
  style?: CSSProperties;
}

const InlineMultiSelectChip: React.FC<InlineMultiSelectChipProps> = (props) => {
  let {
    label,
    name,
    error,
    disabled,
    options,
    optionLabel,
    filterOptions,
    grid,
    onInputChange,
    style,
  } = props;
  const formik = useFormikContext();
  const [field, meta, { setValue, setTouched }] = useField(props.name);
  const filter = createFilterOptions();

  if (!grid) {
    grid = { xs: 12 };
  }

  const handleChange = (event: any, values: any[]) => {
    setValue(values);
    formik.submitForm();
  };

  return useMemo(
    () => (
      <StyledGrid item className="inline-multi-select" {...grid} style={style}>
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
            multiple
            freeSolo
            filterSelectedOptions
            options={options as any[]}
            getOptionLabel={optionLabel}
            value={field.value}
            disabled={disabled}
            autoHighlight
            selectOnFocus
            onInputChange={onInputChange}
            clearOnBlur
            handleHomeEndKeys
            renderInput={(params) => {
              return <TextField {...params} variant="outlined" />;
            }}
            onChange={handleChange}
            filterOptions={filterOptions}
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

export default InlineMultiSelectChip;
