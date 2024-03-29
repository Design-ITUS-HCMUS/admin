import type { Meta, StoryObj } from '@storybook/react';

import * as React from 'react';
import { InputLayout } from './InputLayout';

const meta: Meta<typeof InputLayout> = {
  component: InputLayout,
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
  name: 'InputLayout',
  args: {
    name: 'username',
    label: 'Username',
    inputProps: {
      placeholder: '<Gen><Họ và tên viết tắt> VD: 11lvntruc',
      required: true,
    },
    direction: 'column',
  },
  argTypes: {
    ratio: {
      control: {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.1,
      },
      description: 'The ratio of label width to field width. Only available when direction is <code>row</code>.',
    },
    inputProps: {
      description: `The props of the default input component. \
        If you want to use a custom input component, you can pass it as a child of <code>InputLayout</code>.\
        These props will be ignored.`,
    },
    direction: {
      description:
        'The direction of the layout. If <code>row</code>, the label will be placed on the left of the field.',
    },
  },
  render: (args: any) => <InputLayout {...args} />,
};
