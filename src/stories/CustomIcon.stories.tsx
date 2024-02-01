import type { Meta, StoryObj } from '@storybook/react';

import * as React from 'react';
import { ProgressIcon } from '@/libs/ui';
import { SvgIconProps } from '@mui/material';

const meta: Meta = {
  component: ProgressIcon,
};

export default meta;
type Story = StoryObj;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

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
