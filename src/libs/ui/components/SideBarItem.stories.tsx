import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import Paper from '@mui/material/Paper';

import PeopleAltRounded from '@mui/icons-material/PeopleAltRounded';

import { SideBarItem } from './SideBarItem';

const meta: Meta<typeof SideBarItem> = {
  title: 'Global/Side Bar Item',
  component: SideBarItem,
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
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Paper sx={{ p: 2, width: '240px' }} variant='section'>
        <Story />
      </Paper>
    ),
  ],
};

export default meta;
type Story = StoryObj;
export const Default: Story = {
  name: 'Side Bar Item',
};
