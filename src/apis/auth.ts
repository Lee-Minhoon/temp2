import { ApiRoutes } from "@/constants";
import { Nullable } from "@/types";
import { toUrl } from "@/utils";
import {
  Api,
  User,
  useFetch,
  useInvalidateQueries,
  usePost,
  useResetQueries,
} from ".";

export interface AuthSignin {
  email: User["email"];
}

export const useSignin = () => {
  const invalidate = useInvalidateQueries(toUrl(ApiRoutes.Me));
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
  const reset = useResetQueries(toUrl(ApiRoutes.Me));
  return () => {
    Api.removeToken();
    reset();
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
