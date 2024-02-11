import type { Meta, StoryObj } from '@storybook/react';
import Paper from '@mui/material/Paper';

import { CreateEventForm } from './CreateEventForm';

const meta: Meta<typeof CreateEventForm> = {
  title: 'Pages/Events/Create Event Form',
  component: CreateEventForm,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Paper variant='section'>
        <Story />
      </Paper>
    ),
  ],
};

export default meta;
export const Default: StoryObj = {
  name: 'Create Event Form',
};
