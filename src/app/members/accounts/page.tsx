import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import Typography from '@mui/material/Typography';

import { useUsers } from '@/libs/query';
import { AccountsTable } from './_components';

export default async function AccountsPage() {
  const { getMembers } = useUsers();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['users', 'members'],
    queryFn: getMembers,
  });

  return (
    <>
      <Typography variant='h6' fontWeight='600'>
        Quản lý tài khoản
      </Typography>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AccountsTable />
      </HydrationBoundary>
    </>
  );
}
