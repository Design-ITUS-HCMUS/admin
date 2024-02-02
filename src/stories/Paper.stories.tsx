import type { Meta, StoryObj } from '@storybook/react';

import * as React from 'react';
import { Paper, PaperProps, Typography } from '@mui/material';
import { colors } from '@/libs/ui';

export const MUIPaper = ({ ...rest }: PaperProps) => <Paper sx= {{
    width: "300px",
    height: "200px"
}}{...rest}>
    <Typography>MUI Paper</Typography>
</Paper>;

const meta: Meta = {
  component: MUIPaper,
  decorators: [
    (Story) => (
      <div style={{padding: "24px", background: colors.neutral[50]}}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Section: Story = {
  args: {
    variant: 'section',
    elevation: 4,
    sx: {
        width: "300px",
        height: "200px"
    }
  },
  render: (args: PaperProps) => <Paper {...args}>
  <Typography>Section Paper</Typography></Paper>,
};

