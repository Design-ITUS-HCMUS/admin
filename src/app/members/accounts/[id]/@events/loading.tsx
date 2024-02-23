import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Loading() {
  return (
    <Stack direction='row' spacing={2}>
      {[...Array(3)].map((_, index) => (
        <Stack sx={{ width: '33%' }} spacing={1} key={index}>
          <Skeleton sx={{ height: 150 }} variant='rounded' />
          <Skeleton width='80%' variant='rounded' />
          <Skeleton width='40%' variant='rounded' />
        </Stack>
      ))}
    </Stack>
  );
}
