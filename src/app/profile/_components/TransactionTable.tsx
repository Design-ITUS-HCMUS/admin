'use client';
import Link from 'next/link';

import { Theme, useMediaQuery } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { TableRowStyled, TableHeadCellStyled } from '.';

export function TransactionTable({ transactions }: { transactions: any[] }) {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const dense = isMobile;

  return (
    <Stack useFlexGap gap={2}>
      <TableContainer>
        <Table sx={{ minWidth: 500 }} size={dense ? 'small' : 'medium'}>
          <TableHead>
            <TableRowStyled>
              <TableHeadCellStyled padding='none'>Mã hoá đơn</TableHeadCellStyled>
              <TableHeadCellStyled>Thời gian</TableHeadCellStyled>
              <TableHeadCellStyled>Thông tin</TableHeadCellStyled>
              <TableHeadCellStyled align='right'>Giá trị</TableHeadCellStyled>
            </TableRowStyled>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRowStyled key={transaction.id}>
                <TableCell id={transaction.id} padding='none'>
                  <Typography component={'a'} href={'#' + transaction.id} color='primary.main'>
                    {transaction.id}
                  </Typography>
                </TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell align='right'>{transaction.amount}</TableCell>
              </TableRowStyled>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography component={Link} variant='linkAccent' href='/transactions' sx={{ alignSelf: 'flex-end' }}>
        Xem tất cả
      </Typography>
    </Stack>
  );
}
