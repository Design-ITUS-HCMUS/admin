'use client';

// React and Next
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Internal
import AuthenLayout from '@/app/(auth)/layout';
import { CardPage } from '@/app/(auth)/_components';

const SIGN_IN_PAGE = '/sign-in';

const Success = () => {
  const router = useRouter();
  const backSignInPage = () => {
    router.replace(SIGN_IN_PAGE);
  };

  return (
    <CardPage
      header='Thay đổi mật khẩu thành công'
      showContent
      content='Bạn đã thay đổi mật khẩu thành công, vui lòng đăng nhập lại với mật khẩu mới. Trở về trang đăng nhập sau'
      timeRemainInSecond={5}
      showPrimaryButton
      buttonPrimaryText='Đăng nhập'
      buttonPrimaryHref={SIGN_IN_PAGE}
      handleCompleteCountDown={backSignInPage}
    />
  );
};

Success.getLayout = (page: ReactNode) => {
  return <AuthenLayout>{page}</AuthenLayout>;
};

export default Success;
