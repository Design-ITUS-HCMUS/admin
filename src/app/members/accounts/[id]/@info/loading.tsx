import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Loading() {
  return (
    <>
      <Skeleton width='25%' height={40} variant='text' />
      <Stack spacing={3} alignItems='center'>
        {[...Array(5)].map((_, index) => (
          <Stack direction='row' spacing={3} sx={{ width: '75%' }} key={index}>
            <Skeleton width='25%' height={40} variant='text' />
            <Skeleton width='75%' height={40} variant='rounded' />
          </Stack>
        ))}
      </Stack>
    </>
  );
}
