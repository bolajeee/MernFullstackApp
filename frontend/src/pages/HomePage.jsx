import React from 'react';
import { Container, Link, Text, VStack } from '@chakra-ui/react'
import { Cards } from '../components';

const HomePage = () => {
  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        {Cards ? (
          <Text
            fontSize={30}
            fontWeight="bold"
            bgGradient="linear(to-r, cyan.400, blue.500)"
            bgClip="text"
            textAlign="center"
            _hover={{ textDecoration: "underline" }}
            py={12}
          >
            Current Products 
          </Text>
        ) : (
          <Text
            fontSize="xl"
            textAlign="center"
            fontWeight="bold"
            color="gray.500"
          >
            No products found 
            <Text
              as="span"
              color="blue.500"
              _hover={{ textDecoration: "underline" }}
            >
              <Link href="/create">Create a product</Link>
            </Text>
          </Text>
        )}
      </VStack>

      {Cards && <Cards maxW="container.xl" py={12} />}
    </Container>
  );
};

export default HomePage