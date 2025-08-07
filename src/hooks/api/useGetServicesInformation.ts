import HttpClient from "@/services/httpClient";
import { useQuery } from "@tanstack/react-query";

export interface Service {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

const httpClient = new HttpClient<Service[]>("/services");

const useGetServicesInformation = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: () => httpClient.getAll().then((response) => response.data),
  });

  return {
    services: data,
    isLoading,
    error,
  };
};

export default useGetServicesInformation;
