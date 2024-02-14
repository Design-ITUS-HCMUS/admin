'use client';
import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import IosShareRounded from '@mui/icons-material/IosShareRounded';

import { EnhancedTable, IHeadCell, Search, colors, SupportTable } from '@/libs/ui';
import { shortenFBLink, tableHandler, Query } from '@/utils';
import { CreateAccountModal } from './_components';

const headCells: readonly IHeadCell[] = [
  {
    key: 'name',
    disablePadding: true,
    label: 'Họ tên',
  },
  {
    key: 'gen',
    label: 'Gen',
  },
  {
    key: 'departments',
    label: 'Ban hoạt động',
  },
  {
    key: 'facebook',
    label: 'Facebook',
  },
];

interface ITableCell extends Record<(typeof headCells)[number]['key'], JSX.Element | string> {
  _id: string;
}

export default function AccountsPage() {
  const [loading, setLoading] = useState(true);
  const [accountsData, setAccountsData] = useState([]);
  // The open state of create account modal
  const [open, setOpen] = useState(false);
  // Table actions
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  // Mock BE query state
  const [query, setQuery] = useState<Query>({ page: 1, limit: 10 });

  useEffect(() => {
    fetch('/api/user/all-users')
      .then((res) => res.json())
      .then((res) => {
        const { success, data } = res;
        if (!success) throw new Error('Có lỗi khi tải dữ liệu');
        const loadedData = data.map((item: any) => ({
          _id: item.id,
          name: item.profile ? item.profile.fullName : '',
          email: item.email,
          gen: item.profile ? item.profile.gen : '',
          departments: item.profile ? item.profile.departments.join(', ') : '', // join array to string
          facebook: item.profile ? item.profile.facebook : '',
        }));
        setAccountsData(loadedData);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

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
          href={`${item.facebook}`}
          sx={{ color: 'primary.main', maxWidth: '250px' }}
          textOverflow='ellipsis'
          overflow='hidden'>
          {shortenFBLink(item.facebook as string)}
        </Typography>
      ),
    }));
    return newData;
  };

  const visibleRows: ITableCell[] = useMemo(() => {
    return refactorData(tableHandler({ query, data: accountsData }));
  }, [accountsData, query]);

  return (
    <>
      <Typography variant='h6' fontWeight='600'>
        Quản lý tài khoản
      </Typography>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Search onSearch={(_value) => {}} onBlur={(_value) => {}} />
        <Stack direction='row' spacing={2}>
          <Button color='info' onClick={() => setOpen(true)}>
            Tạo tài khoản
          </Button>
          <Button color='info' startIcon={<IosShareRounded />}>
            Xuất file
          </Button>
        </Stack>
      </Stack>
      {/* All members data table */}
      {loading ? (
        <SupportTable headCells={headCells} />
      ) : accountsData.length === 0 ? (
        <SupportTable headCells={headCells} state='empty' />
      ) : (
        <EnhancedTable
          headCells={headCells}
          rows={visibleRows}
          totalRows={accountsData.length}
          onChangePage={(_e, page) => setQuery({ ...query, page })}
          onSort={(_e, order, orderByKey) => setQuery({ ...query, order, orderByKey })}
          onAct={(_e, id) => setSelectedRow(id)}>
          <Link href={`/members/accounts/${selectedRow}`}>
            <MenuItem>Xem chi tiết</MenuItem>
          </Link>
          <Divider sx={{ my: 1 }} />
          <MenuItem sx={{ color: 'error.main' }}>Xóa tài khoản</MenuItem>
        </EnhancedTable>
      )}
      <CreateAccountModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
