'use client';

// React
import React, { ReactNode } from 'react';

// Internal
import AuthenLayout from '@/app/(auth)/layout';
import { CardPage } from '@/app/(auth)/_components';

const SignIn = () => {
  return (
    <CardPage
      header='Câu lạc bộ học thuật thiết kế <br /> Design ITUS'
      showSignInWithOther
      showSignInWithAccount
      showInputUsername
      userNameTitle='Nhập tên đội'
      userNamePlaceholder='Username hoặc email'
      showInputPassword
      showForgetPassword
      showPrimaryButton
      buttonPrimaryText='Đăng nhập'
      showFooter
      footerMainText='Chưa có tài khoản?'
      footerLinkText='Đăng ký'
      footerLinkHref='/sign-up'
    />
  );
};

SignIn.getLayout = (page: ReactNode) => {
  return <AuthenLayout>{page}</AuthenLayout>;
};

export default SignIn;
