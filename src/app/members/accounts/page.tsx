'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { orderBy } from 'lodash';

import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import IosShareRounded from '@mui/icons-material/IosShareRounded';

import data from '@/libs/mock/members.json';
import { EnhancedTable, IHeadCell, Search } from '@/libs/ui';
import { Order } from '@/utils';
import { CreateAccountModal } from './_components';

const ToolBar = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const headCells: readonly IHeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Họ tên',
  },
  {
    id: 'gen',
    label: 'Gen',
  },
  {
    id: 'department',
    label: 'Ban hoạt động',
  },
  {
    id: 'facebook',
    label: 'Facebook',
  },
];

interface ITableCell extends Record<(typeof headCells)[number]['id'], JSX.Element | string> {
  _id: string;
}

const filteredData: ITableCell[] = data.map((item: any) => ({
  _id: item.id,
  name: item.name,
  gen: item.profile ? item.profile.gen : 'Chưa có',
  department: item.profile ? item.profile.departments.join(', ') : 'Chưa có', // join array to string
  facebook: item.profile ? item.profile.facebook : 'Chưa có',
}));

export default function AccountsPage() {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const rowsPerPage = 10;
  const [rows, setRows] = useState<ITableCell[]>(filteredData);
  const [page, setPage] = useState(0);

  const handleSort = (_event: unknown, order: Order, orderByID: number | null) => {
    if (orderByID !== null) {
      const key = headCells[orderByID].id;
      if (!key) return;
      const sortRows = orderBy(filteredData, key, order) as ITableCell[];
      setRows(sortRows);
    } else setRows(filteredData);
  };

  const refactorData = (data: ITableCell[]): ITableCell[] => {
    const newData = data.map((item: ITableCell) => ({
      ...item,
      name: (
        <Typography sx={{ color: 'primary.main' }}>
          <Link href={`/members/accounts/${item._id}`}>{item.name}</Link>
        </Typography>
      ),
      facebook: (
        <Typography
          component={Link}
          href={item.facebook as string}
          sx={{ color: 'primary.main', maxWidth: '250px' }}
          textOverflow='ellipsis'
          overflow='hidden'>
          {item.facebook}
        </Typography>
      ),
    }));
    return newData;
  };
  const visibleRows: ITableCell[] = useMemo(() => {
    return refactorData(rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage));
  }, [rows, page]);

  return (
    <>
      <Typography variant='h6' fontWeight='600'>
        Quản lý tài khoản
      </Typography>
      <ToolBar>
        <Search onSearch={(_value) => {}} onBlur={(_value) => {}} />
        <Stack direction='row' spacing={2}>
          <Button color='info' onClick={() => setOpen(true)}>
            Tạo tài khoản
          </Button>
          <Button color='info' startIcon={<IosShareRounded />}>
            Xuất file
          </Button>
        </Stack>
      </ToolBar>
      {/* All members data table */}
      <EnhancedTable
        headCells={headCells}
        rows={visibleRows}
        totalRows={data.length}
        onChangePage={(_e, page) => setPage(page)}
        onSort={handleSort}
        onAct={(_e, id) => setSelectedRow(id)}>
        <Link href={`/members/accounts/${selectedRow}`}>
          <MenuItem>Xem chi tiết</MenuItem>
        </Link>
      </EnhancedTable>
      <CreateAccountModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
