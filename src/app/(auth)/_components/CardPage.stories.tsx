// React
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// Libs
import { TextFieldWithLabel as TextField } from '@/libs/ui/components';

// Material UI Components
import InputAdornment from '@mui/material/InputAdornment';

// Material UI Icons
import PersonIcon from '@mui/icons-material/PersonRounded';

// Internal
import { CardPage } from '@/app/(auth)/_components';
const meta: Meta<typeof CardPage> = {
  component: CardPage,
};

export default meta;
type Story = StoryObj;

// /*
//  *👇 Render functions are a framework specific feature to allow you control on how the component renders.
//  * See https://storybook.js.org/docs/api/csf
//  * to learn how to use render functions.
//  */

export const Default: Story = {
  name: 'Card Page',
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
  render: (args: any) => <CardPage {...args} />,
};
