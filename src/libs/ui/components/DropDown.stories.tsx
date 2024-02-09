import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { DropdownWithLabel as DropDown } from './DropDown';

const meta: Meta<typeof DropDown> = {
  title: 'Global/DropDown',
  component: DropDown,
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Insert label',
    children: <option>Option 1</option>,
  },
};

export default meta;
export const Default: StoryObj = {
  name: 'DropDown',
};