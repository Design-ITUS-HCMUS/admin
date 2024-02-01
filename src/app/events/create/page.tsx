'use client';
import * as React from 'react';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { CreateEventForm } from '../_components';

export default function Page() {
  function handleSubmit(formData: FormData) {}

  return (
    <Grid container columns={8} spacing={2} mt={{ xs: 0, md: 4 }}>
      <Grid item xs={0} md={1} />
      <Grid item xs={6}>
        <Typography variant='h6' fontWeight='bold' mb={2}>
          Tạo sự kiện
        </Typography>
        <CreateEventForm onSubmit={handleSubmit} />
        <Stack direction='row' spacing={2} justifyContent='flex-end' mt={2}>
          <Button variant='text' color='primary' size='medium'>
            Cancel
          </Button>
          <Button size='medium' form='create-event-form' type='submit'>
            Tạo sự kiện
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={0} md={1} />
    </Grid>
  );
}
