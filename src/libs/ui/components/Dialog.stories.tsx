import type { Meta, StoryObj } from '@storybook/react';

import * as React from 'react';
import { MyDialog } from './Dialog';

const meta: Meta<typeof MyDialog> = {
  component: MyDialog,
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  name: 'Dialog',
  args: {
    title: 'Insert title',
    content: 'Insert content',
    open: true,
    style: { fontFamily: 'Be Vietnam Pro', 'sans-serif': 'Arial' },
  },
  render: (args: any) => <MyDialog {...args}></MyDialog>,
};
