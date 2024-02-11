import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import MenuItem from '@mui/material/MenuItem';
import { SelectProps } from '@mui/material/Select';

import { Dropdown } from './Dropdown';

const meta: Meta<SelectProps> = {
  title: 'Global/Input/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: [
      <MenuItem value={1} key={1}>
        One
      </MenuItem>,
      <MenuItem value={2} key={2}>
        Two
      </MenuItem>,
      <MenuItem value={3} key={3}>
        Three
      </MenuItem>,
    ],
    sx: {
      width: '300px',
    },
  },
};

export default meta;
export const DefaultOutlined: StoryObj = {
  name: 'Default',
};
