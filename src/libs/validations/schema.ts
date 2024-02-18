import * as yup from 'yup';

export class Schema {
  static email = yup.string().required('Email không được bỏ trống').email('Email không hợp lệ');

  static password = yup
    .string()
    .required('Mật khẩu không được bỏ trống')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)\S{8,}$/, 'Ít nhất 8 ký tự, bao gồm cả chữ và số. Không chứa khoảng trắng.');

  static facebook = yup
    .string()
    .notRequired()
    .matches(
      new RegExp(
        /^(https?:\/\/)?((w{3}\.)?)facebook.com\/.*/i.source + '|' + /^(https?:\/\/)?((w{3}\.)?)fb.com\/.*/i.source
      ),
      'Đường dẫn Facebook không hợp lệ'
    );

  static phone = yup
    .string()
    .notRequired()
    .matches(/^((\(\+?84\))?0?[3|5|7|8|9][0-9]{8}|0[3|5|7|8|9][0-9]{8})$/, 'Số điện thoại không hợp lệ');

  static dob = yup
    .date()
    .typeError('Định dạng ngày không đúng')
    .notRequired()
    .max(new Date(), 'Ngày sinh không hợp lệ')
    .notRequired()
    .max(new Date(), 'Ngày sinh không hợp lệ');
}
