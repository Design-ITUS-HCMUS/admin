import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import Typography from '@mui/material/Typography';

import PeopleAltRounded from '@mui/icons-material/PeopleAltRounded';
import SettingsRounded from '@mui/icons-material/SettingsRounded';

import { SideBar } from './SideBar';
import { ISideBarItem } from './SideBarItem';

const SideBarItems: ISideBarItem[] = [
  {
    key: 'accounts',
    label: 'Tài khoản',
    icon: <PeopleAltRounded />,
  },
  {
    key: 'permissions',
    label: 'Quyền truy cập',
    icon: <SettingsRounded />,
  },
];

const meta: Meta<typeof SideBar> = {
  title: 'Global/Side Bar',
  component: SideBar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    header: {
      description: 'The header of the side bar.',
    },
    active: {
      description: 'The active key of the side bar item.',
    },
    SideBarItems: {
      description: 'The items of the side bar.',
    },
    onClickMenuItem: {
      description: 'The callback function to be called when the item is clicked.',
    },
  },
  args: {
    header: <Typography>Demo Header</Typography>,
    SideBarItems: SideBarItems,
    active: 'accounts',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: 'SideBar',
};
