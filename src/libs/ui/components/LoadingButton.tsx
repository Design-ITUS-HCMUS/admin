import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

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
