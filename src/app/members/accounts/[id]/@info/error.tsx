'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Stack alignItems='center' justifyContent='center' spacing={2} sx={{ minHeight: '300px', height: '50%' }}>
      <Typography textAlign='center' variant='subtitle1' fontWeight='bold'>
        {error.message}
      </Typography>
      <div>
        <Button
          variant='text'
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          sx={{ mr: 2 }}>
          Thử lại
        </Button>
        <Button color='primary' component={Link} href='/members/accounts'>
          Quay lại
        </Button>
      </div>
    </Stack>
  );
}
