import { Post } from "@/apis";
import { PageRoutes } from "@/constants";
import { useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import { Avatar, Box, Flex } from "@chakra-ui/react";
import React, { useCallback } from "react";

interface PostWriterProps {
  writer: Post["user"];
}

const PostWriter = ({ writer }: PostWriterProps) => {
  const { push: push } = useSafePush();

  const handleClick = useCallback<React.MouseEventHandler>(
    (e) => {
      e.stopPropagation();
      if (!writer) return;
      push({ pathname: toUrl(PageRoutes.UserDetail, { id: writer.id }) });
    },
    [push, writer]
  );

  return (
    <Flex gap={"4"} align={"center"}>
      <Box cursor={"pointer"} _hover={{ opacity: 0.5 }} onClick={handleClick}>
        <Avatar name={writer?.name} src={writer?.profile} w={"10"} h={"10"} />
      </Box>
      {writer?.name}
    </Flex>
  );
};

export default PostWriter;
