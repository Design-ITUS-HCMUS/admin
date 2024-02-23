import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

enum LoadingSize {
  small = '3rem',
  medium = '4rem',
  large = '5rem',
}
interface LoadingProps {
  /** The label showing description of loading state. */
  label?: string;
  /** The size of the loading spinner. <br/>
   * <code>small</code> - 3rem <br/>
   * <code>medium</code> - 4rem <br/>
   * <code>large</code> - 5rem
   */
  size?: keyof typeof LoadingSize;
}
export function Loading({ label = 'Đang tải dữ liệu', size = 'medium' }: LoadingProps) {
  return (
    <Stack alignItems='center' spacing={2}>
      <CircularProgress size={LoadingSize[size]} />
      <Typography color='textSecondary'>{label}</Typography>
    </Stack>
  );
}
