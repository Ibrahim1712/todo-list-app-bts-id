import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { transactionService } from "@/services/transactionService";

export const useGetTransactionHistory = (initialLimit = 5) => {
  const queryClient = useQueryClient();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["transaction-history"],
    queryFn: ({ pageParam = 0 }) =>
      transactionService.getTransactionHistory({
        offset: pageParam,
        limit: initialLimit,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.records.length < initialLimit) {
        return undefined;
      }
      return allPages.length * initialLimit;
    },
    initialPageParam: 0,
  });

  const transactions = data?.pages.flatMap((page) => page.records) ?? [];

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["transaction-history"] });
    refetch();
  };

  return {
    transactions,
    error,
    isLoading,
    isError,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    loadMore,
    refresh,
  };
};
