'use client';

// React
import Link from 'next/link';

// Material UI Components
import Button from '@mui/material/Button';

// Internal
import { CardLayout, StyledForm } from '@/app/(auth)/_components';
// Libs
import { InputLayout, PasswordInput } from '@/libs/ui';

function ChangePasswordPage() {
  return (
    <CardLayout header='Thay đổi mật khẩu'>
      <StyledForm>
        <InputLayout label='Mật khẩu mới'>
          <PasswordInput placeholder='Nhập mật khẩu mới' />
        </InputLayout>
        <InputLayout label='Nhập lại mật khẩu mới'>
          <PasswordInput placeholder='Nhập lại mật khẩu mới' />
        </InputLayout>
      </StyledForm>
      <Button size='large' component={Link} href='/sign-in/change-password/success'>
        Thay đổi
      </Button>
    </CardLayout>
  );
}

export default ChangePasswordPage;
