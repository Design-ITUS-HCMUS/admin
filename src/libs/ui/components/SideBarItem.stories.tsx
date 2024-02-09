import * as React from 'react';

import PeopleAltRounded from '@mui/icons-material/PeopleAltRounded';

import { SideBarItem } from './SideBarItem';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SideBarItem> = {
  component: SideBarItem,
};

export default meta;
type Story = StoryObj;

// /*
//  *👇 Render functions are a framework specific feature to allow you control on how the component renders.
//  * See https://storybook.js.org/docs/api/csf
//  * to learn how to use render functions.
//  */
export const Default: Story = {
  name: 'SideBarItem',
  args: {
    label: 'Dashboard',
    icon: <PeopleAltRounded />,
  },
  argTypes: {
    active: {
      control: 'boolean',
      description: 'Set the active state of the item.',
    },
    icon: {
      description: 'The leading icon.',
    },
    label: {
      description: 'The object displayed as the label. Can be a string, a number, or a ReactNode.',
    },
    onClick: {
      description: 'The callback function to be called when the item is clicked.',
    },
  },
  render: (args: any) => <SideBarItem {...args} />,
};
