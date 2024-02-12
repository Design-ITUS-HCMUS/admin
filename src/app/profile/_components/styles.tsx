import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

import { colors } from '@/libs/ui';

export function Section({ children, title, id }: { children: React.ReactNode; title: string; id?: string }) {
  return (
    <div>
      <Typography variant='h6' fontWeight='bold' mb={2} {...(!!id && { id: id, 'data-section': '' })}>
        {title}
      </Typography>
      {children}
    </div>
  );
}

export const WhiteCard = styled(Paper)(({ theme }) => ({
  borderRadius: '0.75rem',
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(3),
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

export const TableHeadCellStyled = styled(TableCell)(() => ({
  fontWeight: 600,
}));

export const TableRowStyled = styled(TableRow)(() => ({
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  // bold last border
  '&:last-child td, &:last-child th': {
    borderColor: colors.neutral[300],
  },
}));
