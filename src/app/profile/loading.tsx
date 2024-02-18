'use client';
import React from 'react';

import { useMediaQuery, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

import { WhiteCard } from './_components';

export function LoadingSideBar() {
  return (
    <Stack component={Paper} variant='section' p={2} position='sticky' top={6}>
      {[...Array(4)].map((_, index) => (
        <Skeleton width='100%' key={index} height={60} variant='text' />
      ))}
    </Stack>
  );
}

export function LoadingBasicInfo() {
  return (
    <WhiteCard>
      <Skeleton width='25%' height={40} variant='text' />
      <Stack spacing={3} direction='row'>
        {[...Array(2)].map((_, index) => (
          <Skeleton width='100%' height={40} variant='rounded' key={index} />
        ))}
      </Stack>
      <Stack spacing={3} direction='row'>
        {[...Array(2)].map((_, index) => (
          <Skeleton width='100%' height={40} variant='rounded' key={index} />
        ))}
      </Stack>
      {[...Array(3)].map((_, index) => (
        <Stack spacing={3} direction='row' key={index}>
          <Skeleton width='100%' height={40} variant='rounded' />
          <div style={{ width: '100%' }} />
        </Stack>
      ))}
      <Skeleton width={80} height={40} variant='rounded' component='span' />
    </WhiteCard>
  );
}

export function LoadingTransactionTable() {
  return (
    <WhiteCard>
      <Skeleton width='25%' height={40} variant='text' />
      {[...Array(6)].map((_, index) => (
        <Skeleton width='100%' key={index} height={40} variant='rounded' />
      ))}
    </WhiteCard>
  );
}

export function LoadingChangePassword() {
  return (
    <WhiteCard>
      <Skeleton width='25%' height={40} variant='text' />
      {[...Array(3)].map((_, index) => (
        <Skeleton width='55%' key={index} height={40} variant='rounded' />
      ))}
      <Skeleton width={80} height={40} variant='rounded' component='span' />
    </WhiteCard>
  );
}

export default function Loading() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Grid container columnSpacing={4} mt={12} px={{ xs: 3, md: 7.5 }}>
      {isDesktop && (
        <Grid item xs={3}>
          <LoadingSideBar />
        </Grid>
      )}
      <Grid item xs>
        <LoadingBasicInfo />
        <LoadingTransactionTable />
        <LoadingChangePassword />
      </Grid>
    </Grid>
  );
}
