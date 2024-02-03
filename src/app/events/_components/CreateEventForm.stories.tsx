import type { Meta, StoryObj } from '@storybook/react';

import * as React from 'react';
import { CreateEventForm } from './CreateEventForm';

const meta: Meta<typeof CreateEventForm> = {
  component: CreateEventForm,
};

export default meta;
type Story = StoryObj;

// /*
//  *👇 Render functions are a framework specific feature to allow you control on how the component renders.
//  * See https://storybook.js.org/docs/api/csf
//  * to learn how to use render functions.
//  */

export const Default: Story = {
  name: 'CreateEventForm',
  render: (args: any) => <CreateEventForm {...args} />,
};
