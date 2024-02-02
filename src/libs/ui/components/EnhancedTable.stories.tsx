import type { Meta, StoryObj } from '@storybook/react';

import * as React from 'react';
import { Typography } from '@mui/material';
import { EnhancedTable, IHeadCell } from './EnhancedTable';
import { colors } from '@/libs/ui';

const meta: Meta<typeof EnhancedTable> = {
  component: EnhancedTable,
};

export default meta;
type Story = StoryObj;

// /*
//  *👇 Render functions are a framework specific feature to allow you control on how the component renders.
//  * See https://storybook.js.org/docs/api/csf
//  * to learn how to use render functions.
//  */

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
    id: 'leader',
    label: 'Trưởng BTC',
  },
  {
    id: 'status',
    label: 'Tình trạng',
  },
];

const data = [
  {
    id: '1',
    name: 'Outr space 8',
    key: 'OS8',
    leader: 'Võ Tuấn Tài',
    status: 'Đang diễn ra',
  },
  {
    id: '2',
    name: 'Outr space 7',
    key: 'OS7',
    leader: 'Lê Vũ Ngân Trúc',
    status: 'Đã kết thúc',
  },
  {
    id: '3',
    name: 'Workshop D2D',
    key: 'D2D',
    leader: 'Võ Tuấn Tài',
    status: 'Đang diễn ra',
  },
  {
    id: '4',
    name: 'Tuyển quân gen 13',
    key: 'G13',
    leader: 'Võ Tuấn Tài',
    status: 'Đang diễn ra',
  },
  {
    id: '5',
    name: 'Tuyển quân gen 12',
    key: 'G12',
    leader: 'Lê Vũ Ngân Trúc',
    status: 'Đang diễn ra',
  },
  {
    id: '6',
    name: 'Outr space 8',
    key: 'OS8',
    leader: 'Võ Tuấn Tài',
    status: 'Đang diễn ra',
  },
  {
    id: '7',
    name: 'Outr space 7',
    key: 'OS7',
    leader: 'Lê Vũ Ngân Trúc',
    status: 'Đã kết thúc',
  },
  {
    id: '8',
    name: 'Workshop D2D',
    key: 'D2D',
    leader: 'Võ Tuấn Tài',
    status: 'Đang diễn ra',
  },
  {
    id: '9',
    name: 'Tuyển quân gen 13',
    key: 'G13',
    leader: 'Võ Tuấn Tài',
    status: 'Đang diễn ra',
  },
  {
    id: '10',
    name: 'Tuyển quân gen 12',
    key: 'G12',
    leader: 'Lê Vũ Ngân Trúc',
    status: 'Đang diễn ra',
  },
  {
    id: '11',
    name: 'Outr space 8',
    key: 'OS8',
    leader: 'Võ Tuấn Tài',
    status: 'Đang diễn ra',
  },
  {
    id: '12',
    name: 'Outr space 7',
    key: 'OS7',
    leader: 'Lê Vũ Ngân Trúc',
    status: 'Đã kết thúc',
  },
];

interface ITableCell {
  name: JSX.Element;
  key: string;
  leader: JSX.Element;
  status: string;
}

const refactorData = (data: any): ITableCell[] => {
  return data.map((item: any) => {
    return {
      name: <Typography sx={{ color: colors.blue[500] }}>{item.name}</Typography>,
      key: item.key,
      leader: <Typography sx={{ color: colors.blue[500] }}>{item.leader}</Typography>,
      status: item.status,
    };
  }) as ITableCell[];
};

export const Default: Story = {
  name: 'EnhancedTable',
  args: {
    headCells: headCells,
    totalRows: data.length,
    rowsPerPage: 5,
    rows: refactorData(data).slice(0, 5),
  },
  render: (args: any) => <EnhancedTable {...args} />,
};
