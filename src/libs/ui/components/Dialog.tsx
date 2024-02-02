import React, { FC } from 'react';
import { Dialog as MuiDialog, DialogProps as MuiDialogProps, DialogTitle, DialogContent, styled } from '@mui/material';

type MyDialogProps = MuiDialogProps & {
  title?: string;
  content?: string;
  data?: any;
  style?: React.CSSProperties;
};

export const StyledDialogContent = styled(DialogContent)({});

export const MyDialog: FC<MyDialogProps> = ({ title, content, children, style, ...rest }) => {
  return (
    <MuiDialog style={style} {...rest}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {content && <DialogContent>{content}</DialogContent>}
      {children}
    </MuiDialog>
  );
};
