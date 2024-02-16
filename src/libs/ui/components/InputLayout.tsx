'use client';
import React, { forwardRef } from 'react';
import { Field } from 'formik';

import FormHelperText from '@mui/material/FormHelperText';
import InputLabel, { InputLabelProps } from '@mui/material/InputLabel';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import Stack, { StackProps } from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&.Mui-disabled': {
    color: theme.palette.text.primary,
  },
  '&.Mui-error': {
    color: theme.palette.text.primary,
  },
}));

interface InputLayoutProps {
  /** If true, the label will indicate that the input is required.  */
  required?: boolean;
  /** The direction of label and input. If <code>row</code>, the label will be placed on the left of the field. */
  direction?: 'column' | 'row';
  /** The label of the input.  */
  label: string;
  /** The ratio of label width to field width. Only available when direction is <code>row</code>. */
  ratio?: number;
  /** As default, the Input Layout use OutlinedInput, when children is passed, that input will be removed, you can use a custom input. */
  children?: React.ReactNode;
  /** The helper text will show when <code>inputProps.error=true</code> */
  helperText?: string;
  /** The props of the default input component.
   * If you want to use a custom input component, you can pass it as a child of <code>InputLayout</code>.
   * These props will be ignored. */
  inputProps?: OutlinedInputProps;
  /** Additional props of the label component. */
  labelProps?: InputLabelProps;
  /** Additional props of the container component. */
  containerProps?: StackProps;
  /** If true, the children will be wrapped by <code>Field</code> component from <code>formik</code> library. */
  formik?: boolean;
}

export const InputLayout = forwardRef(
  (
    {
      required = false,
      direction = 'column',
      label,
      ratio = 0,
      children,
      helperText,
      inputProps,
      labelProps,
      containerProps,
      formik = false,
    }: InputLayoutProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const calRatio = Math.max(0, Math.min(1, ratio));
    let labelWidth = '100%';
    let fieldsetWidth = '100%';
    if (direction === 'row') {
      labelWidth = calRatio ? `${Math.floor(100.0 * calRatio)}%` : '100%';
      fieldsetWidth = 1 - calRatio ? `${Math.floor(100.0 * (1 - calRatio))}%` : '100%';
    }

    return (
      <Stack spacing={1} alignItems='baseline' direction={direction} sx={{ width: '100%' }} {...containerProps}>
        {Boolean(label) ? (
          <StyledInputLabel htmlFor={inputProps?.name} sx={{ width: labelWidth }} required={required} {...labelProps}>
            <Typography variant='subtitle2' component='span'>
              {label}
            </Typography>
          </StyledInputLabel>
        ) : null}
        <Stack sx={{ width: fieldsetWidth }}>
          {children ? (
            children
          ) : formik ? (
            <Field as={OutlinedInput} {...inputProps} ref={ref} />
          ) : (
            <OutlinedInput {...inputProps} ref={ref} />
          )}
          {Boolean(helperText) ? <FormHelperText error>{helperText}</FormHelperText> : null}
        </Stack>
      </Stack>
    );
  }
);

// This name is used by React in debugging messages. Only arrow functions have to do this
InputLayout.displayName = 'InputLayout';
