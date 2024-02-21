'use client';

import Image from 'next/legacy/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { styled, Typography } from '@mui/material';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { colors } from '@/libs/ui';

import Loading from '@/app/payment/loading';
import transactionCompleted from '@/assets/transactionCompleted.gif';

// query string:
// ?code=00&id=2e4acf1083304877bf1a8c108b30cccd&cancel=true&status=CANCELLED&orderCode=803347

const Paper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  padding: '32px',
  maxWidth: '500px',
  margin: '56px auto',
  backgroundColor: colors.neutral.white,
  borderRadius: '10px',
});

type StatusButtonProps = {
  status: 'success' | 'error';
  href: string;
};

const StatusButton = styled(({ href, status, ...otherProps }: StatusButtonProps & { children?: React.ReactNode }) => (
  <Button {...otherProps} component={Link} href={href} />
))<StatusButtonProps>(({ theme, status }) => ({
  backgroundColor: status === 'success' ? theme.palette.success.main : theme.palette.error.main,
  '&:hover': {
    backgroundColor: status === 'success' ? theme.palette.success.dark : theme.palette.error.dark,
  },
}));

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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const searchParams = useSearchParams();
  const orderCode = searchParams.get('orderCode');
  const status = searchParams.get('status');
  const isCancelled = searchParams.get('cancel') === 'true' || status === 'CANCELLED';

  return (
    <>
      {loading ? (
        <Loading loadingMessage={loadingMessage} />
      ) : (
        <Paper>
          {!isCancelled && (
            <Image
              src={transactionCompleted}
              alt='Giao dịch thành công'
              priority
              width={300}
              height={300}
              objectFit='contain'
            />
          )}
          <Typography
            variant='h4'
            gutterBottom
            color={isCancelled ? colors.notification.error : colors.notification.success}>
            Đơn hàng {typeof status === 'string' ? `${translateStatus(status)}` : ''}!
          </Typography>
          {orderCode && <Typography variant='h6'>Mã đơn hàng: {orderCode}</Typography>}
          <StatusButton status={isCancelled ? 'error' : 'success'} href='/payment'>
            Trở lại trang thanh toán
          </StatusButton>
        </Paper>
      )}
    </>
  );
}
