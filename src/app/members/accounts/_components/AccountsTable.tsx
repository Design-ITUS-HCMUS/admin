'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import IosShareRounded from '@mui/icons-material/IosShareRounded';

import { useToast } from '@/hooks';
import { useUsers } from '@/libs/query';
import { colors, EnhancedTable, IHeadCell, Search, SupportTable } from '@/libs/ui';
import { Query, shortenFBLink, tableHandler } from '@/utils';
import { CreateAccountModal, DeleteAccountModal } from '.';

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

export interface ITableCell extends Record<(typeof headCells)[number]['key'], JSX.Element | string> {
  _id: string;
}

export default function AccountsTable() {
  const { getMembers } = useUsers();
  const { data, status } = useQuery({
    queryKey: ['users', 'members'],
    queryFn: getMembers,
  });
  // The open state of modals
  const [openCreateAccountModal, setOpenCreateAccountModal] = useState(false);
  const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false);
  // Table actions
  const [selectedRow, setSelectedRow] = useState<ITableCell | null>(null);
  // Mock BE query state
  const [query, setQuery] = useState<Query>({ page: 1, limit: 10 });
  const { setAlert, setOpen } = useToast();

  useEffect(() => {
    setAlert({
      alert: 'success',
      message: {
        title: 'Tải dữ liệu thành công',
        description: 'Dữ liệu tài khoản của các thành viên đã được tải thành công',
      },
    });
    setOpen();
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
          target='_blank'
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
    if (status === 'success') return refactorData(tableHandler({ query, data }));
    else return [];
  }, [data, query]);

  return (
    status === 'success' && (
      <>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Search onSearch={(_value) => {}} onBlur={(_value) => {}} />
          <Stack direction='row' spacing={2}>
            <Button color='info' onClick={() => setOpenCreateAccountModal(true)}>
              Tạo tài khoản
            </Button>
            <Button color='info' startIcon={<IosShareRounded />}>
              Xuất file
            </Button>
          </Stack>
        </Stack>
        {/* All members data table */}
        {data.length === 0 ? (
          <SupportTable headCells={headCells} state='empty' />
        ) : (
          <EnhancedTable
            headCells={headCells}
            rows={visibleRows}
            totalRows={data.length}
            onChangePage={(_e, page) => setQuery({ ...query, page })}
            onSort={(_e, order, orderByKey) => setQuery({ ...query, order, orderByKey })}
            onAct={(_e, row) => setSelectedRow(row as ITableCell)}>
            <Link href={`/members/accounts/${selectedRow?._id}`}>
              <MenuItem>Xem chi tiết</MenuItem>
            </Link>
            <Divider sx={{ my: 1 }} />
            <MenuItem sx={{ color: 'error.main' }} onClick={() => setOpenDeleteAccountModal(true)}>
              Xóa tài khoản
            </MenuItem>
          </EnhancedTable>
        )}
        <CreateAccountModal open={openCreateAccountModal} handleClose={() => setOpenCreateAccountModal(false)} />
        <DeleteAccountModal
          fullName={(selectedRow?.name as string) || (selectedRow?.email as string)}
          userID={Number(selectedRow?._id)}
          open={openDeleteAccountModal}
          handleClose={() => setOpenDeleteAccountModal(false)}
        />
      </>
    )
  );
  // }
}
