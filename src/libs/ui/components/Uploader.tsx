import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { UploadFile } from '@mui/icons-material';
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
  buttonProps?: UploadButtonProps;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  placeholder?: string;
}

const CenterStack = styled(Stack)({
  alignItems: 'center',
  justifyContent: 'center',
});

export function Uploader({ buttonProps, inputProps, placeholder }: UploaderProps) {
  return (
    <UploadButton
      component='label'
      fullWidth
      color={buttonProps?.state == 'error' ? 'error' : buttonProps?.color}
      variant='text'
      {...buttonProps}>
      <CenterStack spacing={1}>
        <UploadFile />
        <Typography color='er'>Click to upload</Typography>
        <VisuallyHiddenInput type='file' {...inputProps} />
        {placeholder && (
          <Typography variant='caption' color={buttonProps?.state == 'error' ? 'error.main' : colors.neutral[300]}>
            {placeholder}
          </Typography>
        )}
      </CenterStack>
    </UploadButton>
  );
}
