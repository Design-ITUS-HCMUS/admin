'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import IosShareRounded from '@mui/icons-material/IosShareRounded';

import { EnhancedTable, IHeadCell, ProgressTag, Search, SupportTable } from '@/libs/ui';
import { tableHandler, Query } from '@/utils';
import { useToast } from '@/hooks';

const Section = styled('section')(({ theme }) => ({
  padding: theme.spacing(3, 3, 3),
  minHeight: 'calc(100vh - 64px - 48px)',
  marginTop: '64px',
}));

const StyledPaper = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  minHeight: 'inherit',
});

const headCells: readonly IHeadCell[] = [
  {
    key: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Tên sự kiện',
  },
  {
    key: 'key',
    label: 'Khóa',
  },
  {
    key: 'tag',
    label: 'Phân loại',
  },
  {
    key: 'start',
    label: 'Ngày bắt đầu',
  },
  {
    key: 'status',
    label: 'Tình trạng',
  },
];

interface ITableCell extends Record<(typeof headCells)[number]['key'], JSX.Element | string> {
  _id: string;
}

export default function EventsPage({ modal }: { modal: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [eventsData, setEventsData] = useState<ITableCell[]>([]);
  const [selectedRow, setSelectedRow] = useState<ITableCell | null>(null);
  const [query, setQuery] = useState<Query>({ page: 1, limit: 10 });
  const toast = useToast();

  useEffect(() => {
    fetch('/api/event/all-events')
      .then((res) => res.json())
      .then((res) => {
        const { success, data } = res;
        if (!success) throw new Error('Có lỗi khi tải dữ liệu');
        toast.setAlert({ alert: 'success', message: { title: 'Tải dữ liệu thành công' } });
        const loadData = data.map((item: any) => ({
          _id: item.id,
          name: item.name,
          key: item.key,
          tag: item.tag.join(', '),
          start: new Date(item.start).toLocaleDateString(),
          status: item.status,
        }));
        setEventsData(loadData);
      })
      .catch((err) => {
        toast.setAlert({
          alert: 'error',
          message: { title: 'Tải dữ liệu không thành công', description: err.message },
        });
        console.error(err);
      })
      .finally(() => {
        toast.setOpen();
        setLoading(false);
      });
  }, []);

  const refactorData = (eventsData: ITableCell[]): ITableCell[] => {
    const newData = eventsData.map((item: ITableCell) => ({
      ...item,
      name: (
        <Typography sx={{ color: 'primary.main' }} component={Link} href={`/events/${item.key}`}>
          {item.name}
        </Typography>
      ),
      status: (
        <ProgressTag variant={item.status ? 'done' : 'todo'} label={item.status ? 'Đang diễn ra' : 'Đã kết thúc'} />
      ),
    })) as ITableCell[];
    return newData;
  };

  const visibleRows: ITableCell[] = useMemo(() => {
    return refactorData(tableHandler({ query, data: eventsData }));
  }, [eventsData, query]);

  return (
    <Section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <StyledPaper variant='section'>
        {modal}
        <Typography variant='h6' fontWeight='600'>
          Sự kiện
        </Typography>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Search onSearch={(_value) => {}} onBlur={(_value) => {}} />
          <Stack direction='row' spacing={2}>
            <Button color='info' component={Link} href='/events/create'>
              Tạo sự kiện
            </Button>
            <Button color='info' startIcon={<IosShareRounded />}>
              Xuất file
            </Button>
          </Stack>
        </Stack>
        {loading ? (
          <SupportTable headCells={headCells} />
        ) : eventsData.length === 0 ? (
          <SupportTable headCells={headCells} state='empty' />
        ) : (
          <EnhancedTable
            headCells={headCells}
            rows={visibleRows}
            totalRows={eventsData.length}
            onChangePage={(_e, page) => setQuery({ ...query, page })}
            onSort={(_e, order, orderByKey) => setQuery({ ...query, order, orderByKey })}
            onAct={(_e, row) => setSelectedRow(row as ITableCell)}>
            <MenuItem component={Link} href={`/events/${selectedRow?.key}`}>
              Xem chi tiết
            </MenuItem>
            <MenuItem>Dừng sự kiện</MenuItem>
            <Divider sx={{ my: 1 }} />
            <MenuItem sx={{ color: 'error.main' }}>Xóa sự kiện</MenuItem>
          </EnhancedTable>
        )}
      </StyledPaper>
    </Section>
  );
}
