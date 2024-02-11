import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { SvgIconProps } from '@mui/material';

import { ProgressIcon } from '@/libs/ui';

const meta: Meta = {
  title: 'Custom MUI/Custom Icons',
  component: ProgressIcon,
};

export default meta;
type Story = StoryObj;

export const All: Story = {
  render: (args: SvgIconProps) => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <ProgressIcon {...args} />
    </div>
  ),
};
export const Progress: Story = {
  render: (args: SvgIconProps) => <ProgressIcon {...args} />,
};
