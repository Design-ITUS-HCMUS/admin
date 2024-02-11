import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Dropdown } from './Dropdown';
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
    label: 'Username',
    inputProps: {
      placeholder: '<Gen><Họ và tên viết tắt> VD: 11lvntruc',
      required: true,
    },
    direction: 'column',
    containerProps: { sx: { width: '300px' } },
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
    containerProps: { sx: { width: '500px' } },
    inputProps: {
      placeholder: 'Default with 50% label and 50% input field',
    },
  },
};
export const Ratio: StoryObj = {
  name: 'Custom Ratio',
  args: {
    ratio: 0.25,
    direction: 'row',
    containerProps: { sx: { width: '500px' } },
    inputProps: {
      placeholder: '25% label and 75% input field',
    },
  },
};
export const Error: StoryObj = {
  name: 'Error State',
  args: {
    ratio: 0.25,
    direction: 'row',
    containerProps: { sx: { width: '500px' } },
    inputProps: {
      placeholder: '25% label and 75% input field',
      error: true,
    },
    helperText: 'This is an error message',
  },
};
export const Input: StoryObj = {
  name: 'Custom Input',
  args: {
    direction: 'column',
    children: (
      <Dropdown>
        <option value={1}>Option 1</option>
      </Dropdown>
    ),
  },
};
