import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Paper from '@mui/material/Paper';

import { SupportTable } from './SupportTable';
import { IHeadCell } from './EnhancedTable';

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
    key: 'leader',
    label: 'Trưởng BTC',
  },
  {
    key: 'status',
    label: 'Tình trạng',
  },
];

const meta: Meta<typeof SupportTable> = {
  title: 'Global/Table/Support Table',
  component: SupportTable,
  parameters: {
    layout: 'centered',
  },
  args: {
    headCells: headCells,
  },
  argTypes: {
    state: {
      control: {
        type: 'select',
        options: ['loading', 'error'],
      },
    },
  },
  decorators: [
    (Story) => (
      <Paper variant='section'>
        <Story />
      </Paper>
    ),
  ],
};

export default meta;
export const Loading: StoryObj = {
  name: 'Loading',
  args: {
    state: 'loading',
  },
};

export const Empty: StoryObj = {
  name: 'Empty',
  args: {
    state: 'empty',
  },
};
