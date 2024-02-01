'use client';
import { useState, MouseEvent } from 'react';
import { styled } from '@mui/material/styles';
import { Theme, useMediaQuery } from '@mui/material';
import {
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  Pagination,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { Order } from '@/utils';
// need to resolve this issue to load from storybook
// import { colors } from '@/libs/ui';
// temporary solution: import from local, no alias link
import colors from '../color';

const TableFooter = styled('div')({
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '1.5rem',
});

const StyledTableRow = styled(TableRow)({
  // bold last border
  '&:last-child td, &:last-child th': {
    borderColor: colors.neutral[300],
  },
});

export interface IHeadCell {
  disablePadding?: boolean | false;
  id: string;
  label: string;
  numeric?: boolean | false;
}

export interface IRowCell {
  [key: string]: any;
}

interface EnhancedTableHeadProps {
  onRequestSort: (event: MouseEvent<unknown>, property: number) => void;
  order: Order;
  orderBy: null | number;
  headCells: readonly IHeadCell[];
}

function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const { order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = (property: number) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow
        sx={{
          '&:last-child td, &:last-child th': {
            borderColor: colors.neutral[300],
          },
        }}>
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy !== null ? (orderBy === index ? order : false) : false}
            sx={{ fontWeight: 'bold' }}>
            <TableSortLabel
              active={orderBy === index}
              direction={orderBy === index ? order : 'asc'}
              onClick={createSortHandler(index)}>
              {headCell.label}
              {orderBy === index ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableProps {
  headCells: readonly IHeadCell[];
  rows: IRowCell[];
  totalRows: number;
  rowsPerPage?: number;
  currentPage?: number;
  onChangePage: (event: unknown, page: number) => void;
  onSort: (event: unknown, order: Order, orderBy: number | null) => void;
}

export function EnhancedTable(props: EnhancedTableProps) {
  const { headCells, rows, totalRows, rowsPerPage = 10, currentPage = 0, onChangePage, onSort } = props;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<null | number>(null);
  const [page, setPage] = useState(currentPage);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const dense = isMobile ? true : false;
  const align = headCells.map((cell) => (cell.numeric ? 'right' : 'left'));
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage - 1);
    onChangePage(event, newPage - 1);
  };

  const handleRequestSort = (event: MouseEvent<unknown>, property: number) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    onSort(event, isAsc ? 'desc' : 'asc', property);
  };

  const clearSort = (event: MouseEvent<unknown>) => {
    setOrder('asc');
    setOrderBy(null);
    onSort(event, 'asc', null);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = rowsPerPage - rows.length;

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer>
        {orderBy !== null && (
          <Chip
            label={
              <Typography>
                {'Sắp xếp theo '}
                <Typography component='span' fontWeight='bold'>
                  {headCells[orderBy].label}
                </Typography>
              </Typography>
            }
            onDelete={clearSort}
            color='primary'
            variant='outlined'
          />
        )}
        <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={dense ? 'small' : 'medium'}>
          <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} headCells={headCells} />
          <TableBody>
            {rows.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <StyledTableRow hover tabIndex={-1} key={index} sx={{ cursor: 'pointer' }}>
                  {Object.values(row).map((value, id) =>
                    id == 0 ? (
                      <TableCell
                        key={`${headCells[id].id}-${index}`}
                        component='th'
                        id={labelId}
                        scope='row'
                        padding='none'
                        align={align[id]}>
                        {value}
                      </TableCell>
                    ) : (
                      <TableCell key={`${headCells[id].id}-${index}`} align={align[id]}>
                        {value}
                      </TableCell>
                    )
                  )}
                </StyledTableRow>
              );
            })}
            {emptyRows > 0 && (
              <StyledTableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}>
                <TableCell colSpan={6} />
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TableFooter>
        <Pagination
          variant='outlined'
          color='primary'
          count={totalPages}
          page={page + 1}
          onChange={handleChangePage}
          shape='rounded'
          showFirstButton
          showLastButton
          boundaryCount={0}
        />
        {totalRows && <Typography>Tổng: {totalRows}</Typography>}
      </TableFooter>
    </Box>
  );
}
