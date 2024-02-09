import { CountDown } from './CountDown';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CountDown> = {
  title: 'Pages/Auth/CountDown',
  component: CountDown,
  parameters: {
    layout: 'centered',
  },
  args: {
    initialSeconds: 60,
    onComplete: () => {
      console.log('Count down completed');
    },
  },
};

export default meta;
export const Default: StoryObj = {
  name: 'Count Down',
};