'use client';
import * as React from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { CreateEventForm } from '../_components';

const Section = styled('section')(({ theme }) => ({
  padding: theme.spacing(3, 3, 3),
  minHeight: 'calc(100vh - 64px - 48px)',
}));

const StyledPaper = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  minHeight: 'inherit',
});

export default function EventCreatePage() {
  function handleSubmit(_formData: FormData) {}

  return (
    <Section>
      <StyledPaper variant='section'>
        <Grid container columns={8} spacing={2} mt={{ xs: 0, md: 4 }}>
          <Grid item xs={0} md={1} />
          <Grid item xs={6}>
            <Typography variant='h6' fontWeight='bold' mb={2}>
              Tạo sự kiện
            </Typography>
            <CreateEventForm onSubmit={handleSubmit} />
            <Stack direction='row' spacing={2} justifyContent='flex-end' mt={2}>
              <Button component={Link} href="/events" variant='text' color='primary' size='medium'>
                Cancel
              </Button>
              <Button size='medium' form='create-event-form' type='submit'>
                Tạo sự kiện
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={0} md={1} />
        </Grid>
      </StyledPaper>
    </Section>
  );
}
