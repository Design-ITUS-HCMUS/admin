'use client';
import * as React from 'react';

import Button, { ButtonProps } from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import UploadFile from '@mui/icons-material/UploadFile';

import { colors } from '@/libs/ui';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface UploadButtonProps extends ButtonProps {
  state?: 'resting' | 'error';
  onUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'state',
})<UploadButtonProps>(({ state }) => ({
  '& .MuiTypography-body2': {
    color: 'contrastText',
  },
  border: `${state == 'error' ? '1px solid' : '1px dashed'}`,
  minWidth: '300px',
  padding: '1.5rem',
  background: `${state == 'error' ? colors.background.error : ''}`,
}));

interface UploaderProps {
  /** <div>
   *    Extends from <code>ButtonProps</code> of MUI with additional props:
   *  <li>
   *    <code>state</code>: Custom state of uploader <code>resing | error</code>
   *  </li>
   *  <li>
   *    <code>onUpload</code>: Custom event handler, executed when a file is uploaded
   *  </li>
   *  </div> */
  buttonProps?: UploadButtonProps;
  /** <div>
   * Uploader has a hidden input element to handle file upload. This prop
   * controls that input, you can custom the input element's performance, such as
   * <code>multiple</code>, <code>required</code>, etc.
   * </div> */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /** Control the placeholder text. */
  placeholder?: string;
  /** Helper text when the input is invalid, and in error state. */
  helperText?: string;
}

const CenterStack = styled(Stack)({
  alignItems: 'center',
  justifyContent: 'center',
});

export function Uploader({ buttonProps, inputProps, placeholder, helperText }: UploaderProps) {
  return (
    <Stack spacing={1}>
      <UploadButton
        component='label'
        fullWidth
        color={buttonProps?.state == 'error' ? 'error' : buttonProps?.color}
        variant='text'
        {...buttonProps}>
        <CenterStack spacing={1}>
          <UploadFile />
          <Typography color={buttonProps?.state == 'error' ? 'error' : 'primary'}>Click to upload</Typography>
          <VisuallyHiddenInput type='file' {...inputProps} />
          {!!placeholder && (
            <Typography variant='caption' color={buttonProps?.state == 'error' ? 'error.main' : colors.neutral[300]}>
              {placeholder}
            </Typography>
          )}
        </CenterStack>
      </UploadButton>
      {buttonProps?.state == 'error' && helperText !== null ? (
        <FormHelperText error>{helperText}</FormHelperText>
      ) : null}
    </Stack>
  );
}
