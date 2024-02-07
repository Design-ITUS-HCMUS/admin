import { Stack, Typography, InputLabel, OutlinedInput, OutlinedInputProps } from '@mui/material';

type Props = {
  label: string;
  containerStyle?: React.CSSProperties;
  inputProps?: OutlinedInputProps;
};

export const TextFieldWithLabel = ({ label, containerStyle, inputProps }: Props) => {
  return (
    <Stack spacing={1} sx={{ ...containerStyle }}>
      <InputLabel>
        <Typography variant='subtitle2'>{label}</Typography>
      </InputLabel>
      <OutlinedInput {...inputProps} />
    </Stack>
  );
};
