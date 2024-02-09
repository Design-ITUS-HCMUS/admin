// Replace your-framework with the name of your framework
import Navbar, { NavbarProps } from './Navbar';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<NavbarProps> = {
  component: Navbar,
};

export default meta;
type Story = StoryObj;

// /*
//  *👇 Render functions are a framework specific feature to allow you control on how the component renders.
//  * See https://storybook.js.org/docs/api/csf
//  * to learn how to use render functions.
//  */

export const Default: Story = {
  name: 'Navbar',
  render: (args: NavbarProps) => <Navbar {...args} />,
};
