// React
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// Internal
import { CountDown } from './CountDown';

const meta: Meta<typeof CountDown> = {
  component: CountDown,
};

export default meta;
type Story = StoryObj;

// /*
//  *👇 Render functions are a framework specific feature to allow you control on how the component renders.
//  * See https://storybook.js.org/docs/api/csf
//  * to learn how to use render functions.
//  */

export const Default: Story = {
  name: 'Count Down',
  args: {
    initialSeconds: 60,
    onComplete: () => {
      console.log('Count down completed');
    },
  },
  render: (args: any) => <CountDown {...args} />,
};
