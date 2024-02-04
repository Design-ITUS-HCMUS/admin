// React
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// Internal
import { CardPage } from './CardPage';

const meta: Meta<typeof CardPage> = {
  component: CardPage,
};

export default meta;
type Story = StoryObj;

// /*
//  *👇 Render functions are a framework specific feature to allow you control on how the component renders.
//  * See https://storybook.js.org/docs/api/csf
//  * to learn how to use render functions.
//  */

export const SignIn: Story = {
  name: 'Sign In',
  args: {
    header: 'Câu lạc bộ học thuật thiết kế <br /> Design ITUS',
    showSignInWithOther: true,
    showSignInWithAccount: true,
    showInputUsername: true,
    userNameTitle: 'Nhập tên đội',
    userNamePlaceholder: 'Username hoặc email',
    showInputPassword: true,
    showForgetPassword: true,
    showPrimaryButton: true,
    buttonPrimaryText: 'Đăng nhập',
    showFooter: true,
    footerMainText: 'Chưa có tài khoản?',
    footerLinkText: 'Đăng ký',
    footerLinkHref: '/sign-up',
  },
  render: (args: any) => <CardPage {...args} />,
};

export const SignInOTP: Story = {
  name: 'Sign In OTP',
  args: {
    header: 'Xác thực mã OTP',
    showContent: true,
    content:
      'Một mã OTP đã được gửi đến de******ub@gmail.com. Vui lòng không chia sẻ với bất kỳ ai. Nếu không nhận được email, bạn có thể gửi lại sau',
    timeRemainInSecond: 60,
    showOTP: true,
    showPrimaryButton: true,
    buttonPrimaryText: 'Xác nhận',
    buttonPrimaryHref: '/change-password',
    showSecondaryButton: true,
    buttonSecondaryText: 'Gửi lại mã',
    showFooter: true,
    footerMainText: 'Chưa có tài khoản?',
    footerLinkHref: '/sign-up',
    footerLinkText: 'Đăng ký',
    disableSecondaryButton: true,
    handleCompleteCountDown: () => {},
  },
  render: (args: any) => <CardPage {...args} />,
};

export const SignUp: Story = {
  name: 'Sign Up',
  args: {
    header: 'Đăng ký tài khoản',
    showInputUsername: true,
    showInputEmail: true,
    showInputPassword: true,
    showInputRetypePassword: true,
    showPrimaryButton: true,
    buttonPrimaryText: 'Đăng ký',
    showFooter: true,
    footerMainText: 'Đã có tài khoản?',
    footerLinkText: 'Đăng nhập',
    footerLinkHref: '/sign-in',
  },
  render: (args: any) => <CardPage {...args} />,
};

export const SignUpSuccess: Story = {
  name: 'Sign Up Success',
  args: {
    header: 'Đăng ký thành công',
    showContent: true,
    content: 'Bạn đã đăng ký tài khoản thành công, vui lòng đăng nhập với tài khoản mới. Trở về trang đăng nhập sau',
    timeRemainInSecond: 5,
    showPrimaryButton: true,
    buttonPrimaryText: 'Đăng nhập',
    buttonPrimaryHref: '/sign-in',
    handleCompleteCountDown: () => {},
  },
  render: (args: any) => <CardPage {...args} />,
};

export const SignUpOTP: Story = {
    name: 'Sign Up OTP',
    args: {
        header: 'Xác thực mã OTP',
        showContent: true,
        content: 'Một mã OTP đã được gửi đến de******ub@gmail.com. Vui lòng không chia sẻ với bất kỳ ai. Nếu không nhận được email, bạn có thể gửi lại sau',
        timeRemainInSecond: 60,
        showOTP: true,
        showPrimaryButton: true,
        buttonPrimaryText: 'Xác nhận',
        buttonPrimaryHref: '/sign-up/success',
        showSecondaryButton: true,
        buttonSecondaryText: 'Gửi lại mã',
        showFooter: true,
        footerMainText: 'Đã có tài khoản?',
        footerLinkHref: '/sign-in',
        footerLinkText: 'Đăng nhập',
        disableSecondaryButton: true,
        handleCompleteCountDown: () => {},
    },
    render: (args: any) => <CardPage {...args} />,
};

export const ForgetPassword: Story = {
    name: 'Forget Password',
    args: {
        header: 'Quên mật khẩu',
        showInputUsername: true,
        userNamePlaceholder: 'Username hoặc email đã đăng ký',
        showPrimaryButton: true,
        buttonPrimaryText: 'Gửi mã',
        buttonPrimaryHref: '/sign-in/otp',
        showFooter: true,
        footerMainText: 'Chưa có tài khoản?',
        footerLinkText: 'Đăng ký',
        footerLinkHref: '/sign-up',
    },
    render: (args: any) => <CardPage {...args} />,
};

export const ChangePassword: Story = {
    name: 'Change Password',
    args: {
        header: 'Thay đổi mật khẩu',
        showInputPassword: true,
        passwordTitle: 'Mật khẩu mới',
        passwordPlaceholder: 'Nhập mật khẩu mới',
        showInputRetypePassword: true,
        showPrimaryButton: true,
        buttonPrimaryText: 'Thay đổi',
        buttonPrimaryHref: '/change-password/success',
    },
    render: (args: any) => <CardPage {...args} />,
};

export const ChangePasswordSuccess: Story = {
    name: 'Change Password Success',
    args: {
        header: 'Thay đổi mật khẩu thành công',
        showContent: true,
        content: 'Bạn đã thay đổi mật khẩu thành công, vui lòng đăng nhập lại với mật khẩu mới. Trở về trang đăng nhập sau',
        timeRemainInSecond: 5,
        showPrimaryButton: true,
        buttonPrimaryText: 'Đăng nhập',
        buttonPrimaryHref: '/sign-in',
        handleCompleteCountDown: () => {},
    },
    render: (args: any) => <CardPage {...args} />,
};