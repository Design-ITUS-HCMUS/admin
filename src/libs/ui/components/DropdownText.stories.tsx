import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import MenuItem from '@mui/material/MenuItem';

import ExpandMore from '@mui/icons-material/ExpandMoreRounded';

import { DropdownText } from './DropdownText';

const meta: Meta<typeof DropdownText> = {
  title: 'Global/DropDown/Text',
  component: DropdownText,
  parameters: {
    layout: 'centered',
  },
  args: {
    IconComponent: ExpandMore,
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
    renderValue: (value: any) => {
      if (!value) return 'Chọn 1 option';
      return value;
    },
  },
};

export default meta;
export const Default: StoryObj = {
  name: 'Text',
};
