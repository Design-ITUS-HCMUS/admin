'use client';
import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { orderBy } from 'lodash';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import IosShareRounded from '@mui/icons-material/IosShareRounded';

import { EnhancedTable, IHeadCell, Search, colors } from '@/libs/ui';
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
    id: 'departments',
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

export default function AccountsPage() {
  const [accountsData, setAccountsData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const rowsPerPage = 10;
  const [rows, setRows] = useState<ITableCell[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch('/api/user/all-users')
      .then((res) => res.json())
      .then((res) => {
        const loadedData = res.data.map((item: any) => ({
          _id: item.id,
          name: item.profile ? item.profile.fullName : '',
          email: item.email,
          gen: item.profile ? item.profile.gen : '',
          departments: item.profile ? item.profile.departments.join(', ') : '', // join array to string
          facebook: item.profile ? item.profile.facebook : '',
        }));
        setRows(loadedData);
        setAccountsData(loadedData);
      });
  }, []);

  const handleSort = (_event: unknown, order: Order, orderByID: number | null) => {
    if (orderByID !== null) {
      const key = headCells[orderByID].id;
      if (!key) return;
      const sortRows = orderBy(accountsData, key, order) as ITableCell[];
      setRows(sortRows);
    } else setRows(accountsData);
  };

  const refactorData = (data: ITableCell[]): ITableCell[] => {
    const newData = data.map((item: ITableCell) => ({
      ...item,
      departments: <Typography textTransform='capitalize'>{item.departments}</Typography>,
      name: (
        <div>
          <Typography sx={{ color: 'primary.main' }}>
            <Link href={`/members/accounts/${item._id}`}>{item.name}</Link>
          </Typography>
          <Typography variant='caption' color={colors.neutral[200]}>
            {item.email}
          </Typography>
        </div>
      ),
      facebook: (
        <Typography
          component={Link}
          href={`/events/${item.facebook}`}
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
        totalRows={accountsData.length}
        onChangePage={(_e, page) => setPage(page)}
        onSort={handleSort}
        onAct={(_e, id) => setSelectedRow(id)}>
        <Link href={`/members/accounts/${selectedRow}`}>
          <MenuItem>Xem chi tiết</MenuItem>
        </Link>
        <Divider sx={{ my: 1 }} />
        <MenuItem sx={{ color: 'error.main' }}>Xóa tài khoản</MenuItem>
      </EnhancedTable>
      <CreateAccountModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
