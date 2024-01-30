import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ProgressIcon } from '../icon';
import colors from '../color';

type Progress = 'done' | 'inprogress' | 'todo';
interface ProgressProps {
  variant?: Progress;
  label: string;
  collapsed?: boolean;
}

const ProgressItem = styled('div')({
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '.25rem',
});
export function ProgressTag({ variant = 'done', label, collapsed }: ProgressProps) {
  return (
    <>
      {collapsed ? (
        <ProgressIcon
          sx={{
            color:
              variant == 'done'
                ? colors.notification.success
                : variant == 'inprogress'
                  ? colors.blue[500]
                  : colors.neutral[300],
          }}
        />
      ) : (
        <ProgressItem>
          <ProgressIcon
            sx={{
              color:
                variant == 'done'
                  ? colors.notification.success
                  : variant == 'inprogress'
                    ? colors.blue[500]
                    : colors.neutral[300],
            }}
            fontSize='small'
          />
          <Typography variant='body2'>{label}</Typography>
        </ProgressItem>
      )}
    </>
  );
}
