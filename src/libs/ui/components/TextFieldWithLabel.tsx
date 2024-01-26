import { Typography, InputLabel, OutlinedInput, OutlinedInputProps } from '@mui/material';

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '.5rem',
};

type Props = {
  label: string;
  containerStyle?: React.CSSProperties;
  inputProps?: OutlinedInputProps;
};

export const TextFieldWithLabel = ({ label, containerStyle, inputProps }: Props) => {
  return (
    <div style={{ ...style, ...containerStyle }}>
      <InputLabel>
        <Typography variant='subtitle2'>{label}</Typography>
      </InputLabel>
      <OutlinedInput {...inputProps} />
    </div>
  );
};
