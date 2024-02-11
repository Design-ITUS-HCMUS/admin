import React from 'react';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

export interface ISideBarItem {
  key: string;
  label: React.ReactNode;
  icon: React.ReactNode;
}

interface SideBarItemProps {
  icon?: React.ReactNode;
  label: React.ReactNode;
  active?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const Container = styled('div', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ theme, active }) => ({
  padding: '0 1rem',
  borderLeft: `3px solid ${active ? theme.palette.primary.main : 'transparent'}`,
}));

export function SideBarItem({ icon, label, active = false, onClick }: SideBarItemProps) {
  const color = active ? 'primary.main' : 'primary.darker';

  return (
    <Container active={active}>
      <MenuItem
        key={`${active ? '1' : '0'}`}
        selected={active}
        sx={{ padding: 1, borderRadius: '4px' }}
        onClick={onClick}>
        <ListItemIcon
          sx={{
            '&.MuiListItemIcon-root': {
              color,
            },
          }}>
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={label}
          primaryTypographyProps={{
            variant: 'subtitle2',
            fontWeight: 600,
            color,
          }}
        />
      </MenuItem>
    </Container>
  );
}
