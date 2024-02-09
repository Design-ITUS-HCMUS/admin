import { ReactNode } from 'react';

import Select, { SelectProps } from '@mui/material/Select';
import Typography from '@mui/material/Typography';

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
};

type Props = {
  label: string;
  children?: ReactNode;
  containerStyle?: React.CSSProperties;
  selectProps?: SelectProps;
};

export const DropdownWithLabel: React.FC<Props> = ({ label, children, containerStyle, selectProps }: Props) => {
  return (
    <div style={{ ...style, ...containerStyle }}>
      <Typography variant='caption'>{label}</Typography>
      <Select {...selectProps}>{children}</Select>
    </div>
  );
};
