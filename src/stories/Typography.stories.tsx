import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import Typography, { TypographyProps } from '@mui/material/Typography';

export const MUITypography = ({ ...rest }: TypographyProps) => <Typography {...rest}>MUI Typography</Typography>;

const meta: Meta = {
  title: 'Custom MUI/Typography',
  component: MUITypography,
  tags: ['autodocs'],
  args: {
    children: 'Typography',
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const LinkPrimary: Story = {
  args: {
    variant: 'linkPrimary',
  },
};

export const LinkAccent: Story = {
  args: {
    variant: 'linkAccent',
  },
};
