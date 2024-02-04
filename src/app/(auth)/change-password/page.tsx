'use client';

// React
import { ReactNode } from 'react';

// Internal
import AuthenLayout from '@/app/(auth)/layout';
import { CardPage } from '@/app/(auth)/_components';

const ChangePassword = () => {
  return (
    <CardPage
      header='Thay đổi mật khẩu'
      showInputPassword
      passwordTitle='Mật khẩu mới'
      passwordPlaceholder='Nhập mật khẩu mới'
      showInputRetypePassword
      showPrimaryButton
      buttonPrimaryText='Thay đổi'
      buttonPrimaryHref='/change-password/success'
    />
  );
};

ChangePassword.getLayout = (page: ReactNode) => {
  return <AuthenLayout>{page}</AuthenLayout>;
};

export default ChangePassword;
