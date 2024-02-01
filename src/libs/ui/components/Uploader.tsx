import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Button, ButtonProps, Stack, Typography } from '@mui/material';
import { UploadFile } from '@mui/icons-material';
import { colors } from '@/libs/ui';

interface UploadButtonProps extends ButtonProps {
  state?: 'resting' | 'error';
  onUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface UploaderProps {
  buttonProps?: UploadButtonProps;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const UploadButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'state',
})<UploadButtonProps>(({ state }) => ({
  '& .MuiTypography-body2': {
    color: '#000000',
  },
  border: `${state == 'error' ? '1px solid' : '1px dashed'}`,
  minWidth: '300px',
  padding: '1.5rem',
  background: `${state == 'error' ? colors.background.error : ''}`,
}));

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

const CenterStack = styled(Stack)({
  alignItems: 'center',
  justifyContent: 'center',
});

export function Uploader({ buttonProps, inputProps }: UploaderProps) {
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
        <VisuallyHiddenInput type='file' accept='svg, png, jpg, jpeg, gif' {...inputProps} />
        <Typography variant='caption' color={buttonProps?.state == 'error' ? 'error.main' : colors.neutral[300]}>
          SVG, PNG, JPG or GIF (1400x700px)
        </Typography>
      </CenterStack>
    </UploadButton>
  );
}
