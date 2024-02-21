'use client';
import { Theme, useMediaQuery } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { colors, IHeadCell, Loading } from '@/libs/ui';

type State = 'loading' | 'empty';

interface SupportTableProps {
  /** The head cells of the table, each cell must have a unique <code>id</code> to handle sorting. <br/>
   * <code>interface IHeadCell {
   *   disablePadding?: boolean;<br/>
   *   id: string;<br/>
   *   label: string;<br/>
   *   numeric?: boolean;<br/>
   * }</code>
   */
  headCells?: readonly IHeadCell[];
  /** The state of the table, can be <code>loading</code> or <code>empty</code>. */
  state?: State;
  number?: number;
}

export function SupportTable({ headCells, state = 'loading', number = 0 }: SupportTableProps) {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const dense = isMobile;

  return (
    <TableContainer sx={{ width: '100%' }}>
      <Table sx={{ minWidth: 750 }} size={dense ? 'small' : 'medium'}>
        <TableHead>
          <TableRow
            sx={{
              '&:last-child th': {
                borderColor: colors.neutral[300],
              },
            }}>
            {Boolean(headCells)
              ? headCells?.map((headCell) => (
                  <TableCell
                    key={headCell.key} // Add type assertion here
                    align={headCell.numeric ? 'right' : 'left'}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    sx={{ fontWeight: 'bold', minWidth: '150px', maxWidth: '200px' }}>
                    {headCell.label}
                  </TableCell>
                ))
              : [...Array(number)].map((_, index) => (
                  <TableCell
                    key={index}
                    align='center'
                    sx={{ fontWeight: 'bold', minWidth: '150px', maxWidth: '200px' }}>
                    <Skeleton variant='text' width={120} />
                  </TableCell>
                ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={headCells ? headCells.length : number ? number : 6}
              align='center'
              sx={{ height: '400px' }}>
              {state === 'empty' ? <Typography color='textSecondary'>Không có dữ liệu</Typography> : <Loading />}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
