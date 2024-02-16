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
import { useToast } from '@/hooks';
import { CreateAccountModal, DeleteAccountModal } from './_components';

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
  // The open state of modals
  const [openCreateAccountModal, setOpenCreateAccountModal] = useState(false);
  const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false);
  // Table actions
  const [selectedRow, setSelectedRow] = useState<ITableCell | null>(null);
  // Mock BE query state
  const [query, setQuery] = useState<Query>({ page: 1, limit: 10 });
  const { setAlert, setOpen } = useToast();

  useEffect(() => {
    fetch('/api/user/all-users')
      .then((res) => res.json())
      .then((res) => {
        const { success, data } = res;
        if (!success) throw new Error('Có lỗi khi tải dữ liệu');
        setAlert({
          alert: 'success',
          message: {
            title: 'Tải dữ liệu thành công',
            description: 'Dữ liệu tài khoản của các thành viên đã được tải thành công',
          },
        });
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
      .catch((err) => {
        setAlert({
          alert: 'error',
          message: {
            title: err.message,
            description:
              'Có lỗi khi tải dữ liệu tài khoản của các thành viên. Vui lòng thử lại sau hoặc báo cáo cho đội ngũ phát triển.',
          },
        });
      })
      .finally(() => {
        setOpen();
        setLoading(false);
      });
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
          <Button color='info' onClick={() => setOpenCreateAccountModal(true)}>
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
  );
}
