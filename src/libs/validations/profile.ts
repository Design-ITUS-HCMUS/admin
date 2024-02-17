import * as yup from 'yup';

import { Schema } from './schema';

export const EditBasicInfoSchema = yup.object().shape({
  phone: Schema.phone,
  facebook: Schema.facebook,
  dob: Schema.dob,
});

export const EditPasswordSchema = yup.object().shape({
  currentPassword: yup.string().required('Vui lòng nhập mật khẩu cũ'),
  password: Schema.password,
  repassword: yup
    .string()
    .required('Vui lòng nhập lại mật khẩu')
    .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
});
