import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

enum LoadingSize {
  small = '3rem',
  medium = '4rem',
  large = '5rem',
}
interface LoadingProps {
  label?: string;
  size?: keyof typeof LoadingSize;
}
export function Loading({ label = 'Đang tải dữ liệu', size = 'medium' }: LoadingProps) {
  return (
    <Stack alignItems='center' spacing={2}>
      <CircularProgress size={LoadingSize[size]} />
      <Typography variant='body2' color='textSecondary'>
        {label}
      </Typography>
    </Stack>
  );
}
