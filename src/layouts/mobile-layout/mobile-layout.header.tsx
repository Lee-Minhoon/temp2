import { Logo } from "@/components";
import { PageRoutes, styles } from "@/constants";
import { useAlphaColor, useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import { Flex, Icon, IconButton } from "@chakra-ui/react";
import { useCallback } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

interface MobileLayoutHeaderProps {
  onClick?: () => void;
}

const MobileLayoutHeader = ({ onClick }: MobileLayoutHeaderProps) => {
  const { push: push } = useSafePush();
  const alphaColor = useAlphaColor();

  const handleClickHome = useCallback(() => {
    push({ pathname: toUrl(PageRoutes.Home) });
  }, [push]);

  return (
    <Flex
      as={"header"}
      pos={"sticky"}
      align={"center"}
      bgColor={"bg"}
      _before={{
        ...styles.pseudo,
        bg: alphaColor(50),
        zIndex: -1,
      }}
      zIndex={1}
      top={"0"}
      gap={"4"}
      p={"4"}
    >
      <IconButton
        aria-label={"Open Sidebar"}
        variant={"outline"}
        onClick={onClick}
      >
        <Icon as={GiHamburgerMenu} />
      </IconButton>
      <Logo onClick={handleClickHome} />
    </Flex>
  );
};

export default MobileLayoutHeader;
