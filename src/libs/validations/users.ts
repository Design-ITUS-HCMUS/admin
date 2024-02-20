import * as yup from 'yup';

import { ROLE, DEPARTMENT, POSITION } from '@/utils';
import { Schema } from './schema';

export const MemberInfoSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username không được để trống')
    .min(4, 'Tên người dùng phải có ít nhất 4 ký tự')
    .matches(/^\S*$/, 'Tên người dùng không thể chứa khoảng trắng'),
  email: Schema.email,
  roleID: yup.number().required('Vai trò không được để trống').oneOf([ROLE.ADMIN, ROLE.MEMBER], 'Vai trò không hợp lệ'),
  profile: yup.object().shape({
    fullName: yup.string().required('Họ tên không được để trống'),
    phone: Schema.phone.nullable(),
    studentID: yup.string().nullable(),
    gen: yup.number().nullable(),
    school: yup.string().nullable(),
    dob: Schema.dob.nullable(),
    departments: yup
      .array()
      .default([])
      .of(yup.string().oneOf(Object.values(DEPARTMENT), 'Ban hoạt động không hợp lệ'))
      .nullable(),
    position: yup.string().required('Vị trí không được để trống').oneOf(Object.values(POSITION), 'Vị trí không hợp lệ'),
    facebook: Schema.facebook.nullable(),
  }),
});

export const ProfileBasicInfoSchema = yup.object().shape({
  profile: yup.object().shape({
    fullName: yup.string().required('Họ tên không được để trống'),
    phone: Schema.phone.nullable(),
    facebook: Schema.facebook,
    dob: Schema.dob.nullable(),
  }),
});

export const EditPasswordSchema = yup.object().shape({
  currentPassword: yup.string().required('Vui lòng nhập mật khẩu cũ'),
  password: Schema.password,
  repassword: yup
    .string()
    .required('Vui lòng nhập lại mật khẩu')
    .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
});
