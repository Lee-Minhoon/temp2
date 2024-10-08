import { usePrimaryColor } from "@/hooks";
import useLayout from "@/hooks/use-layout";
import { ResponsiveLayout } from "@/layouts";
import { Center, Flex, Heading, keyframes } from "@chakra-ui/react";
import { motion } from "framer-motion";

const duration = 4;

const gradationKeyframes = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 200% 50%; }
  100% { background-position: 0% 50%; }
`;

const gradationAnimation = `${gradationKeyframes} ${duration}s ease-in-out infinite`;

const opacityKeyframes = [
  keyframes`
  0% { opacity: 0; }
  33% { opacity: 1; }
  67% { opacity: 1; }
  100% { opacity: 0; }
`,
  keyframes`
  0% { opacity: 1; }
  33% { opacity: 0; }
  67% { opacity: 1; }
  100% { opacity: 1; }
`,
  keyframes`
  0% { opacity: 1; }
  33% { opacity: 1; }
  67% { opacity: 0; }
  100% { opacity: 1; }
`,
];

export default function HomePage() {
  const { primaryColor } = usePrimaryColor();
  const { layout } = useLayout();

  const colors = [
    `${primaryColor}.100`,
    `${primaryColor}.200`,
    `${primaryColor}.300`,
    `${primaryColor}.400`,
    `${primaryColor}.500`,
    `${primaryColor}.600`,
    `${primaryColor}.500`,
    `${primaryColor}.400`,
    `${primaryColor}.300`,
    `${primaryColor}.200`,
    `${primaryColor}.100`,
  ];

  return (
    <ResponsiveLayout>
      <Center minH={"md"} h={"100%"} mb={layout === "horizontal" ? "10%" : 0}>
        <Flex direction={"column"} align={"center"} gap={"8"}>
          {["NextJS", "ChakraUI", "ReactQuery"].map((text, idx) => (
            <Heading
              key={text}
              as={motion.h2}
              pos={"relative"}
              size={"3xl"}
              animation={gradationAnimation}
              bgGradient={`linear(45deg, ${colors.join(", ")})`}
              bgClip={"text"}
              bgSize={"200% 100%"}
              _before={{
                content: `"${text}"`,
                position: "absolute",
                zIndex: 10,
                animation: `${opacityKeyframes[idx]} ${
                  duration * 3
                }s ease-in-out infinite`,
                color: "initial",
              }}
            >
              {text}
            </Heading>
          ))}
        </Flex>
      </Center>
    </ResponsiveLayout>
  );
}
