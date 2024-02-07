// React
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// Internal
import { OTPInput } from './OTPInput';

const meta: Meta<typeof OTPInput> = {
  component: OTPInput,
};

export default meta;
type Story = StoryObj;

// /*
//  *👇 Render functions are a framework specific feature to allow you control on how the component renders.
//  * See https://storybook.js.org/docs/api/csf
//  * to learn how to use render functions.
//  */

export const Default: Story = {
  name: 'OTP Input',
  args: {
    onchange: (res: string) => console.log(res),
  },
  render: (args: any) => <OTPInput {...args} />,
};
