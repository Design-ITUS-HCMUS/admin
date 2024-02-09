import type { Meta, StoryObj } from '@storybook/react';

import Paper from '@mui/material/Paper';
import { CustomSelectProps, SelectDepartment } from './CustomSelect';

const meta: Meta<CustomSelectProps> = {
  title: 'Pages/Members/CustomSelect',
  component: SelectDepartment,
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
export const Department: Story = {
  name: 'Department',
};