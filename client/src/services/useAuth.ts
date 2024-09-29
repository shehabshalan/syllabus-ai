import { API_ENDPOINTS } from "@/utils/endpoints";
import request from "@/utils/request";
import { useMutation } from "@tanstack/react-query";

const auth = async (input: string): Promise<User> => {
  const { data } = await request.post(API_ENDPOINTS.AUTH, {
    token: input,
  });
  return data;
};

export const useAuth = () => {
  return useMutation({
    mutationFn: auth,
  });
};
