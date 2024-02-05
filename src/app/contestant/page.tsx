'use client';
import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Contestant() {
  const router = useRouter();
  return (
    <div>
      <h1>Contestant</h1>
      <Button variant='contained' color='primary' onClick={() => router.push('/contestant/submission')}>
        Go to Submission Page
      </Button>
      <Button variant='contained' color='secondary' onClick={() => router.push('/contestant/team-management')}>
        Go to Team Management Page
      </Button>
      <Button variant='contained' color='secondary' onClick={() => router.push('/payment')}>
        Go to Payment Page
      </Button>
    </div>
  );
}
