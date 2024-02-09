import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { PasswordInput } from './PasswordInput';

const meta: Meta<typeof PasswordInput> = {
  title: 'Global/Input/Password',
  component: PasswordInput,
  parameters: {
    layout: 'centered',
  },
  args: {
    inputProps: {
      size: 'medium',
      placeholder: 'Nhập mật khẩu',
      name: 'password',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'white', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj;
export const Default: Story = {
  name: 'Password',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const passwordInput = canvas.getAllByPlaceholderText('Nhập mật khẩu')[0];
    const toggleButton = canvas.getByRole('button');
    await userEvent.type(passwordInput, '12345678', { delay: 500 });
    await userEvent.click(toggleButton, { delay: 500 });
    await userEvent.click(toggleButton, { delay: 500 });
  },
};