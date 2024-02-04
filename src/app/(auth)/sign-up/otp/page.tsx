'use client';

// React
import { ReactNode, useState } from 'react';

// Internal
import AuthenLayout from '@/app/(auth)/layout';
import { CardPage } from '@/app/(auth)/_components';

const OTP = () => {
  const [ableResend, setAbleResend] = useState(false);
  const enableResend = () => {
    setAbleResend(true);
  };

  return (
    <CardPage
      header='Xác thực mã OTP'
      showContent
      content='Một mã OTP đã được gửi đến de******ub@gmail.com. Vui lòng không chia sẻ với bất kỳ ai. Nếu không nhận được email, bạn có thể gửi lại sau'
      timeRemainInSecond={60}
      showOTP
      showPrimaryButton
      buttonPrimaryText='Xác nhận'
      buttonPrimaryHref='/sign-up/success'
      showSecondaryButton
      buttonSecondaryText='Gửi lại mã'
      showFooter
      footerMainText='Đã có tài khoản?'
      footerLinkHref='/sign-in'
      footerLinkText='Đăng nhập'
      disableSecondaryButton={!ableResend}
      handleCompleteCountDown={enableResend}
    />
  );
};

OTP.getLayout = (page: ReactNode) => {
  return <AuthenLayout>{page}</AuthenLayout>;
};

export default OTP;
