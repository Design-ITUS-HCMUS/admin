// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from '@storybook/react';

import Navbar, { NavbarProps } from './Navbar';

const meta: Meta<NavbarProps> = {
  title: 'Global/Nav Bar',
  component: Navbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;
export const Default: Story = {
  name: 'Nav Bar',
};
export const Active: Story = {
  name: 'Nav Bar with active nav pill',
  args: {
    activeURL: '/events',
  },
};
