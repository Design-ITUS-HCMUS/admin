import type { Meta, StoryObj } from '@storybook/react';

import { CountDown } from './CountDown';

const meta: Meta<typeof CountDown> = {
  title: 'Pages/Auth/CountDown',
  component: CountDown,
  parameters: {
    layout: 'centered',
  },
  args: {
    initialSeconds: 60,
    onComplete: () => {
      /* eslint-disable */
      console.log('Count down completed');
    },
  },
};

export default meta;
export const Default: StoryObj = {
  name: 'Count Down',
};