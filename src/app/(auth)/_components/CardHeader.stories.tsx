// React
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// Internal
import { CardHeader } from './CardHeader';

const meta: Meta<typeof CardHeader> = {
  component: CardHeader,
};

export default meta;
type Story = StoryObj;

// /*
//  *👇 Render functions are a framework specific feature to allow you control on how the component renders.
//  * See https://storybook.js.org/docs/api/csf
//  * to learn how to use render functions.
//  */

export const Default: Story = {
  name: 'Card Header',
  args: {
    children: 'Design ITUS',
    typographyProps: {},
  },
  render: (args: any) => <CardHeader {...args} />,
};
