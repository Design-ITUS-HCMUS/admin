import type { Meta, StoryObj } from '@storybook/react';

import * as React from 'react';
import { Typography } from '@mui/material';
import { Search } from './Search';

const meta: Meta<typeof Search> = {
  component: Search,
};

export default meta;
type Story = StoryObj;

// /*
//  *👇 Render functions are a framework specific feature to allow you control on how the component renders.
//  * See https://storybook.js.org/docs/api/csf
//  * to learn how to use render functions.
//  */
export const Default: Story = {
  name: 'Search',
  render: (args: any) => <Search {...args} onSearch={(_value) => {}} onBlur={(_value) => {}} />,
};
