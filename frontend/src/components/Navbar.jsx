import { Button, Container, Flex, HStack, Spacer, Text, useColorMode, } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BiAddToQueue } from "react-icons/bi";
import {IoMoon} from 'react-icons/io5'
import { LuSun } from 'react-icons/lu'



const Navbar = () => {

  const {colorMode, toggleColorMode} = useColorMode()

  return (
    <Container
      px={4}
      py={2}
      maxW={'1140px'}
     
    >
      <Flex
        
        h={16}
        alignItems="center"
        flexDirection={{
          base: "column",
          sm: "row",
        }}
        justifyContent={"space-between"}
      >
        <Text
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
          fontWeight="bold"
          fontSize={{
            base: "22px",
            sm: "28px",
          }}
          textAlign="center"
          textTransform="uppercase"
        >
          <Link to="/">Product Store 🛒</Link>
        </Text>

        <Spacer />

        <HStack spacing={2} alignItems="center">
          <Link to="/create">
            <Button variant="outline" colorScheme="blue">
              <BiAddToQueue fontSize={20} />
            </Button>
          </Link>

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
