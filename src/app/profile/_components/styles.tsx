'use client';
import React from 'react';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { colors } from '@/libs/ui';

export const WhiteCard = styled(Paper)(({ theme }) => ({
  borderRadius: '0.75rem',
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(3),
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    rowGap: theme.spacing(2),
  },
}));

export function Section({ children, title, id }: { children: React.ReactNode; title: string; id?: string }) {
  return (
    <WhiteCard>
      <section {...(!!id && { id: id })}>
        <Typography variant='h6' fontWeight='bold' mb={2}>
          {title}
        </Typography>
        {children}
      </section>
    </WhiteCard>
  );
}

export const TableHeadCellStyled = styled(TableCell)({
  fontWeight: 600,
});

export const TableRowStyled = styled(TableRow)({
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  // bold last border
  '&:last-child td, &:last-child th': {
    borderColor: colors.neutral[300],
  },
});
