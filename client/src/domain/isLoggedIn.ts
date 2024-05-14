import { isLoggedIn as apiIsLoggedIn } from "@/infra/api/isLoggedIn";
import { getToken } from "@/infra/getToken";

type Dependencies = {
  getToken: () => string;
};

export const makeIsLoggedIn =
  ({ getToken }: Dependencies) =>
  () => {
    try {
      const token = getToken();
      return apiIsLoggedIn(token);
    } catch {
      return false;
    }
  };

export const isLoggedIn = makeIsLoggedIn({
  getToken,
});
