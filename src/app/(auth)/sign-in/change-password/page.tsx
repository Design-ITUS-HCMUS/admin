'use client';

// React
import Link from 'next/link';

// Libs
import { PasswordFieldWithLabel as PassField } from '@/libs/ui/components';

// Material UI Components
import Button from '@mui/material/Button';

// Internal
import { CardPage, Row, StyledForm } from '@/app/(auth)/_components';

function ChangePasswordPage() {
  return (
    <CardPage header='Thay đổi mật khẩu'>
      <StyledForm>
        <PassField
          label='Mật khẩu mới'
          inputProps={{
            placeholder: 'Nhập mật khẩu mới',
          }}
        />
        <PassField
          label='Nhập lại mật khẩu mới'
          inputProps={{
            placeholder: 'Nhập lại mật khẩu mới',
          }}
        />
      </StyledForm>
      <Row>
        <Link href='/sign-in/change-password/success'>
          <Button variant='contained' size='large' sx={{ width: '100%' }}>
            Thay đổi
          </Button>
        </Link>
      </Row>
    </CardPage>
  );
}

export default ChangePasswordPage;
