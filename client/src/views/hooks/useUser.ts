import { isLoggedIn } from "@/domain/isLoggedIn";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["IsLoggedIn"],
    queryFn: () => isLoggedIn(),
  });

  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.removeItem("token");

    queryClient.invalidateQueries();
  };

  return {
    isLoggedIn: data,
    userIsLoading: isLoading,
    logout,
  };
};
