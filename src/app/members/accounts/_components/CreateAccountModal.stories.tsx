import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import Button from '@mui/material/Button';
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
  decorators: [
    (Story) => (
      <div>
        <Button id="open-btn">
          Open Modal
        </Button>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj;
export const Default: Story = {
  name: 'Create Account Modal',
};