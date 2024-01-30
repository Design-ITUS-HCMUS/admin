'use client';
import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Section = styled('section')(({ theme }) => ({
  padding: theme.spacing(3, 3, 3),
}));

export default function EventDetails({ params }: { params: { key: string } }) {
  return (
    <Section>
      <Paper>
        <Typography variant='h6'>Chi tiết sự kiện {params.key}</Typography>
      </Paper>
    </Section>
  );
}
