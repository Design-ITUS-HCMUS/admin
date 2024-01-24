import type { Meta, StoryObj } from '@storybook/react';

import * as React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { MyButton } from '@/libs/ui/components/Button';

const meta: Meta = {
  component: MyButton,
};

export default meta;
type Story = StoryObj;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Primary: Story = {
  name: 'I am the primary',
  render: (args: ButtonProps) => <MyButton {...args}>Hlelo1</MyButton>,
};
