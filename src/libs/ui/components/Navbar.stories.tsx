// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from '@storybook/react';

import Navbar from './Navbar';
import { NavBarItem } from './Navbar';

const meta: Meta<typeof Navbar> = {
  component: Navbar,
  argTypes: {
    activeURL: '/events/OS8',
  },
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
  render: (args: any) => <Navbar {...args} />,
};
