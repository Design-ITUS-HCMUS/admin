import * as yup from 'yup';

import { Schema } from './schema';

export const SignupSchema = yup.object().shape({
  username: yup
    .string()
    .required('Vui lòng nhập username')
    .min(4, 'Tên người dùng phải có ít nhất 4 ký tự')
    .matches(/^\S*$/, 'Tên người dùng không thể chứa khoảng trắng'),
  email: Schema.email,
  password: Schema.password,
  repassword: yup
    .string()
    .required('Vui lòng nhập lại mật khẩu')
    .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
});

export const SigninSchema = yup.object().shape({
  username: yup.string().required('Vui lòng nhập username hoặc email'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
});

export const OTPSchema = yup.object().shape({
  otp: yup
    .string()
    .required('Vui lòng nhập OTP')
    .matches(/^\d{6}$/, 'OTP không hợp lệ'),
});

export const ForgetPasswordSchema = yup.object().shape({
  password: Schema.password,
  repassword: yup
    .string()
    .required('Vui lòng nhập lại mật khẩu')
    .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
});
