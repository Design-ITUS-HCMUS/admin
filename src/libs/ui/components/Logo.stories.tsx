import { Logo } from './Logo';

import type { Meta } from '@storybook/react';

const meta: Meta<typeof Logo> = {
  title: 'Global/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
  },
};

export default meta;