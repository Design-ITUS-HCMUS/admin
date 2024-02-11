import * as yup from 'yup';

export class Schema {
  static email = yup.string().required('Email không được bỏ trống').email('Email không hợp lệ');

  static password = yup
    .string()
    .required('Mật khẩu không được bỏ trống')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]\S{8,}$/,
      'It nhất 8 ký tự, bao gồm cả chữ và số. Không chứa khoảng trắng.'
    );

  static facebook = yup
    .string()
    .matches(
      new RegExp(
        /^(https?:\/\/)?((w{3}\.)?)facebook.com\/.*/i.source + '|' + /^(https?:\/\/)?((w{3}\.)?)fb.com\/.*/i.source
      ),
      'Đường dẫn Facebook không hợp lệ'
    );

  static phone = yup.string().matches(/^(\(\+?\d{1,2}\)\d{9,10}|\d{10}|\d{11})$/, 'Số điện thoại không hợp lệ');
}
