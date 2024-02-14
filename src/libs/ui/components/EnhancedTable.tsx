'use client';
import { MouseEvent, useState } from 'react';

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
  key: string;
  label: string;
  numeric?: boolean;
}

export interface IRowCell {
  [key: string]: any;
}

interface EnhancedTableHeadProps {
  onRequestSort: (event: MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderByKey: null | string;
  headCells: readonly IHeadCell[];
  disableAction?: boolean;
}

function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const { order, orderByKey, onRequestSort, headCells, disableAction } = props;

  return (
    <TableHead>
      <TableRow
        sx={{
          '&:last-child td, &:last-child th': {
            borderColor: colors.neutral[300],
          },
        }}>
        {headCells.map((headCell) => {
          const { label, key, numeric, disablePadding } = headCell;
          return (
            <TableCell
              key={key}
              align={numeric ? 'right' : 'left'}
              padding={disablePadding ? 'none' : 'normal'}
              sortDirection={orderByKey !== null ? (orderByKey === key ? order : false) : false}
              sx={{ fontWeight: 'bold', minWidth: '150px', maxWidth: '200px' }}>
              <TableSortLabel
                active={orderByKey === key}
                direction={orderByKey === key ? order : 'asc'}
                onClick={(e) => onRequestSort(e, key)}>
                {label}
              </TableSortLabel>
            </TableCell>
          );
        })}
        {disableAction ? null : <TableCell align='right' sx={{ fontWeight: 'bold' }} />}
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
  /** The head cells of the table, each cell must have a unique <code>id</code> to handle sorting. <br/>
   * <code>interface IHeadCell {
   *   disablePadding?: boolean;<br/>
   *   id: string;<br/>
   *   label: string;<br/>
   *   numeric?: boolean;<br/>
   * }</code>
   */
  headCells: readonly IHeadCell[];
  /** The data of the table, each row must have a unique <code>_id</code> to handle action.
   * Moreover, the <code>key</code> in the object of body cell must match the <code>key</code> of the head cell.
   * Otherwise, data will not be rendered.
   */
  rows: IRowCell[];
  /** The total rows of the table support counting the total pages of table's pagination and show the total summary on the left side of table footer.*/
  totalRows: number;
  /** The number of rows per page support counting the total pages of table's pagination. */
  rowsPerPage?: number;
  /** Specify the current page of the table for the table pagination to highlight. */
  currentPage?: number;
  /** The callback function when the page is changed by the table pagination. The <code>page</code> will be passed by. */
  onChangePage: (event: unknown, page: number) => void;
  onSort: (event: unknown, order: Order, orderByKey: string | null) => void;
  /** Disable the more action column. */
  disableAction?: boolean;
  /** The callback function when the more action button is clicked. The <code>id</code> of that row will be passed by.
   * If no <code>id</code> is provided, the <code>onAct</code> callback will not be executed.
   */
  onAct?: (event: MouseEvent<HTMLElement>, _id: string | null) => void;
  /** The children of the table menu. */
  children?: React.ReactNode;
}

type TableOrder = {
  direction?: Order;
  key: string | null;
};

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
  const [order, setOrder] = useState<TableOrder>({ key: null });
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

  const handleRequestSort = (event: MouseEvent<unknown>, property: string) => {
    const isAsc = order.key === property && order.direction === 'asc';
    setOrder({ direction: isAsc ? 'desc' : 'asc', key: property });
    onSort(event, isAsc ? 'desc' : 'asc', property);
  };

  const clearSort = (event: MouseEvent<unknown>) => {
    setOrder({ key: null });
    onSort(event, 'asc', null);
  };

  const handleClick = (event: MouseEvent<HTMLElement>, _id: string | null) => {
    setAnchorEl(event.currentTarget);
    if (_id) onAct(event, _id);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = rowsPerPage - rows.length;

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer>
        {order.key !== null ? (
          <Chip
            label={
              <Typography>
                {'Sắp xếp theo '}
                <Typography component='span' fontWeight='bold'>
                  {headCells.find((cell) => cell.key === order.key)?.label}
                </Typography>
              </Typography>
            }
            onDelete={clearSort}
            color='primary'
            variant='outlined'
          />
        ) : null}
        <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={dense ? 'small' : 'medium'}>
          <EnhancedTableHead
            order={order.direction || 'asc'}
            orderByKey={order.key}
            onRequestSort={handleRequestSort}
            headCells={headCells}
            disableAction={disableAction}
          />
          <TableBody>
            {rows.map((row, index) => {
              return (
                <StyledTableRow hover tabIndex={-1} key={index} sx={{ cursor: 'pointer' }}>
                  {/* Filter: just render the data match the head cell */}
                  {headCells.map((head, id) => {
                    const { key } = head;
                    return id == 0 ? (
                      <TableCell
                        key={`${key}-${index}`}
                        component='th'
                        id={`row-${key}-${index}`}
                        scope='row'
                        sx={{ px: 0 }}
                        align={align[id]}>
                        {row[key]}
                      </TableCell>
                    ) : (
                      <TableCell key={`${key}-${index}`} align={align[id]}>
                        {row[key]}
                      </TableCell>
                    );
                  })}
                  {disableAction ? null : (
                    <TableCell align='right' padding='none' sx={{ fontWeight: 'bold' }}>
                      <IconButton onClick={(_e) => handleClick(_e, row._id)} sx={{ margin: 0 }}>
                        <MoreIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </StyledTableRow>
              );
            })}
            {emptyRows > 0 ? (
              <StyledTableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}>
                <TableCell colSpan={6} />
              </StyledTableRow>
            ) : null}
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
        {Boolean(totalRows) ? <Typography>Tổng: {totalRows}</Typography> : null}
      </StyledTableFooter>
      {!disableAction && children ? (
        <TableMenu anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
          {children}
        </TableMenu>
      ) : null}
    </Box>
  );
}
