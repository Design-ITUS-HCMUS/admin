import type { Meta, StoryObj } from '@storybook/react';

import { Countdown } from './Countdown';

const meta: Meta<typeof Countdown> = {
  title: 'Pages/Auth/Countdown',
  component: Countdown,
  parameters: {
    layout: 'centered',
  },
  args: {
    initialSeconds: 60,
    onComplete: () => {
      /* eslint-disable */
      console.log('Countdown completed');
    },
  },
};

export default meta;
export const Default: StoryObj = {
  name: 'Countdown',
};
