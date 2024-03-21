import React from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import Grid from '@mui/material/Grid';

import transactions from '@/libs/mock/transactions.json';
import { useUsers } from '@/libs/query';
import { BasicInfo, EditPassword, Section, SideBar, TransactionTable } from './_components';

const sideBarItems = [
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

export default async function ProfilePage() {
  const userID = '3';
  const { getUserByID } = useUsers();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['users', userID],
    queryFn: () => getUserByID(userID),
  });

  const sections: React.ReactNode[] = [
    <BasicInfo id={userID} key={1} />,
    <TransactionTable transactions={transactions} key={2} />,
    <EditPassword key={3} />,
  ];

  return (
    <Grid container columnSpacing={4} mt={{ xs: 10, md: 12 }} px={{ xs: 2, md: 7.5 }}>
      <SideBar sideBarItems={sideBarItems} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Grid item xs>
          {sections.map((section, index) => (
            <Section key={index} title={sideBarItems[index].label} id={sideBarItems[index].id}>
              {section}
            </Section>
          ))}
        </Grid>
      </HydrationBoundary>
    </Grid>
  );
}
