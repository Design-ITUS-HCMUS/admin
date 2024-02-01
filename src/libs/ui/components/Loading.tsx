import { Dialog, DialogContent, CircularProgress, Typography } from '@mui/material';
import color from '@/libs/ui/color';

interface LoadingProps {
  loadingMessage: string;
}

const styles = {
  dialogContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingMessage: {
    marginLeft: '20px',
    color: color.blue[600],
  },
};

export default function Loading({ loadingMessage }: LoadingProps): JSX.Element {
  return (
    <Dialog open={true} maxWidth='xs'>
      <DialogContent sx={styles.dialogContent}>
        <CircularProgress />
        <Typography sx={styles.loadingMessage}>{loadingMessage}</Typography>
      </DialogContent>
    </Dialog>
  );
}
