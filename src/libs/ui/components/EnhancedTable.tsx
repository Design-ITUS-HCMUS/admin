'use client';
import { MouseEvent,useState } from 'react';
import { visuallyHidden } from '@mui/utils';

import { Theme, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Pagination from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';

import MoreIcon from '@mui/icons-material/MoreHorizRounded';

import { colors } from '@/libs/ui';
import { Order } from '@/utils';

const StyledTableFooter = styled('div')({
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
  disablePadding?: boolean;
  id: string;
  label: string;
  numeric?: boolean;
}

export interface IRowCell {
  [key: string]: any;
}

interface EnhancedTableHeadProps {
  onRequestSort: (event: MouseEvent<unknown>, property: number) => void;
  order: Order;
  orderBy: null | number;
  headCells: readonly IHeadCell[];
  disableAction?: boolean;
}

function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const { order, orderBy, onRequestSort, headCells, disableAction } = props;
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
        {!disableAction && <TableCell align='right' sx={{ fontWeight: 'bold' }} />}
      </TableRow>
    </TableHead>
  );
}

function TableMenu({
  anchorEl,
  onClose,
  children,
}: {
  anchorEl?: HTMLElement | null;
  onClose?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <Menu
      elevation={5}
      id='detail-menu'
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      disableScrollLock
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      onClose={onClose}
      MenuListProps={{
        role: 'listbox',
      }}>
      {children}
    </Menu>
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
  disableAction?: boolean;
  onAct?: (event: MouseEvent<HTMLElement>, _id: string | null) => void;
  children?: React.ReactNode;
}

export function EnhancedTable({
  headCells,
  rows,
  totalRows,
  rowsPerPage = 10,
  currentPage = 0,
  onChangePage,
  onSort,
  disableAction = false,
  onAct = (_e, _id) => {},
  children,
}: EnhancedTableProps) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<null | number>(null);
  const [page, setPage] = useState(currentPage);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const totalPages = Math.ceil(totalRows / rowsPerPage);
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

  const handleClick = (event: MouseEvent<HTMLElement>, _id: string | null) => {
    setAnchorEl(event.currentTarget);
    onAct(event, _id);
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
              return (
                <StyledTableRow hover tabIndex={-1} key={index} sx={{ cursor: 'pointer' }}>
                  {/* Filter: just render the data match the head cell */}
                  {headCells.map((head, id) => {
                    return id == 0 ? (
                      <TableCell
                        key={`${headCells[id].id}-${index}`}
                        component='th'
                        id={`row-${index}-${id}`}
                        scope='row'
                        padding='none'
                        align={align[id]}>
                        {row[head.id]}
                      </TableCell>
                    ) : (
                      <TableCell key={`${headCells[id].id}-${index}`} align={align[id]}>
                        {row[head.id]}
                      </TableCell>
                    );
                  })}
                  {!disableAction && (
                    <TableCell align='right' padding='none' sx={{ fontWeight: 'bold' }}>
                      <IconButton onClick={(_e) => handleClick(_e, row._id)} sx={{ margin: 0 }}>
                        <MoreIcon />
                      </IconButton>
                    </TableCell>
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
      <StyledTableFooter>
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
      </StyledTableFooter>
      {!disableAction && children && (
        <TableMenu anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
          {children}
        </TableMenu>
      )}
    </Box>
  );
}
