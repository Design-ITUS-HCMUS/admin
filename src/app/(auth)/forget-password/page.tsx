'use client';

// React
import { ReactNode } from 'react';

// Internal
import AuthenLayout from '@/app/(auth)/layout';
import { CardPage } from '@/app/(auth)/_components';

const ForgetPassword = () => {
  return (
    <CardPage
      header='Quên mật khẩu'
      showInputUsername
      userNamePlaceholder='Username hoặc email đã đăng ký'
      showPrimaryButton
      buttonPrimaryText='Gửi mã'
      buttonPrimaryHref='/sign-in/otp'
      showFooter
      footerMainText='Chưa có tài khoản?'
      footerLinkText='Đăng ký'
      footerLinkHref='/sign-up'
    />
  );
};

ForgetPassword.getLayout = (page: ReactNode) => {
  return <AuthenLayout>{page}</AuthenLayout>;
};

export default ForgetPassword;
