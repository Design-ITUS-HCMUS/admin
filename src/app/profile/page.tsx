'use client';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useScrollSpy } from '@/hooks';

import { useMediaQuery, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

import transactions from '@/libs/mock/transactions.json';
import { SideBarItem } from '@/libs/ui';
import { Section, WhiteCard, BasicInfo, TransactionTable, EditPassword } from './_components';

const SideBarItems = [
  {
    id: 'basicInfo',
    label: 'Thông tin cơ bản',
  },
  {
    id: 'transactionHistory',
    label: 'Lịch sử thanh toán',
  },
  {
    id: 'changePassword',
    label: 'Đổi mật khẩu',
  },
];

export interface IBasicInfo {
  fullName?: string;
  dob?: dayjs.Dayjs;
  email?: string;
  phone?: string;
  facebook?: string;
  school?: string;
  studentID?: string;
  userID?: number;
}

interface IUserInfo {
  profile: IBasicInfo;
  usernameOrEmail: string;
}

async function fetchUserInfo(): Promise<IUserInfo | undefined> {
  try {
    const response = await fetch('/api/user?id=8');
    const { success, data, message } = await response.json();

    if (!success) {
      throw new Error(message);
    }

    const profile = data.profile;
    if (!profile) {
      return {
        profile: {
          fullName: '',
          dob: undefined,
          email: data.email,
          phone: '',
          facebook: '',
          school: '',
          studentID: '',
          userID: data.id,
        },
        usernameOrEmail: data.email,
      };
    }
    profile.dob = profile.dob ? dayjs(profile.dob) : undefined;
    profile.email = data.email;

    return { profile, usernameOrEmail: data.username };
  } catch (error) {
    console.error('Error fetching user information:', error);
    return undefined;
  }
}

function smoothScroll(event: React.MouseEvent<HTMLElement>) {
  // Prevent href from taking effect
  event.preventDefault();

  const yOffset = -6 * 16; // 6rem
  const element = document.getElementById(event.currentTarget.getAttribute('href') || '');
  if (!element) return;
  const y = (element?.getBoundingClientRect().top || 0) + window.scrollY + yOffset;

  window.scrollTo({ top: y, behavior: 'smooth' });
}

export default function ProfilePage() {
  // Active SidebarItem
  const activeSection = useScrollSpy({ rootMargin: '-96px 0px 0px 0px', threshold: 1 }, SideBarItems[0].id);

  // Refresh handler after updating user information / password
  const [refresh, setRefresh] = useState(false);
  const refreshProfile = () => setRefresh(!refresh);

  // Responsive
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  // Fetch user information
  const [userInfo, setUserInfo] = useState<IUserInfo | undefined>(undefined);
  useEffect(() => {
    fetchUserInfo().then((data) => {
      setUserInfo(data);
    });
  }, [refresh]);

  return (
    <Grid container columnSpacing={4} mt={12} px={{ xs: 3, md: 7.5 }}>
      {isDesktop && (
        <Grid item xs={3}>
          <Stack
            spacing={2}
            useFlexGap
            bgcolor={'white'}
            borderRadius={'0.75rem'}
            py={2}
            position={'sticky'}
            top={'6rem'}>
            {SideBarItems.map((item) => (
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
      )}
      <Grid item xs>
        <WhiteCard>
          <Section title={SideBarItems[0].label} id={SideBarItems[0].id}>
            <BasicInfo initialValues={userInfo?.profile} refreshHandler={refreshProfile} />
          </Section>
        </WhiteCard>
        <WhiteCard>
          <Section title={SideBarItems[1].label} id={SideBarItems[1].id}>
            <TransactionTable transactions={transactions} />
          </Section>
        </WhiteCard>
        <WhiteCard>
          <Section title={SideBarItems[2].label} id={SideBarItems[2].id}>
            <EditPassword usernameOrEmail={userInfo?.usernameOrEmail} />
          </Section>
        </WhiteCard>
      </Grid>
    </Grid>
  );
}
