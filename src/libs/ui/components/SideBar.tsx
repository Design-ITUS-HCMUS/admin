'use client';
import React from 'react';

import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import { ISideBarItem, SideBarItem } from './SideBarItem';

const StyledHeader = styled('div')(({ theme }) => ({
  padding: theme.spacing(3, 2),
  borderBottom: `2px solid ${theme.palette.divider}`,
}));

const StyledSideBar = styled('div')(({ theme }) => ({
  position: 'fixed',
  height: '100%',
  width: '240px',
  background: theme.palette.background.paper,
  borderRight: `2px solid ${theme.palette.divider}`,
}));

interface SideBarProps {
  header?: React.ReactNode;
  active: string;
  SideBarItems: ISideBarItem[];
  onClickMenuItem: (key: string) => void;
}

export function SideBar({ header, active, SideBarItems, onClickMenuItem }: SideBarProps) {
  return (
    <StyledSideBar>
      {Boolean(header) && <StyledHeader>{header}</StyledHeader>}
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
