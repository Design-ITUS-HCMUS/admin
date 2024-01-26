import type { Meta, StoryObj } from '@storybook/react';

import * as React from 'react';
import { MyButton as Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    children: 'Primary color',
    variant: 'contained',
    color: 'primary',
  },
  render: (args: any) => <Button {...args} />,
};

export const Secondary: Story = {
  name: 'Info',
  args: {
    children: 'Info color',
    variant: 'contained',
    color: 'info',
  },
  render: (args: any) => <Button {...args} />,
};
