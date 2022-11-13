import useSwr from "swr";
import { fetcher } from "./fetcher";
import { PERMISSIONS_URL } from "./urls";

export const usePermissions = () => {
  const { data, error } = useSwr(PERMISSIONS_URL, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data: data ?? [],
    isLoading: !error && !data,
    error: error,
  };
};
