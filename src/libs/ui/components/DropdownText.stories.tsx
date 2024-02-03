import type { Meta, StoryObj } from '@storybook/react';

import * as React from 'react';
import { DropdownText, ExpandMoreIcon, DropdownTextProps } from './DropdownText';
import { MenuItem } from '@mui/material';

const meta: Meta<typeof DropdownText> = {
  component: DropdownText,
};

export default meta;
type Story = StoryObj;

// /*
//  *👇 Render functions are a framework specific feature to allow you control on how the component renders.
//  * See https://storybook.js.org/docs/api/csf
//  * to learn how to use render functions.
//  */


const renderValue = (value: any) => {
  if (!value) return "Chọn 1 option"
  return value
}

export const Default: Story = {
  name: 'DropdownText',
  args: {
    IconComponent: ExpandMoreIcon,
    children: [
      <MenuItem value={1} key={1}>One</MenuItem>,
      <MenuItem value={2} key={2}>Two</MenuItem>,
      <MenuItem value={3} key={3}>Three</MenuItem>,
    ],
    sx: {
      width: '300px',
    },
    renderValue: renderValue
  },
  render: (args: DropdownTextProps) => <DropdownText {...args}></DropdownText>,
};
