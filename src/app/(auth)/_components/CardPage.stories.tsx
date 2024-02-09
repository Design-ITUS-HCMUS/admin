// React
import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import InputAdornment from '@mui/material/InputAdornment';

import PersonIcon from '@mui/icons-material/PersonRounded';

import { CardPage } from '@/app/(auth)/_components';
import { TextFieldWithLabel as TextField } from '@/libs/ui/components';

const meta: Meta<typeof CardPage> = {
  title: 'Pages/Auth/CardPage',
  component: CardPage,
  parameters: {
    layout: 'centered',
  },
  args: {
    header: 'Câu lạc bộ học thuật thiết kế <br /> Design ITUS',
    children: (
      <TextField
        label='Nhập tên đội'
        inputProps={{
          placeholder: 'Username hoặc email',
          endAdornment: (
            <InputAdornment position='end'>
              <PersonIcon />
            </InputAdornment>
          ),
        }}></TextField>
    ),
    showFooter: true,
    mainText: 'Chưa có tài khoản?',
    linkText: 'Đăng ký',
    linkHref: '/sign-up',
  },
};

export default meta;
export const Default: StoryObj = {
  name: 'CardPage',
};