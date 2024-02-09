import { PasswordFieldWithLabel } from './PasswordFieldWithLabel';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PasswordFieldWithLabel> = {
  title: 'Global/Input/Password',
  component: PasswordFieldWithLabel,
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Password',
    containerStyle: {
      width: '400px',
    },
    inputProps: {
      size: 'medium',
      placeholder: 'Nhập mật khẩu',
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
export const Default: StoryObj = {
  name: 'Password',
};
