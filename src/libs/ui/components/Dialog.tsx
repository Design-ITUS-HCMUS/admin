import React, { FC } from 'react';
import { Dialog as MuiDialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

interface MyDialogProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  content?: React.ReactNode;
  titleStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export const MyDialog: FC<MyDialogProps> = ({
  open,
  onClose,
  title,
  titleStyle,
  content,
  contentStyle,
  actions,
  children,
}) => {
  return (
    <MuiDialog open={open} onClose={onClose}>
      {title && <DialogTitle style={titleStyle}>{title}</DialogTitle>}
      {content && <DialogContent style={contentStyle}>{content}</DialogContent>}
      {actions && <DialogActions>{actions}</DialogActions>}
      {children}
    </MuiDialog>
  );
};
