import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Search } from './Search';

const meta: Meta<typeof Search> = {
  title: 'Global/Input/Search',
  component: Search,
  parameters: {
    layout: 'centered',
  },
  args: {
    inputProps: {
      placeholder: 'Tìm kiếm',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'white', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj;
export const Default: Story = {
  name: 'Search',
};
