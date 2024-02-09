import * as React from 'react';

import { TextFieldWithLabel } from './TextFieldWithLabel';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextFieldWithLabel> = {
  component: TextFieldWithLabel,
};

export default meta;
type Story = StoryObj;

// /*
//  *👇 Render functions are a framework specific feature to allow you control on how the component renders.
//  * See https://storybook.js.org/docs/api/csf
//  * to learn how to use render functions.
//  */

export const Default: Story = {
  name: 'Text Field With Label',
  args: {
    label: 'Username',
    containerStyle: {
      width: '400px',
    },
    textFieldProps: {
      size: 'medium',
      placeholder: 'Nhập username hoặc email',
      helperText: 'Nhập đúng định dạng',
    },
  },
  render: (args: any) => <TextFieldWithLabel {...args} />,
};
