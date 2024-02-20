'use client';
import CircularProgress from '@mui/material/CircularProgress';
import Button, { ButtonProps } from '@mui/material/Button';

export function LoadingButton({ loading, children, ...props }: { loading: boolean } & ButtonProps) {
  return (
    <Button
      disabled={loading}
      startIcon={loading ? <CircularProgress size={20} color='inherit' /> : props.startIcon}
      {...props}>
      {children}
    </Button>
  );
}
