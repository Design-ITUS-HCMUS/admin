import type { Meta, StoryObj } from '@storybook/react';

import { LoadingButton } from './LoadingButton';

const meta: Meta<typeof LoadingButton> = {
  title: 'Global/Loading Button',
  component: LoadingButton,
  parameters: {
    layout: 'centered',
  },
  args: {
    loading: true,
    children: 'Lưu',
  },
  argTypes: {
    loading: {
      control: {
        type: 'boolean',
      },
      description: 'The loading state of the button.',
    },
  },
};

export default meta;
export const Default: StoryObj = {
  name: 'Loading Button',
};
