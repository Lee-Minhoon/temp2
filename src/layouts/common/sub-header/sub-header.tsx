import { PageRoutes, findNavInHierarchy } from "@/constants";
import { useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import { Flex, Icon, Link, Text } from "@chakra-ui/react";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MdHome, MdKeyboardArrowRight } from "react-icons/md";
import { useLocation } from "react-router-dom";

const SubHeader = () => {
  const { push: push } = useSafePush();
  const location = useLocation();
  const { t } = useTranslation();

  const hierarchy = useMemo(
    () => findNavInHierarchy(location.pathname),
    [location.pathname]
  );

  const handleClickHome = useCallback(() => {
    push({ pathname: toUrl(PageRoutes.Home) });
  }, [push]);

  return (
    <>
      {hierarchy.length > 0 && (
        <Flex gap={"2"}>
          <Flex gap={"2"} align={"center"}>
            <Icon as={MdHome} onClick={handleClickHome} cursor={"pointer"} />
            <Icon as={MdKeyboardArrowRight} />
          </Flex>
          {hierarchy.map((nav, idx) => (
            <Flex key={nav.label} gap={"2"} align={"center"}>
              {idx !== hierarchy.length - 1 ? (
                <>
                  <Link
                    // href={{ pathname: nav.pathname, query: nav.query }}
                    fontSize={"sm"}
                  >
                    <Text>{t(nav.label)}</Text>
                  </Link>
                  {idx !== hierarchy.length - 1 && (
                    <Icon as={MdKeyboardArrowRight} />
                  )}
                </>
              ) : (
                <Text color={"primary.500"} fontSize={"sm"} fontWeight={"bold"}>
                  {t(nav.label)}
                </Text>
              )}
            </Flex>
          ))}
        </Flex>
      )}
    </>
  );
};

export default SubHeader;
