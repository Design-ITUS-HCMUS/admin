'use client';
import React from 'react';

import { useMediaQuery, useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import { useScrollSpy } from '@/hooks';
import { SideBarItem } from '@/libs/ui';

function smoothScroll(event: React.MouseEvent<HTMLElement>) {
  // Prevent href from taking effect
  event.preventDefault();

  const yOffset = -6 * 16; // 6rem
  const element = document.getElementById(event.currentTarget.getAttribute('href') || '');
  if (!element) return;
  const y = (element?.getBoundingClientRect().top || 0) + window.scrollY + yOffset;

  window.scrollTo({ top: y, behavior: 'smooth' });
}

export default function SideBar({ sideBarItems }: { sideBarItems: { id: string; label: string }[] }) {
  // Active SidebarItem
  const activeSection = useScrollSpy({ rootMargin: '-96px 0px 0px 0px', threshold: 1 }, sideBarItems[0]?.id);

  // Responsive
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  if (isDesktop) {
    return (
      <Grid item xs={3}>
        <Stack spacing={2} useFlexGap bgcolor='white' borderRadius='0.75rem' py={2} position='sticky' top='6rem'>
          {sideBarItems?.map((item) => (
            <SideBarItem
              key={item.id}
              label={item.label}
              active={activeSection == item.id}
              href={item.id}
              onClick={smoothScroll}
            />
          ))}
          <Divider />
          <SideBarItem label='Đăng xuất' href={'#'} labelProps={{ color: 'error.main' }} />
        </Stack>
      </Grid>
    );
  }
  return null;
}
