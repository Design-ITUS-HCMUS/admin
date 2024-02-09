import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import Paper, { PaperProps } from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { colors } from '@/libs/ui';

export const MUIPaper = ({ ...rest }: PaperProps) => (
  <Paper
    {...rest}>
    <Typography>MUI Paper</Typography>
  </Paper>
);

const meta: Meta = {
  title: 'Custom MUI/Paper',
  component: MUIPaper,
  decorators: [
    (Story) => (
      <div style={{ padding: '24px', background: colors.neutral[50] }}>
        <Story />
      </div>
    ),
  ],
  args: {
    elevation: 4,
    sx: {
      width: '300px',
      height: '200px',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Section: Story = {
  args: {
    variant: 'section',
    children: <Typography>Section Paper</Typography>
  },
};
