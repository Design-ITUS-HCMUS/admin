import type { Meta, StoryObj } from '@storybook/react';

import * as React from 'react';
import { ProgressTag } from './ProgressTag';

const meta: Meta<typeof ProgressTag> = {
  component: ProgressTag,
};

export default meta;
type Story = StoryObj;

// /*
//  *👇 Render functions are a framework specific feature to allow you control on how the component renders.
//  * See https://storybook.js.org/docs/api/csf
//  * to learn how to use render functions.
//  */
export const Default: Story = {
  name: 'ProgressTag',
  args: {
    label: 'Đang diễn ra',
  },
  render: (args: any) => <ProgressTag {...args} />,
};
