import type { Meta, StoryObj } from '@storybook/react';

import { CreateAccountModal } from './CreateAccountModal';

const meta: Meta<typeof CreateAccountModal> = {
  title: 'Pages/Members/Create Account Modal',
  component: CreateAccountModal,
  parameters: {
    layout: 'centered',
  },
  args: {
    open: true,
  },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {
  name: 'Create Account Modal',
};
