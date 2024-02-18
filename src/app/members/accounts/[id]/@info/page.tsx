import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { useUsers } from '@/libs/queryClient/users';
import InfoSection from './_components';

export default async function InfoPage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  const { getUserByID } = useUsers();
  await queryClient.prefetchQuery({
    queryKey: ['users', params.id],
    queryFn: () => getUserByID(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <InfoSection id={params.id} />
    </HydrationBoundary>
  );
}
