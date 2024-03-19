import * as yup from 'yup';

export const EventSchema = yup.object().shape({
  key: yup.string().required('Key không được để trống').matches(/^\S*$/, 'Key không thể chứa khoảng trắng'),
  description: yup.string().required('Mô tả không được để trống'),
});
