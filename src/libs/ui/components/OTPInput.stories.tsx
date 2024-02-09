import { OTPInput } from './OTPInput';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof OTPInput> = {
  title: 'Global/Input/OTP',
  component: OTPInput,
  parameters: {
    layout: 'centered',
  },
  args: {
    onChange: (res: string) => console.log(res),
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
  name: 'OTP',
};
