import { Typography } from '@mui/material';

export default function EventDetails({ params }: { params: { key: string } }) {
  return <Typography variant='h6'>Chi tiết sự kiện {params.key}</Typography>;
}
