'use client';

import { Button, Typography, Paper } from '@mui/material';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import color from '@/libs/ui/color';
import Image from 'next/legacy/image';
import transactionCompleted from '@/assets/transactionCompleted.gif';

const styles = {
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    padding: '20px',
    marginTop: '50px',
    maxWidth: '500px',
    margin: 'auto',
  },
  successText: {
    color: color.notification.success,
  },
};

const translateStatus = (status: any) => {
  status = status.toLowerCase();
  const statusTranslations: { [key: string]: string } = {
    paid: 'đã thanh toán',
    pending: 'đang chờ thanh toán',
    processing: 'đang xử lý',
    canceled: 'đã hủy',
  };

  return statusTranslations[status] || '';
};

export default function PaymentSuccess() {
  const searchParams = useSearchParams();

  const orderCode = searchParams.get('orderCode');
  const status = searchParams.get('status');

  return (
    <Paper sx={styles.paper}>
      <Image src={transactionCompleted} alt='Transaction Completed' width={300} height={300} objectFit='contain' />{' '}
      <Typography variant='h4' gutterBottom style={styles.successText}>
        Giao dịch {typeof status === 'string' ? `${translateStatus(status)}` : ''}!
      </Typography>
      <Typography variant='h6'>Mã đơn hàng: {orderCode}</Typography>
      <Link href='/payment' passHref>
        <Button variant='contained' style={styles.successText} component='a'>
          Trở lại trang thanh toán
        </Button>
      </Link>
    </Paper>
  );
}
