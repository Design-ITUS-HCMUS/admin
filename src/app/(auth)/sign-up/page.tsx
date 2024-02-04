'use client';

// React
import { ReactNode } from 'react';

// Internal
import AuthenLayout from '@/app/(auth)/layout';
import { CardPage } from '@/app/(auth)/_components';

const SignUp = () => {
  return (
    <CardPage
      header='Đăng ký tài khoản'
      showInputUsername
      showInputEmail
      showInputPassword
      showInputRetypePassword
      showPrimaryButton
      buttonPrimaryText='Đăng ký'
      showFooter
      footerMainText='Đã có tài khoản?'
      footerLinkText='Đăng nhập'
      footerLinkHref='/sign-in'
    />
  );
};

SignUp.getLayout = (page: ReactNode) => {
  return <AuthenLayout>{page}</AuthenLayout>;
};

export default SignUp;
