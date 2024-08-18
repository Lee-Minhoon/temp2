import { isWhiteList, PageRoutes } from "@/constants";
import { useSafePush } from "@/hooks";
import { useModalStore } from "@/stores";
import { toUrl } from "@/utils";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const Unauthorized = () => {
  const { closeAlert } = useModalStore(["closeAlert"]);
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { push } = useSafePush();

  return (
    <Flex direction={"column"} align={"center"} gap={"4"}>
      <Text>{t("You are not authorized to access this page")}</Text>
      <Flex gap={"4"}>
        <Button
          variant={"outline"}
          onClick={() => {
            push({ pathname: toUrl(PageRoutes.Home) });
            closeAlert();
          }}
        >
          {t("Go Home")}
        </Button>
        <Button
          onClick={() => {
            const redirect = searchParams.get("redirect");
            if (!redirect || !isWhiteList(redirect)) {
              push({ pathname: toUrl(PageRoutes.Home) });
            } else {
              push({ pathname: redirect });
            }
            closeAlert();
          }}
        >
          {t("Go Back")}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Unauthorized;
