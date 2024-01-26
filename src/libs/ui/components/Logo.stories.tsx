import type { Meta, StoryObj } from '@storybook/react';

import * as React from 'react';
import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  component: Logo,
};

export default meta;
type Story = StoryObj;

// /*
//  *👇 Render functions are a framework specific feature to allow you control on how the component renders.
//  * See https://storybook.js.org/docs/api/csf
//  * to learn how to use render functions.
//  */

export const Default: Story = {
  name: 'Logo',
  render: (args: any) => <Logo {...args} />,
};
