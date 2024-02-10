// React
import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';

import PersonIcon from '@mui/icons-material/PersonRounded';

import { InputLayout } from '@/libs/ui';
import { CardLayout } from '.';

const meta: Meta<typeof CardLayout> = {
  title: 'Pages/Auth/Card Layout',
  component: CardLayout,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    page: 'signin',
    header: (
      <div>
        Câu lạc bộ học thuật thiết kế <br /> Design ITUS
      </div>
    ),
    children: (
      <InputLayout
        label='Nhập username hoặc email'
        name='username'
        inputprops={{
          placeholder: 'Username hoặc email',
          endAdornment: (
            <InputAdornment position='end'>
              <PersonIcon />
            </InputAdornment>
          ),
        }}
      />
    ),
    showFooter: true,
  },
  decorators: [
    (Story) => (
      <Paper variant='section' sx={{ width: '500px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Story />
      </Paper>
    ),
  ],
};

export default meta;
export const Signin: StoryObj = {
  name: 'Sign in',
  args: {
    page: 'signin',
    header: 'Đăng nhập',
  },
};

export const Signup: StoryObj = {
  name: 'Sign up',
  args: {
    page: 'signup',
    header: 'Đăng ký',
  },
};
