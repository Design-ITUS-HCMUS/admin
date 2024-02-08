import { Typography } from '@mui/material';

export default function EventDetails({ params }: { params: { key: string } }) {
  return (
    <Typography variant='h6' fontWeight='600'>
      Chi tiết sự kiện {params.key}
    </Typography>
  );
}
