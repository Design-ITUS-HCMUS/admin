'use client';

import { CardFooter, CardHeader } from '.';

enum MAINTEXT {
  signin = 'Chưa có tài khoản?',
  signup = 'Đã có tài khoản?',
}

enum LINKTEXT {
  signin = 'Đăng ký',
  signup = 'Đăng nhập',
}

enum LINKHREF {
  signin = '/sign-up',
  signup = '/sign-in',
}

interface CardLayoutProps {
  /**Page type defines which contanst strings should be show. */
  page?: 'signin' | 'signup';
  /**Header of the card. */
  header?: React.ReactNode;
  /**Content of the card. */
  children?: React.ReactNode;
  /**Show the footer of the card. */
  showFooter?: boolean;
}

export function CardLayout({ header = '', children, showFooter, page = 'signin' }: CardLayoutProps) {
  return (
    <>
      <CardHeader>{header}</CardHeader>
      {children}
      {!!showFooter && <CardFooter mainText={MAINTEXT[page]} linkText={LINKTEXT[page]} linkHref={LINKHREF[page]} />}
    </>
  );
}
