'use client';
import { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Container,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import Loading from '@/libs/ui/components/Loading';
import { useRouter } from 'next/navigation';
import color from '@/libs/ui/color';

interface FormComponentProps {
  buyerID: string;
  setBuyerID: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: any) => void;
  errorDialogOpen: boolean;
  setErrorDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  loadingMessage: string;
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    mt: 8,
  },
  errButton: {
    backgroundColor: color.notification.error,
  },
  dialog: {
    padding: 0,
  },
};

const FormComponent: React.FC<FormComponentProps> = ({
  buyerID,
  setBuyerID,
  handleSubmit,
  errorDialogOpen,
  setErrorDialogOpen,
  loading,
  loadingMessage,
}) => (
  <Container maxWidth='sm'>
    {loading && <Loading loadingMessage={loadingMessage} />}
    <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
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
    </Box>
    <Dialog
      style={{ ...styles.dialog, padding: '8px' }}
      open={errorDialogOpen}
      onClose={() => setErrorDialogOpen(false)}>
      <DialogTitle>Lỗi</DialogTitle>
      <DialogContent>
        <DialogContentText>Buyer ID chỉ được phép là số</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button style={styles.errButton} onClick={() => setErrorDialogOpen(false)}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  </Container>
);

export default function Payment() {
  const [buyerID, setBuyerID] = useState('');
  const [paymentLink, setPaymentLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (paymentLink) {
      router.push(paymentLink);
    }
  }, [paymentLink]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const parsedBuyerID = Number(buyerID);
    if (isNaN(parsedBuyerID) || parsedBuyerID <= 0) {
      setErrorDialogOpen(true);
      return;
    }
    setLoadingMessage('Đang tạo link thanh toán...');
    setLoading(true);
    const response = await fetch('/api/payment/payos/payment-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ buyerID: parsedBuyerID }),
    });
    const data = await response.json();
    setPaymentLink(data.data.checkoutUrl);
    setLoading(false);
  };

  return (
    <>
      <FormComponent
        {...{ buyerID, setBuyerID, handleSubmit, errorDialogOpen, setErrorDialogOpen, loading, loadingMessage }}
      />
    </>
  );
}
