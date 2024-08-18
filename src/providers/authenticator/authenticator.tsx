import { useGetMe } from "@/apis";
import { Unauthorized } from "@/components";
import { PageRoutes, isExistPage, isWhiteList } from "@/constants";
import { useSafePush } from "@/hooks";
import { useModalStore } from "@/stores";
import { toUrl } from "@/utils";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

interface AuthenticatorProps {
  children: React.ReactNode;
}

const Authenticator = ({ children }: AuthenticatorProps) => {
  const { push } = useSafePush();
  const location = useLocation();
  const { data: me, isFetching } = useGetMe();
  const { openAlert } = useModalStore(["openAlert", "closeAlert"]);
  const { t } = useTranslation();

  console.log("me?", me);

  useEffect(() => {
    if (
      isWhiteList(location.pathname) ||
      !isExistPage(location.pathname) ||
      isFetching
    )
      return;
    if (!me) {
      push({
        pathname: toUrl(PageRoutes.Signin),
        search: {
          redirect: `${location.pathname}${location.search}`,
        },
      });
      openAlert({
        title: t("Unauthorized"),
        content: <Unauthorized />,
      });
    }
  }, [isFetching, location.pathname, location.search, me, openAlert, push, t]);

  return isWhiteList(location.pathname) || !isExistPage(location.pathname)
    ? children
    : me
      ? children
      : null;
};

export default Authenticator;
