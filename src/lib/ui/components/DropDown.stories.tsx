import type { Meta, StoryObj } from '@storybook/react';

import * as React from 'react';
import { DropdownWithLabel as DropDown } from './DropDown';

const meta: Meta<typeof DropDown> = {
  component: DropDown,
};

export default meta;
type Story = StoryObj;

// /*
//  *👇 Render functions are a framework specific feature to allow you control on how the component renders.
//  * See https://storybook.js.org/docs/api/csf
//  * to learn how to use render functions.
//  */

export const Primary: Story = {
  name: 'Dropdown with label',
  args: {
    label: 'Insert label',
    children: <option>Option 1</option>,
  },
  render: (args: any) => <DropDown {...args}></DropDown>,
};
