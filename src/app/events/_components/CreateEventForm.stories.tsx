import { CreateEventForm } from './CreateEventForm';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CreateEventForm> = {
  title: 'Pages/Events/Create Event Form',
  component: CreateEventForm,
  parameters: {
    layout: 'centered',
  }
};

export default meta;
export const Default: StoryObj = {
  name: 'Create Event Form',
};