'use client';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { colors, ProgressIcon } from '@/libs/ui';

const ProgressItem = styled('div')({
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '.25rem',
});

type Progress = 'done' | 'inprogress' | 'todo';

interface ProgressProps {
  /** The variant of the progress tag, controls the related color. */
  variant?: Progress;
  /** The label of the progress tag. */
  label: string;
  /** The collapsed state of the progress tag. */
  collapsed?: boolean;
}

export function ProgressTag({ variant = 'done', label, collapsed = false }: ProgressProps) {
  return (
    <>
      {collapsed ? (
        <ProgressIcon
          sx={{
            color: variant == 'done' ? 'success.light' : variant == 'inprogress' ? 'primary' : colors.neutral[300],
          }}
        />
      ) : (
        <ProgressItem>
          <ProgressIcon
            sx={{
              color: variant == 'done' ? 'success.light' : variant == 'inprogress' ? 'primary' : colors.neutral[300],
            }}
            fontSize='small'
          />
          <Typography variant='body2'>{label}</Typography>
        </ProgressItem>
      )}
    </>
  );
}
