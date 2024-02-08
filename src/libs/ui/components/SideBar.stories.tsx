import type { Meta, StoryObj } from '@storybook/react';

import * as React from 'react';
import Typography from '@mui/material/Typography';
import PeopleAltRounded from '@mui/icons-material/PeopleAltRounded';
import SettingsRounded from '@mui/icons-material/SettingsRounded';
import { SideBar } from './SideBar';
import { ISideBarItem } from './SideBarItem';

const meta: Meta<typeof SideBar> = {
  component: SideBar,
};

export default meta;
type Story = StoryObj;

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

export const Default: Story = {
  name: 'SideBar',
  args: {
    header: <Typography>Demo Header</Typography>,
    SideBarItems: SideBarItems,
    active: 'accounts',
  },
  render: (args: any) => <SideBar {...args} />,
};
