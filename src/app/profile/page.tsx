'use client';
import React from 'react';
import { Field, Formik, Form } from 'formik';
import dayjs from 'dayjs';
import { useScrollSpy } from '@/hooks';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from '@mui/material/Autocomplete';

import { SideBarItem, PasswordInput, InputLayout } from '@/libs/ui';
import { Section, WhiteCard, TableHeadCellStyled, TableRowStyled } from './_components';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import cities from './cities.json';
import schools from './schools.json';
import transactions from './transactions.json';

const SideBarItems = [
  {
    id: 'basicInfo',
    label: 'Thông tin cơ bản',
  },
  {
    id: 'transactionHistory',
    label: 'Lịch sử thanh toán',
  },
  {
    id: 'changePassword',
    label: 'Đổi mật khẩu',
  },
  {
    id: 'logout',
    label: 'Đăng xuất',
  },
];

interface IBasicInfo {
  fullname: string;
  dob: dayjs.Dayjs;
  email: string;
  phone: string;
}

interface ISchoolInfo {
  school: string;
  studentId: string;
}

interface IFormData extends IBasicInfo, ISchoolInfo {}

export default function ProfilePage() {
  const activeSection = useScrollSpy(SideBarItems[0].id);

  return (
    <Grid container columnSpacing={4} mt={12} px={7.5}>
      <Grid item xs={3}>
        <Stack
          spacing={2}
          useFlexGap
          bgcolor={'white'}
          borderRadius={'0.75rem'}
          py={2}
          position={'sticky'}
          top={'6rem'}>
          {SideBarItems.map(
            (item, i, arr) =>
              i < arr.length - 1 && (
                <SideBarItem key={item.id} label={item.label} active={activeSection == item.id} href={'#' + item.id} />
              )
          )}
          <Divider />
          <SideBarItem label={SideBarItems[3].label} href={'#'} labelProps={{ color: 'error.main' }} />
        </Stack>
      </Grid>
      <Grid item xs>
        <Formik
          initialValues={
            {
              fullname: 'Lê Vũ Ngân Trúc',
              dob: dayjs('21/04/2003', 'DD/MM/YYYY'),
              email: 'ngantruc2003@gmail.com',
              phone: '0901234567',
              school: 'TRƯỜNG ĐẠI HỌC KHOA HỌC TỰ NHIÊN - ĐẠI HỌC QUỐC GIA TP. HỒ CHÍ MINH',
              studentId: '23127113',
            } as IFormData
          }
          onSubmit={() => {}}>
          {({ initialValues }) => (
            <Form id='basic-info'>
              <WhiteCard>
                <Section title={SideBarItems[0].label} id={SideBarItems[0].id}>
                  <BasicInfoSection initialValues={initialValues} />
                </Section>
                <Section title='Trường học'>
                  <SchoolInfoSection initialValues={initialValues} />
                </Section>
                <Button type='submit' sx={{ width: 'fit-content' }}>
                  Lưu
                </Button>
              </WhiteCard>
            </Form>
          )}
        </Formik>
        <WhiteCard>
          <Section title={SideBarItems[1].label} id={SideBarItems[1].id}>
            <TransactionTable />
          </Section>
        </WhiteCard>
        <WhiteCard>
          <Section title={SideBarItems[2].label} id={SideBarItems[2].id}>
            <EditPasswordSection />
          </Section>
        </WhiteCard>
      </Grid>
    </Grid>
  );
}

function BasicInfoSection({ initialValues }: { initialValues: IBasicInfo }) {
  return (
    <Grid container columnSpacing={2} rowSpacing={1}>
      <Grid item xs={6}>
        <InputLayout
          label='Họ và tên'
          inputProps={{
            value: initialValues.fullname,
            name: 'fullname',
          }}></InputLayout>
      </Grid>
      <Grid item xs={6}></Grid>
      <Grid item xs={6}>
        <Stack spacing={1} useFlexGap>
          <InputLabel sx={{ width: '100%' }}>
            <Typography variant='subtitle2'>Ngày sinh</Typography>
          </InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker name='dob' value={initialValues.dob} views={['year', 'month', 'day']} format='DD/MM/YYYY' />
          </LocalizationProvider>
        </Stack>
      </Grid>
      <Grid item xs={6}></Grid>
      <Grid item xs={6}>
        <InputLayout
          label='Email'
          inputProps={{
            value: initialValues.email,
            name: 'email',
          }}></InputLayout>
      </Grid>
      <Grid item xs={6}>
        <InputLayout
          label='Số điện thoại'
          inputProps={{
            value: initialValues.phone,
            name: 'phone',
          }}></InputLayout>
      </Grid>
    </Grid>
  );
}

