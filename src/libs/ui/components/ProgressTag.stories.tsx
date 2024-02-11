import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import Paper from '@mui/material/Paper';

import { ProgressTag } from './ProgressTag';

const meta: Meta<typeof ProgressTag> = {
  title: 'Global/Progress Tag',
  component: ProgressTag,
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Đang diễn ra',
    variant: 'done',
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
export const Default: StoryObj = {
  name: 'Progress Tag',
};
