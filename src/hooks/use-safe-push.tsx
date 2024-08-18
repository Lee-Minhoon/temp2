import { useGetMe } from "@/apis";
import { Unauthorized } from "@/components";
import { isWhiteList, PageRoutes } from "@/constants";
import { useModalStore } from "@/stores";
import { toUrl } from "@/utils";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  Location,
  NavigateOptions,
  useLocation,
  useNavigate,
} from "react-router-dom";

type Destination = {
  pathname: string;
  search?: React.SetStateAction<Record<string, string>>;
};

const parseDestination = (
  origin: Location,
  destination: Destination
): string => {
  const searchParams =
    typeof destination.search === "function"
      ? destination.search(
          Object.fromEntries(new URLSearchParams(origin.search))
        )
      : destination.search;
  return `${destination.pathname}?${new URLSearchParams(searchParams).toString()}`;
};

const useSafePush = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useGetMe();
  const { openAlert } = useModalStore(["openAlert"]);
  const { t } = useTranslation();

  const push = useCallback(
    (to: Destination, options?: NavigateOptions) => {
      if (!isWhiteList(to.pathname) && !data) {
        navigate({
          pathname: toUrl(PageRoutes.Signin),
          search: `${location.pathname}${location.search}`,
        });
        openAlert({
          title: t("Unauthorized"),
          content: <Unauthorized />,
        });
      } else {
        navigate(parseDestination(location, to), options);
      }
    },
    [data, location, navigate, openAlert, t]
  );

  return { navigate, push };
};

export default useSafePush;
