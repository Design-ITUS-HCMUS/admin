'use client';

import { lazy, useEffect, Suspense, useState, FC, Dispatch, SetStateAction, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Container,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
  TextField,
} from '@mui/material';
import color from '@/libs/ui/color';
import { MyDialog } from '@/libs/ui/components/Dialog';

const Loading = lazy(() => import('@/app/loading'));

const API_ENDPOINT = '/api/payment/payos/payment-requests';
const ERROR_MESSAGE = 'Có lỗi xảy ra khi tạo link thanh toán';

type ErrorDialogProps = {
  open: boolean;
  onClose: () => void;
};

const ErrorDialog: FC<ErrorDialogProps> = ({ open, onClose }) => (
  <StyledDialog open={open} onClose={onClose}>
    <DialogTitle style={{ color: color.notification.error }}>Lỗi</DialogTitle>
    <DialogContent>
      <DialogContentText>Buyer ID chỉ được phép là số</DialogContentText>
    </DialogContent>
    <DialogActions>
      <StyledErrButton onClick={onClose}>OK</StyledErrButton>
    </DialogActions>
  </StyledDialog>
);

type FormComponentProps = {
  buyerID: string;
  setBuyerID: Dispatch<SetStateAction<string>>;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  errorDialogOpen: boolean;
  setErrorDialogOpen: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  loadingMessage: string;
};

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  marginTop: '16px',
});

const StyledErrButton = styled(Button)({
  backgroundColor: color.notification.error,
  '&:hover': {
    backgroundColor: 'darkred',
  },
});

const StyledDialog = styled(MyDialog)({
  '& .MuiDialogContent-root': {
    padding: '8px',
  },
  '& .MuiDialogTitle-root': {
    padding: '8px',
  },
});

async function createPaymentLink(buyerID: number) {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ buyerID }),
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGE);
  }

  const data = await response.json();
  return data.data.checkoutUrl;
}

function FormComponent({
  buyerID,
  setBuyerID,
  handleSubmit,
  errorDialogOpen,
  setErrorDialogOpen,
  loading,
  loadingMessage,
}: FormComponentProps) {
  return (
    <Container maxWidth='sm'>
      {loading && <Loading loadingMessage={loadingMessage} />}
      <StyledForm onSubmit={handleSubmit}>
        <TextField
          label='Buyer ID'
          placeholder='Buyer ID chỉ được phép là số'
          multiline
          variant='standard'
          value={buyerID}
          error={buyerID.length > 0 && (isNaN(Number(buyerID)) || Number(buyerID) <= 0)}
          onChange={(e) => setBuyerID(e.target.value)}
        />
        <Button variant='contained' type='submit'>
          Đến trang thanh toán PayOS
        </Button>
      </StyledForm>
      <ErrorDialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)} />
    </Container>
  );
}

export default function Payment() {
  const [buyerID, setBuyerID] = useState<string>('');
  const [paymentLink, setPaymentLink] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedBuyerID = Number(buyerID);
    if (isNaN(parsedBuyerID) || parsedBuyerID <= 0) {
      setErrorDialogOpen(true);
      return;
    }
    setLoadingMessage('Đang tạo link thanh toán...');
    setLoading(true);
    try {
      const checkoutUrl = await createPaymentLink(parsedBuyerID);
      setPaymentLink(checkoutUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (paymentLink) {
      router.push(paymentLink);
    }
  }, [paymentLink]);

  return (
    <Suspense fallback={<Loading loadingMessage='Đang tải...' />}>
      <FormComponent
        buyerID={buyerID}
        setBuyerID={setBuyerID}
        handleSubmit={handleSubmit}
        errorDialogOpen={errorDialogOpen}
        setErrorDialogOpen={setErrorDialogOpen}
        loading={loading}
        loadingMessage={loadingMessage}
      />
    </Suspense>
  );
}
