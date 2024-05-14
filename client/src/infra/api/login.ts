import { httpClient } from "../httpClient";

export const login = async (email: string, password: string) => {
  const { token } = (await httpClient.request("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })) as { token: string };

  return token;
};
