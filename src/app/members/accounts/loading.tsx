import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import { SupportTable } from '@/libs/ui';

export default function Loading() {
  return (
    <>
      <Skeleton variant='text' height={60} width={200} />
      <Stack direction='row' justifyContent='right' sx={{ width: '100%' }}>
        <Skeleton variant='rounded' component='span' height={40} width={100} sx={{ mr: 2 }} />
        <Skeleton variant='rounded' component='span' height={40} width={100} />
      </Stack>
      <SupportTable number={4} />
    </>
  );
}
