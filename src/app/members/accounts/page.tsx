'use client';
import Link from 'next/link';
import { useState, MouseEvent } from 'react';

import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import IosShareRounded from '@mui/icons-material/IosShareRounded';

import { EnhancedTable, IHeadCell, Search } from '@/libs/ui';
import { CreateAccountModal } from './_components';
import data from './members.json';

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

export default function AccountsPage() {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const refactorData = (data: any): ITableCell[] => {
    return data.map((item: any) => {
      const newData: ITableCell = {
        _id: item.id,
        name: (
          <Typography sx={{ color: 'primary.main' }}>
            <Link href={`/members/account/${item.id}`}>{item.name}</Link>
          </Typography>
        ),
        gen: item.profile?.gen,
        department: item.profile?.departments.join(', '), // join array to string
        facebook: (
          <Link href={`/events/${item.facebook}`}>
            <Typography sx={{ color: 'primary.main', maxWidth: '250px' }} textOverflow='ellipsis' overflow='hidden'>
              {item.profile?.facebook}
            </Typography>
          </Link>
        ),
      };
      return newData;
    }) as ITableCell[];
  };

  const handleMore = (_e: MouseEvent<HTMLElement>, _id: string | null) => {
    setSelectedRow(_id);
  };

  return (
    <>
      <Typography variant='h6' fontWeight='600'>
        Quản lý tài khoản
      </Typography>
      <ToolBar>
        <Search onSearch={(_value) => {}} onBlur={(_value) => {}} />
        <Stack direction='row' spacing={2}>
          <Button variant='contained' color='info' onClick={() => setOpen(true)}>
            Tạo tài khoản
          </Button>
          <Button variant='contained' color='info' startIcon={<IosShareRounded />}>
            Xuất file
          </Button>
        </Stack>
      </ToolBar>
      {/* All members data table */}
      <EnhancedTable
        headCells={headCells}
        rows={refactorData(data)}
        totalRows={data.length}
        onChangePage={() => {}}
        onSort={() => {}}
        onAct={handleMore}>
        <Link href={`/members/accounts/${selectedRow}`}>
          <MenuItem>Xem chi tiết</MenuItem>
        </Link>
      </EnhancedTable>
      <CreateAccountModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
