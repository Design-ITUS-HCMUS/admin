// React
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// Internal
import { PasswordFieldWithLabel } from './PasswordFieldWithLabel';

const meta: Meta<typeof PasswordFieldWithLabel> = {
  component: PasswordFieldWithLabel,
};

export default meta;
type Story = StoryObj;

// /*
//  *👇 Render functions are a framework specific feature to allow you control on how the component renders.
//  * See https://storybook.js.org/docs/api/csf
//  * to learn how to use render functions.
//  */

export const Default: Story = {
  name: 'Password Field With Label',
  args: {
    label: 'Password',
    containerStyle: {
      width: '400px',
    },
    textFieldProps: {
      size: 'medium',
      placeholder: 'Nhập mật khẩu',
    },
  },
  render: (args: any) => <PasswordFieldWithLabel {...args} />,
};
