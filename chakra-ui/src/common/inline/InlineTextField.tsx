import { useField, useFormikContext } from 'formik';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import styled from 'styled-components';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

import {
  Grid,
  GridProps,
  InputAdornment,
  InputProps,
  TextField,
  Typography,
  CircularProgress,
  // ButtonGroup,
  // Button,
  ClickAwayListener,
  ButtonGroup,
  Button,
} from '@material-ui/core';

const StyledGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  .focus-controls {
    margin-right: -10px;
  }
  .select-field {
    margin-right: 22px;
  }
  .MuiInputBase-multiline {
    align-items: flex-end;
  }
  .multiline {
    margin-bottom: 10px;
  }
  input {
    min-width: 32px;
  }
  .error-label {
    color: ${(props) => props.theme.palette.error.main};
  }
`;

export type InlineTextFieldProps = {
  name: string;
  label?: string;
  type?: string;
  value?: string | number;
  className?: string;
  error?: string;
  disabled?: boolean;
  multiline?: boolean;
  select?: boolean;
  placeholder?: string;
  grid?: GridProps;
  inputProps?: InputProps;
  disableFocusControls?: boolean;
  variant?: 'standard' | 'filled' | 'outlined';
  maxLength?: number;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export const InlineTextField: React.FC<InlineTextFieldProps> = (props) => {
  let {
    children,
    multiline,
    select,
    label,
    name,
    type,
    value,
    className,
    placeholder,
    error,
    disabled,
    grid,
    inputProps,
    disableFocusControls,
    variant = 'outlined' as any,
    maxLength,
    onChange,
    onBlur,
  } = props;
  // console.log('InlineTextField render name', name, value);
  const formik = useFormikContext();
  const [field, meta, { setValue, setTouched }] = useField(props);
  const [focus, setFocus] = useState(false);
  const [lastSubmitCount, setLastSubmitCount] = useState(formik.submitCount);
  const [previousValue, setPreviousValue] = useState(meta.initialValue);
  const cancelButtonRef = useRef<HTMLButtonElement>();

  if (!grid) {
    // default field to expand entire width of form
    grid = { xs: 12 };
  }

  useEffect(() => {
    // update previous value if initial value changes
    setPreviousValue(meta.initialValue);
  }, [meta.initialValue]);

  useEffect(() => {
    if (!formik.isSubmitting && lastSubmitCount !== formik.submitCount) {
      // form finished submitting so set current value to previous value
      setPreviousValue(meta.value);
      setLastSubmitCount(formik.submitCount);
    }
  }, [formik.isSubmitting, formik.submitCount, lastSubmitCount, meta.value]);

  const handleSubmit = () => {
    setTouched(true);
    setFocus(false);
    formik.submitForm();
  };
  const handleCancel = () => {
    setTouched(false);
    setFocus(false);
    setValue(previousValue);
  };

  const getAdornmentClasses = () => {
    const classes = [];
    if (select) classes.push('select-field');
    if (multiline) classes.push('multiline');
    return classes.join(' ');
  };

  inputProps = useMemo(() => {
    if (!meta.error && formik.isSubmitting && meta.value !== previousValue) {
      return {
        ...inputProps,
        endAdornment: (
          <InputAdornment position='end' className={getAdornmentClasses()}>
            <CircularProgress color='primary' size={25} />
          </InputAdornment>
        ),
      };
    } else if (focus && !disableFocusControls) {
      return {
        ...inputProps,
        endAdornment: (
          <InputAdornment position='end' className={getAdornmentClasses()}>
            <ButtonGroup
              color='primary'
              variant='text'
              className='focus-controls'
            >
              <Button size='small' tabIndex={-1} onClick={handleSubmit}>
                <DoneIcon />
              </Button>
              <Button
                size='small'
                tabIndex={-1}
                innerRef={cancelButtonRef}
                onClick={(event) => {
                  event.stopPropagation();
                  handleCancel();
                }}
              >
                <ClearIcon />
              </Button>
            </ButtonGroup>
          </InputAdornment>
        ),
      };
    } else {
      return inputProps;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    focus,
    disableFocusControls,
    meta.error,
    meta.value,
    meta.touched,
    formik.isSubmitting,
  ]);
  // useMemo prevents constant re-render
  return useMemo(
    () => {
      return (
        <ClickAwayListener
          onClickAway={() => {
            // console.log('onClickAway');
            // handleSubmit();
          }}
        >
          <StyledGrid item className='inline-text-field' {...grid}>
            {label && (
              <Typography
                variant='h5'
                gutterBottom
                className={
                  error || (meta.touched && meta.error) ? 'error-label' : ''
                }
              >
                {label}
              </Typography>
            )}
            <TextField
              variant={variant}
              type={type}
              // size='small'
              multiline={multiline}
              select={select}
              name={name}
              className={className}
              value={value || field.value || ''}
              // label={label}
              placeholder={placeholder}
              disabled={disabled}
              // InputLabelProps={{ shrink: true }}
              autoComplete='off'
              error={Boolean(error) || (meta.touched && Boolean(meta.error))}
              helperText={error || meta.error}
              inputProps={{ maxLength }}
              InputProps={inputProps}
              onFocus={() => setFocus(true)}
              onChange={
                onChange ||
                ((event) => {
                  console.log('inline text field change');
                  field.onChange(event);
                  // if editing disabled touched until blur
                  setTouched(false);
                })
              }
              onKeyDown={(event) => {
                // console.log('event.key', event.key);
                switch (event.key) {
                  case 'Escape':
                    return handleCancel();
                  // case 'Tab':
                  // case 'Enter':
                  //   return handleSubmit();
                }
              }}
              onBlur={
                onBlur ||
                ((event) => {
                  if (event.relatedTarget === cancelButtonRef.current) {
                    handleCancel();
                  } else {
                    handleSubmit();
                  }
                })
              }
            >
              {children}
            </TextField>
          </StyledGrid>
        </ClickAwayListener>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      field.value,
      meta.error,
      meta.touched,
      focus,
      inputProps,
      select,
      type,
      label,
      placeholder,
      value,
      multiline,
      disabled,
    ]
  );
};

export default InlineTextField;
