import type { Meta, StoryObj } from '@storybook/react';
import { userEvent } from '@storybook/testing-library';

import { OTPInput } from './OTPInput';

const meta: Meta<typeof OTPInput> = {
  title: 'Global/Input/OTP',
  component: OTPInput,
  parameters: {
    layout: 'centered',
  },
  args: {
    onChange: (res: string) => {
      /* eslint-disable */
      console.log(res);
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
  name: 'OTP',
  play: async () => {
    await userEvent.keyboard('123456', {delay: 1000})
    await userEvent.keyboard('{backspace}{backspace}789', { delay: 1000 });
  },
};
