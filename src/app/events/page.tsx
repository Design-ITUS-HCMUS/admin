'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Badge, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { EnhancedTable, IHeadCell, Search, ProgressTag } from '@/libs/ui/components';
import { FilterListRounded, IosShareRounded } from '@mui/icons-material';
import colors from '@/libs/ui/color';
import data from './events.json';
import { Order, stableSort, getComparator } from '@/utils';

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
  status: string;
}

export default function Events({ modal }: { modal: React.ReactNode }) {
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
          <Typography sx={{ color: colors.blue[500] }}>
            <Link href={`/events/${item.key}`}>{item.name}</Link>
          </Typography>
        ),
        key: item.key,
        type: item.type,
        startTime: item.startTime,
        leader: (
          <Typography sx={{ color: colors.blue[500] }}>
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
    <>
      {modal}
      <Typography variant='h6' fontWeight='600'>
        Sự kiện
      </Typography>
      <ToolBar>
        <Search onSearch={(_value) => {}} onBlur={(_value) => {}} />
        <ButtonGroup>
          <Link href='/events/create'>
            <Button variant='contained' color='info'>
              Tạo sự kiện
            </Button>
          </Link>
          <Badge badgeContent={11} max={9} color='primary'>
            <Button variant='contained' color='info' startIcon={<FilterListRounded />}>
              Bộ lọc
            </Button>
          </Badge>
          <Button variant='contained' color='info' startIcon={<IosShareRounded />}>
            Xuất file
          </Button>
        </ButtonGroup>
      </ToolBar>
      <EnhancedTable
        headCells={headCells}
        rows={visibleRows}
        totalRows={data.length}
        totalPages={Math.floor((data.length - 1) / rowsPerPage) + 1}
        onChangePage={handleChangePage}
        onSort={handleSort}
      />
    </>
  );
}