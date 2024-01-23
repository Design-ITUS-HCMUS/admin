import type { Meta, StoryObj } from '@storybook/react';

import * as React from 'react';
import { Button, ButtonProps } from '@mui/material'

const meta: Meta<ButtonProps> = {
  component: Button,
};

export default meta;
type Story = StoryObj<ButtonProps>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Primary: Story = {
  name: 'I am the primary 2',
  render: (args: ButtonProps) => <Button {...args}>Hello2</Button>,
};