import type { Meta, StoryObj } from '@storybook/react';

import * as React from 'react';
import { Typography, TypographyProps} from '@mui/material';

export const MUITypography = ({ ...rest }: TypographyProps) => <Typography {...rest}>MUI Typography</Typography>;

const meta: Meta = {
  component: MUITypography,
};

export default meta;
type Story = StoryObj;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const LinkPrimary: Story = {
  name: 'Link Primary',
  args: {
    variant: 'linkPrimary'
  },
  render: (args: TypographyProps) => <Typography {...args}>Link with primary color</Typography>,
};

export const LinkAccent: Story = {
    name: 'Link Accent',
    args: {
      variant: 'linkAccent'
    },
    render: (args: TypographyProps) => <Typography {...args}>Link with accent color</Typography>,
  };
