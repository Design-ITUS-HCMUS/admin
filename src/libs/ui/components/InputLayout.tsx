import InputLabel, { InputLabelProps } from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { InputBaseComponentProps } from '@mui/material/InputBase';
import Stack, { StackProps } from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&.Mui-disabled': {
    color: theme.palette.text.primary,
  },
  '&.Mui-error': {
    color: theme.palette.text.primary,
  },
}));

interface InputLayoutProps extends StackProps {
  name?: string;
  label?: string;
  ratio?: number;
  children?: React.ReactNode;
  helperText?: string;
  inputprops?: InputBaseComponentProps;
}

export function InputLayout(props: InputLayoutProps) {
  const { name, label, ratio = 0, children, helperText, inputprops, direction } = props;

  const outlinedInputProps: OutlinedInputProps = { ...inputprops } as OutlinedInputProps;
  const labelProps: InputLabelProps = { ...inputprops } as InputLabelProps;
  const calRatio = Math.max(0, Math.min(1, ratio));
  let labelWidth = 'inherit';
  let fieldsetWidth = 'inherit';
  if (direction === 'row') {
    labelWidth = calRatio ? `${Math.floor(100.0 * calRatio)}%` : 'inherit';
    fieldsetWidth = 1 - calRatio ? `${Math.floor(100.0 * (1 - calRatio))}%` : 'inherit';
  }

  return (
    <Stack spacing={1} alignItems='baseline' sx={{ width: '100%' }} {...props}>
      {label && (
        <StyledInputLabel id={`${name}-label`} htmlFor={name} {...labelProps} sx={{ width: labelWidth }}>
          <Typography variant='subtitle2' component='span'>
            {label}
          </Typography>
        </StyledInputLabel>
      )}
      <Stack sx={{ width: fieldsetWidth }}>
        {children ? children : <OutlinedInput inputProps={{ name: name, ...inputprops }} {...outlinedInputProps} />}
        {helperText && <FormHelperText error={inputprops?.error}>{helperText}</FormHelperText>}
      </Stack>
    </Stack>
  );
}
