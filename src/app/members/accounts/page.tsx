'use client';
import Link from 'next/link';
import { useState } from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import IosShareRounded from '@mui/icons-material/IosShareRounded';

import { EnhancedTable, IHeadCell, Search, ProgressTag } from '@/libs/ui';
import { Order, stableSort, getComparator } from '@/utils';
import { CreateAccountModal } from './_components';

const ButtonGroup = styled('div')({
  display: 'flex',
  gap: '1rem',
});

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

interface ITableCell {
  name: JSX.Element;
  gen: string;
  department: string;
  facebook: string;
}

const data = [
  {
    name: 'Nguyễn Văn A',
    gen: '11',
    department: 'Video',
    facebook: 'https://www.facebook.com/ngantruc2003/',
  },
  {
    name: 'Nguyễn Văn B',
    gen: '11',
    department: 'Drawing',
    facebook: 'https://www.facebook.com/ngantruc2003/',
  },
  {
    name: 'Nguyễn Văn C',
    gen: '12',
    department: 'Photography',
    facebook: 'https://www.facebook.com/Nash.Equ17ibrium',
  },
];

export default function AccountsPage() {
  const [open, setOpen] = useState(false);

  const refactorData = (data: any): ITableCell[] => {
    return data.map((item: any) => {
      return {
        name: (
          <Typography sx={{ color: 'primary.main' }}>
            <Link href={`/events/${item.key}`}>{item.name}</Link>
          </Typography>
        ),
        gen: item.gen,
        deparment: item.department,
        facebook: (
          <Link href={`/events/${item.facebook}`}>
            <Typography sx={{ color: 'primary.main', maxWidth: '250px' }} textOverflow='ellipsis' overflow='hidden'>
              {item.facebook}
            </Typography>
          </Link>
        ),
      };
    }) as ITableCell[];
  };

  return (
    <>
      <Typography variant='h6' fontWeight='600'>
        Quản lý tài khoản
      </Typography>
      <ToolBar>
        <Search onSearch={(_value) => {}} onBlur={(_value) => {}} />
        <ButtonGroup>
          <Button variant='contained' color='info' onClick={() => setOpen(true)}>
            Tạo tài khoản
          </Button>
          <Button variant='contained' color='info' startIcon={<IosShareRounded />}>
            Xuất file
          </Button>
        </ButtonGroup>
      </ToolBar>
      <EnhancedTable
        headCells={headCells}
        rows={refactorData(data)}
        totalRows={data.length}
        onChangePage={() => {}}
        onSort={() => {}}
      />
      <CreateAccountModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
