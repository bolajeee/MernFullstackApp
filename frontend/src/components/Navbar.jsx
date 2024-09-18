import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BiAddToQueue } from "react-icons/bi";

const Navbar = () => {
  return (
    <Container maxw={"full"} px={4} py={2}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flex={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          bgGradient="linear(to-r, cyan-400, blue.500)"
          bgClip="text"
          textAlign={"center"}
          fontWeight={"bold"}
          fontSize={{
            base: "22",
            sm: "28",
          }}
          textTransform={"uppercase"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button variant={"outline"} colorScheme={"blue"}>
              <BiAddToQueue fontSize={20} />
            </Button>
          </Link>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
