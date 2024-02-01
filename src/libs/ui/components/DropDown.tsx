import { Select, Typography, SelectProps } from '@mui/material';
import { ReactNode } from 'react';
import { styled } from "@mui/material/styles";

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

const StyledSelect = styled(Select)({
  "::before": {
    borderBottom: "none",
  },
  ":hover:not(.Mui-disabled, .Mui-error):before": {
    borderBottom: "none",
  },
});

export function DropdownText(props: SelectProps) {
  return <StyledSelect {...props}>{props.children}</StyledSelect>;
}
