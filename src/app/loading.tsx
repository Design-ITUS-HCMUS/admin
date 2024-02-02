'use client';

import { CircularProgress, Typography, styled } from '@mui/material';
import color from '@/libs/ui/color';
import { MyDialog, StyledDialogContent as MyStyledDialogContent } from '@/libs/ui/components/Dialog';

type LoadingProps = {
  loadingMessage: string;
};

const StyledDialogContent = styled(MyStyledDialogContent)({
  ...MyStyledDialogContent.defaultProps,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledLoadingMessage = styled(Typography)({
  marginLeft: '20px',
  color: color.blue[600],
});

export default function Loading({ loadingMessage }: LoadingProps) {
  return (
    <MyDialog open={true} maxWidth='xs'>
      <StyledDialogContent>
        <CircularProgress />
        <StyledLoadingMessage>{loadingMessage}</StyledLoadingMessage>
      </StyledDialogContent>
    </MyDialog>
  );
}
