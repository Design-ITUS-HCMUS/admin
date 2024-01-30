'use client';
import { Typography, Button, Alert } from '@mui/material';
import { TextFieldWithLabel } from '@/libs/ui';
export default function TestStyle() {
  return (
    <div>
      <Button>Đăng nhập</Button>
      <Button variant='text'>Đăng nhập</Button>
      <Button variant='outlined'>Đăng nhập</Button>
      <Button variant='contained' color='info'>
        Đăng nhập
      </Button>
      <TextFieldWithLabel label='Username' containerStyle={{ margin: '16px' }} inputProps={{ size: 'small' }} />
      <Alert severity='error' onClose={() => {}}>
        <Typography variant='body2'>Mã OTP không hợp lệ, vui lòng thử lại</Typography>
      </Alert>
    </div>
  );
}
