import { ApiRoutes } from "@/constants";
import { Nullable } from "@/types";
import { toUrl } from "@/utils";
import { Api, User, useFetch, useInvalidate, usePost } from ".";

export interface AuthSignin {
  email: User["email"];
}

export const useSignin = () => {
  const invalidate = useInvalidate(toUrl(ApiRoutes.Me));
  return usePost<unknown, AuthSignin, string>(
    toUrl(ApiRoutes.Signin),
    undefined,
    {
      onSuccess: ({ data }) => {
        Api.addToken(data);
        invalidate();
      },
      meta: { successMessage: "Signin successfully" },
    }
  );
};

export const useSignout = () => {
  const invalidate = useInvalidate(toUrl(ApiRoutes.Me));
  return () => {
    Api.removeToken();
    invalidate();
  };
};

export const useGetMe = () => {
  return useFetch<Nullable<User>>(toUrl(ApiRoutes.Me), undefined, {
    staleTime: Infinity,
    cacheTime: Infinity,
    meta: {
      ignoreError: true,
    },
  });
};
