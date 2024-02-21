'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { orderBy } from 'lodash';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import IosShareRounded from '@mui/icons-material/IosShareRounded';

// import eventsData from '@/libs/mock/events.json';
import { EnhancedTable, IHeadCell, ProgressTag, Search } from '@/libs/ui';
import { Order } from '@/utils';

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
    label: 'Tên sự kiện',
  },
  {
    id: 'key',
    label: 'Khóa',
  },
  {
    id: 'tag',
    label: 'Phân loại',
  },
  {
    id: 'start',
    label: 'Ngày bắt đầu',
  },
  {
    id: 'status',
    label: 'Tình trạng',
  },
];

interface ITableCell extends Record<(typeof headCells)[number]['id'], JSX.Element | string> {
  _id: string;
}

export default function EventsPage({ modal }: { modal: React.ReactNode }) {
  let eventsData: ITableCell[] = [];
  const rowsPerPage = 10;
  const [rows, setRows] = useState<ITableCell[]>(eventsData);
  const [page, setPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/event/all-events')
      .then((res) => res.json())
      .then((res) => res.data)
      .then((res) => {
        eventsData = res.map((item: any) => ({
          _id: item.key,
          name: item.name,
          key: item.key,
          tag: item.tag.join(', '),
          start: new Date(item.start).toLocaleDateString(),
          status: item.status,
        }));
        setRows(eventsData);
      });
  }, []);

  const handleSort = (_event: unknown, order: Order, orderByID: number | null) => {
    if (orderByID !== null) {
      const key = headCells[orderByID].id;
      if (!key) return;
      const sortRows = orderBy(eventsData, key, order) as ITableCell[];
      setRows(sortRows);
    } else setRows(eventsData);
  };

  const refactorData = (eventsData: ITableCell[]): ITableCell[] => {
    const newData = eventsData.map((item: ITableCell) => ({
      ...item,
      name: (
        <Typography sx={{ color: 'primary.main' }} component={Link} href={`/events/${item._id}`}>
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
    return refactorData(rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage));
  }, [rows, page]);

  return (
    <Section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <StyledPaper variant='section'>
        {modal}
        <Typography variant='h6' fontWeight='600'>
          Sự kiện
        </Typography>
        <ToolBar>
          <Search onSearch={(_value) => {}} onBlur={(_value) => {}} />
          <Stack direction='row' spacing={2}>
            <Button color='info' component={Link} href='/events/create'>
              Tạo sự kiện
            </Button>
            <Button color='info' startIcon={<IosShareRounded />}>
              Xuất file
            </Button>
          </Stack>
        </ToolBar>
        <EnhancedTable
          headCells={headCells}
          rows={visibleRows}
          totalRows={eventsData.length}
          onChangePage={(_e, page) => setPage(page)}
          onSort={handleSort}
          onAct={(_e, id) => setSelectedRow(id)}>
          <MenuItem component={Link} href={`/events/${selectedRow}`}>
            Xem chi tiết
          </MenuItem>
          <MenuItem>Dừng sự kiện</MenuItem>
          <Divider />
          <MenuItem sx={{ color: 'error.main' }}>Xóa sự kiện</MenuItem>
        </EnhancedTable>
      </StyledPaper>
    </Section>
  );
}
