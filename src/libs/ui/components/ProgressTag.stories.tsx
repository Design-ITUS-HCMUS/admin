import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ProgressTag } from './ProgressTag';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProgressTag> = {
  title: 'Global/ProgressTag',
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
  name: 'ProgressTag',
};
