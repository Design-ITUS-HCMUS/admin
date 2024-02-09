'use client';
import { useMemo,useState } from 'react';
import Link from 'next/link';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import IosShareRounded from '@mui/icons-material/IosShareRounded';

import data from './events.json';

import { EnhancedTable, IHeadCell, ProgressTag,Search } from '@/libs/ui';
import { getComparator,Order, stableSort } from '@/utils';

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
    id: 'type',
    label: 'Phân loại',
  },
  {
    id: 'startTime',
    label: 'Ngày bắt đầu',
  },
  {
    id: 'leader',
    label: 'Trưởng BTC',
  },
  {
    id: 'status',
    label: 'Tình trạng',
  },
];

interface ITableCell {
  name: JSX.Element;
  key: string;
  type: string;
  startTime: string;
  leader: string;
  status: JSX.Element;
}

export default function EventsPage({ modal }: { modal: React.ReactNode }) {
  const rowsPerPage = 10;
  const [rows, setRows] = useState(data);
  const [page, setPage] = useState(0);
  const handleChangePage = (_event: unknown, tablePage: number) => {
    setPage(tablePage);
  };

  const handleSort = (_event: unknown, order: Order, orderBy: number | null) => {
    if (orderBy !== null) {
      setRows(stableSort(data, getComparator(order, headCells[orderBy].id)));
    } else setRows(data);
  };

  const refactorData = (data: any): ITableCell[] => {
    return data.map((item: any) => {
      return {
        name: (
          <Typography sx={{ color: 'primary.main' }}>
            <Link href={`/events/${item.key}`}>{item.name}</Link>
          </Typography>
        ),
        key: item.key,
        type: item.type,
        startTime: item.startTime,
        leader: (
          <Typography sx={{ color: 'primary.main' }}>
            <Link href={`/events`}>{item.leader}</Link>
          </Typography>
        ),
        status: <ProgressTag variant={item.status == 'Đang diễn ra' ? 'done' : 'todo'} label={item.status} />,
      };
    }) as ITableCell[];
  };

  const visibleRows: ITableCell[] = useMemo(() => {
    const tableRows = refactorData(rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage));
    return tableRows;
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
            <Link href='/events/create'>
              <Button variant='contained' color='info'>
                Tạo sự kiện
              </Button>
            </Link>
            <Button variant='contained' color='info' startIcon={<IosShareRounded />}>
              Xuất file
            </Button>
          </Stack>
        </ToolBar>
        <EnhancedTable
          headCells={headCells}
          rows={visibleRows}
          totalRows={data.length}
          onChangePage={handleChangePage}
          onSort={handleSort}
        />
      </StyledPaper>
    </Section>
  );
}
