import type { Meta, StoryObj } from '@storybook/react';

import { TextFieldWithLabel } from './TextFieldWithLabel';

const meta: Meta<typeof TextFieldWithLabel> = {
  title: 'Global/Input/Text Field With Label',
  component: TextFieldWithLabel,
  args: {
    label: 'Username',
    containerStyle: {
      width: '400px',
    },
    inputProps: {
      size: 'medium',
      placeholder: 'Nhập username hoặc email',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: 'Text Field With Label',
};
