import { httpClient } from "../httpClient";

export const isLoggedIn = async (token: string): Promise<boolean> => {
  const data = await httpClient.request("/isLoggedIn", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data as boolean;
};
