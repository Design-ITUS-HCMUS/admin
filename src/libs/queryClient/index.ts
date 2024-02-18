export const queryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 5, // 5 minutes, right now set 5 seconds for debuging
      cacheTime: 1000 * 10, // 5 minutes, right now set 10 seconds for debuging
    },
    mutations: {
      onError: (error: Error) => {
        /** You can use toast or notification here */
        console.error(error.message);
      },
    },
  },
};
