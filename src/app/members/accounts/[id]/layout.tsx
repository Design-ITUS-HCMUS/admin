import Link from 'next/link';

import Breadcumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

export default function Layout({
  children,
  info,
  events,
}: {
  children: React.ReactNode;
  info: React.ReactNode;
  events: React.ReactNode;
}) {
  return (
    <>
      <Breadcumbs sx={{ marginBottom: '-0.5rem' }}>
        <Typography color='inherit' component={Link} href='/members/accounts'>
          Tất cả tài khoản
        </Typography>
        <Typography color='text.primary'>Thông tin chi tiết</Typography>
      </Breadcumbs>
      {children}
      {info}
      {events}
    </>
  );
}
