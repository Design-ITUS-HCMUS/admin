'use client';
import { PasswordFieldWithLabel as PassField } from '@/libs/ui/components';
import { Button } from '@mui/material';
import { Row, StyledPaper, StyledForm, CardHeader } from '@/app';
import AuthenLayout from '@/app/(auth)/layout';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

const ChangePassword = () => {
  const router = useRouter();

  const handleLinkClick = (pathname: string) => {
    router.replace(pathname);
  };

  return (
    <>
      <StyledPaper elevation={0}>
        <CardHeader>Thay đổi mật khẩu</CardHeader>
        <StyledForm>
          <PassField
              label='Mật khẩu mới'
              inputProps={{
                placeholder: 'Nhập mật khẩu mới',
              }}
            />
          <PassField
              label='Nhập lại mật khẩu mới'
              inputProps={{
                placeholder: 'Nhập lại mật khẩu mới',
              }}
            />
        </StyledForm>
        <Row>
          <Button variant='contained' size='large'>
          <div
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/change-password/success');
              }}>
              Thay đổi
          </div>
          </Button>
        </Row>
      </StyledPaper>
    </>
  );
};

ChangePassword.getLayout = (page: ReactNode) => {
  return <AuthenLayout>{page}</AuthenLayout>;
};

export default ChangePassword;