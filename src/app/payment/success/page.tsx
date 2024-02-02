'use client';

import Image from 'next/legacy/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { styled, Typography } from '@mui/material';

import { MyButton } from '@/libs/ui';
import color from '@/libs/ui/color';
import Loading from '@/app/loading';
import transactionCompleted from '@/assets/transactionCompleted.gif';

const Paper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  padding: '20px',
  marginTop: '50px',
  maxWidth: '500px',
  margin: 'auto',
});

const SuccessText = styled(Typography)({
  color: color.notification.success,
});

const Button = styled(MyButton)({
  backgroundColor: color.notification.success,
  '&:hover': {
    backgroundColor: 'darkgreen',
  },
});

const translateStatus = (status: any) => {
  status = status.toLowerCase();
  const statusTranslations: { [key: string]: string } = {
    paid: 'đã thanh toán',
    pending: 'đang chờ thanh toán',
    processing: 'đang xử lý',
    cancelled: 'đã hủy',
  };

  return statusTranslations[status] || '';
};

export default function PaymentSuccess() {
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Đang xử lý giao dịch...');
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const searchParams = useSearchParams();

  const orderCode = searchParams.get('orderCode');
  const status = searchParams.get('status');

  return (
    <>
      {loading ? (
        <Loading loadingMessage={loadingMessage} />
      ) : (
        <Paper>
          <Image
            src={transactionCompleted}
            alt='Giao dịch thành công'
            priority
            width={300}
            height={300}
            objectFit='contain'
          />{' '}
          <SuccessText variant='h4' gutterBottom>
            Đơn hàng {typeof status === 'string' ? `${translateStatus(status)}` : ''}!
          </SuccessText>
          <Typography variant='h6'>Mã đơn hàng: {orderCode}</Typography>
          <Button variant='contained' onClick={() => router.push('/payment')}>
            Trở lại trang thanh toán
          </Button>
        </Paper>
      )}
    </>
  );
}
