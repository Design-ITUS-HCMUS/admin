import React from 'react';
import { styled } from '@mui/material/styles';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';

const SideBarHeader = styled('div')(({ theme }) => ({
  padding: theme.spacing(3, 2),
  borderBottom: `2px solid ${theme.palette.divider}`,
}));

const StyledSideBar = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100%',
  width: '240px',
  background: theme.palette.background.paper,
}));

interface SideBarItemProps {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface ISideBarItem {
  key: string;
  label: string;
  icon: React.ReactNode;
}

const Container = styled('div', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ theme, active }) => ({
  padding: '0 1rem',
  borderLeft: `3px solid ${active ? theme.palette.primary.main : 'transparent'}`,
}));

function SideBarItem({ icon, label, active = false, onClick }: SideBarItemProps) {
  const color = active ? 'primary.main' : 'primary.darker';

  return (
    <Container active={active}>
      <MenuItem selected={active} sx={{ padding: 1, borderRadius: '4px' }} onClick={onClick}>
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

interface SideBarProps {
  header: React.ReactNode;
  active: string;
  SideBarItems: ISideBarItem[];
  onClickMenuItem: (key: string) => void;
}
export function SideBar({ header, active, SideBarItems, onClickMenuItem }: SideBarProps) {
  return (
    <StyledSideBar>
      <SideBarHeader>{header}</SideBarHeader>
      <Stack sx={{ padding: '1.5rem 0' }} gap='0.75rem'>
        {SideBarItems.map((item) => (
          <SideBarItem
            key={item.key}
            label={item.label}
            active={item.key === active}
            icon={item.icon}
            onClick={() => onClickMenuItem(item.key)}
          />
        ))}
      </Stack>
    </StyledSideBar>
  );
}
