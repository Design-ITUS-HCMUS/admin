import type { Meta, StoryObj } from '@storybook/react';

import Paper from '@mui/material/Paper';
import { CustomSelectProps, SelectRole } from './CustomSelect';

const meta: Meta<CustomSelectProps> = {
  title: 'Pages/Members/CustomSelect',
  component: SelectRole,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Paper sx={{width: "500px"}} variant="section">
        <Story />
      </Paper>
    ),
  ],
};

export default meta;
type Story = StoryObj;
export const Role: Story = {
  name: 'Role',
};