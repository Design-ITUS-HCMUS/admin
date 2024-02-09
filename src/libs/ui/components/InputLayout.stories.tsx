import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import SelectInput from '@mui/material/Select';
import { InputLayout } from './InputLayout';

const meta: Meta<typeof InputLayout> = {
  title: 'Global/Input/Layout',
  component: InputLayout,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'white', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  args: {
    name: 'username',
    label: 'Username',
    inputprops: {
      placeholder: '<Gen><Họ và tên viết tắt> VD: 11lvntruc',
      required: true,
    },
    direction: 'column',
    sx: { width: '300px' },
  },
  argTypes: {
    ratio: {
      control: {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
    direction: {
      description:
        'The direction of the layout. If <code>row</code>, the label will be placed on the left of the field.',
    },
  },
};

export default meta;
export const Column: StoryObj = {
  name: 'Layout Column',
  args: {
    direction: 'column',
  },
};
export const Row: StoryObj = {
  name: 'Layout Row',
  args: {
    direction: 'row',
    sx: { width: '500px' },
    inputprops: {
      placeholder: 'Default with 50% label and 50% input field',
    },
  },
};
export const CustomRatio: StoryObj = {
  name: 'Custom Ratio',
  args: {
    ratio: 0.25,
    direction: 'row',
    sx: { width: '500px' },
    inputprops: {
      placeholder: '25% label and 75% input field',
    },
  },
};
export const ErrorState: StoryObj = {
  name: 'Error State',
  args: {
    ratio: 0.25,
    direction: 'row',
    sx: { width: '500px' },
    inputprops: {
      placeholder: '25% label and 75% input field',
      error: true,
    },
    helperText: 'This is an error message',
  },
};
export const CustomInput: StoryObj = {
  name: 'Custom Input',
  args: {
    direction: 'column',
    children: <SelectInput><option>Option 1</option></SelectInput>,
  },
};
