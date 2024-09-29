import { useQuery } from "@tanstack/react-query";
import request from "@/utils/request";
import { API_ENDPOINTS } from "@/utils/endpoints";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async (): Promise<User> => {
      const { data } = await request.get(API_ENDPOINTS.USER_ME);
      return data;
    },
  });
};
