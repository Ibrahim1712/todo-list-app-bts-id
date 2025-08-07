import HttpClient from "@/services/httpClient";
import { useQuery } from "@tanstack/react-query";

interface Balance {
  balance: number;
}

const httpClient = new HttpClient<Balance>("/balance");

export const useGetBalance = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["balance"],
    queryFn: () => httpClient.getAll().then((response) => response.data),
  });

  const balance = data?.balance ?? 0;

  return { balance, isLoading, error };
};