function SchoolInfoSection({ initialValues }: { initialValues: ISchoolInfo }) {
  const [schoolOptions, setSchoolOptions] = React.useState([{ label: 'Chọn thành phố' }]);

  function handleCityChange(event: React.SyntheticEvent, value: { label: string } | null, reason: string): void {
    if (reason === 'selectOption') {
      const selectedCity = value?.label;
      const selectedSchools = schools.filter((school) => school.city === selectedCity);
      setSchoolOptions(selectedSchools);
    }
  }

  return (
    <Grid container columnSpacing={2} rowSpacing={1}>
      <Grid item xs={6}>
        <Autocomplete
          options={cities}
          onChange={handleCityChange}
          renderInput={(params) => (
            <InputLayout
              label='Tỉnh/Thành phố'
              ref={params.InputProps.ref}
              inputProps={{
                placeholder: 'TP.Hồ Chí Minh',
                required: true,
                inputProps: params.inputProps,
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Autocomplete
          key={schoolOptions.length}
          options={schoolOptions}
          freeSolo
          value={initialValues.school}
          renderInput={(params) => (
            <InputLayout
              label='Trường'
              ref={params.InputProps.ref}
              inputProps={{
                name: 'school',
                required: true,
                inputProps: params.inputProps,
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <InputLayout
          label='Mã số sinh viên'
          inputProps={{
            name: 'studentId',
            value: initialValues.studentId,
            required: true,
          }}
        />
      </Grid>
      <Grid item xs={6}></Grid>
    </Grid>
  );
}

function TransactionTable() {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRowStyled>
            <TableHeadCellStyled>Mã hoá đơn</TableHeadCellStyled>
            <TableHeadCellStyled>Thời gian</TableHeadCellStyled>
            <TableHeadCellStyled>Thông tin</TableHeadCellStyled>
            <TableHeadCellStyled align='right'>Giá trị</TableHeadCellStyled>
          </TableRowStyled>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRowStyled key={transaction.id}>
              <TableCell id={transaction.id}>
                <Typography component={'a'} href={'#' + transaction.id} color='primary.main'>
                  {transaction.id}
                </Typography>
              </TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell align='right'>{transaction.amount}</TableCell>
            </TableRowStyled>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function EditPasswordSection() {
  function handleSubmit() {}

  return (
    <Formik
      initialValues={{
        currentPassword: '',
        password: '',
        repassword: '',
      }}
      onSubmit={handleSubmit}>
      {({ touched, errors }) => (
        <Form id='change-password'>
          <Grid container columnSpacing={2} rowSpacing={1}>
            <Grid item xs={6}>
              <InputLayout
                label='Mật khẩu cũ'
                helperText={touched.currentPassword ? errors.currentPassword : undefined}>
                <Field
                  as={PasswordInput}
                  name='currentPassword'
                  inputProps={{
                    Autocomplete: 'current-password',
                    placeholder: 'Nhập mật khẩu',
                  }}
                  error={Boolean(touched.currentPassword && errors.currentPassword)}
                />
              </InputLayout>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <InputLayout label='Mật khẩu mới' helperText={touched.password ? errors.password : undefined}>
                <Field
                  as={PasswordInput}
                  name='password'
                  inputProps={{
                    Autocomplete: 'new-password',
                    placeholder: 'Nhập mật khẩu mới',
                  }}
                  error={Boolean(touched.password && errors.password)}
                />
              </InputLayout>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <InputLayout
                label='Nhập lại mật khẩu mới'
                helperText={touched.repassword ? errors.repassword : undefined}>
                <Field
                  as={PasswordInput}
                  name='repassword'
                  inputProps={{
                    Autocomplete: 'new-password',
                    placeholder: 'Nhập lại mật khẩu mới',
                  }}
                  error={Boolean(touched.repassword && errors.repassword)}
                />
              </InputLayout>
            </Grid>
            <Grid item xs={6}></Grid>
          </Grid>
          <Button type='submit' sx={{ width: 'fit-content', mt: 3 }}>
            Lưu
          </Button>
        </Form>
      )}
    </Formik>
  );
}
