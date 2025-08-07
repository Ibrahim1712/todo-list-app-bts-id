import HttpClient from "@/services/httpClient";
import { useQuery } from "@tanstack/react-query";

export interface Banner {
  banner_name: string;
  banner_image: string;
  description: string;
}

const httpClient = new HttpClient<Banner[]>("/banner");

const useGetBanners = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["banners"],
    queryFn: () => httpClient.getAll().then((response) => response.data),
  });

  return { data, isLoading, error };
};

export default useGetBanners;
