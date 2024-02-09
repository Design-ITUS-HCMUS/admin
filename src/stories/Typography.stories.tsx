import * as React from 'react';

import { Typography, TypographyProps } from '@mui/material';

import type { Meta, StoryObj } from '@storybook/react';

export const MUITypography = ({ ...rest }: TypographyProps) => <Typography {...rest}>MUI Typography</Typography>;

const meta: Meta = {
  title: 'Custom MUI/Typography',
  component: MUITypography,
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
