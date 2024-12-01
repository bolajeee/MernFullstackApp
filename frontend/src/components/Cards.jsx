import React from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useProductStore } from "../store/product";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const Cards = () => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("gray.200", "gray.600");

  const { fetchProducts, products, deleteProduct, updateProduct } =
    useProductStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts();
      setLoading(false);
    };
    fetchData();
  }, [fetchProducts]);

  const toast = useToast();

  const handleDelete = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Product deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedProduct, setUpdatedProduct] = useState({});

  const handleUpdateProduct = async (pid, data) => {
  
    const updatedData = {
        "name": data.name,
        "price": data.price,
        "image": data.image        
}

    const {success, message} = await updateProduct(pid, updatedData)
    onClose()
    if (!success) { 
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true
      })
    
    } else {
        toast({
          title: "uccess",
          description: "Product updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
    }
  };

  return (
    <Container
      maxW={{ lg: "container.lg", md: "container.sm", sm: "container.sm" }}
    >
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        products && (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing={10}
            width={"full"}
          >
            {products.map((product) => {
              return (
                <Box
                  className="productCard"
                  key={product._id}
                  shadow={"lg"}
                  rounded={"lg"}
                  overflow={"hidden"}
                  transition={"all .3s"}
                  _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
                  bg={bg}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    h={48}
                    w={"full"}
                    objectFit={"cover"}
                  />
                  <Box p={4}>
                    <Heading as={"h3"} size={"md"} mb={2}>
                      {product.name}
                    </Heading>
                    <Text
                      fontWeight={"bold"}
                      fontSize={"xl"}
                      color={textColor}
                      mb={4}
                    >
                      ${product.price}
                    </Text>
                    <HStack spacing={2}>
                      <IconButton
                        icon={<EditIcon />}
                        colorScheme={"blue"}
                        onClick={() => {
                           setUpdatedProduct(product);
                          onOpen();
                        }}
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        onClick={() => {
                          handleDelete(product._id);
                        }}
                        colorScheme={"red"}
                      />
                    </HStack>
                  </Box>

                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Update Product</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <VStack spacing={4}>
                          <Input
                            placeholder="Product Name"
                            name="name"
                            value={updatedProduct.name}
                            onChange={(e) => {
                              setUpdatedProduct({
                                ...updatedProduct,
                                name: e.target.value,
                              });
                            }}
                          />
                          <Input
                            placeholder="Product Price"
                            name="price"
                            value={updatedProduct.price}
                            onChange={(e) => {
                              setUpdatedProduct({
                                ...updatedProduct,
                                price: e.target.value,
                              });
                            }}
                          />
                          <Input
                            placeholder="Product Image URL"
                            name="image"
                            value={updatedProduct.image}
                            onChange={(e) => {
                              setUpdatedProduct({
                                ...updatedProduct,
                                image: e.target.value,
                              });
                            }}
                          />
                        </VStack>
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          colorScheme="blue"
                          mr={3}
                          onClick={() => {
                            handleUpdateProduct(product._id, updatedProduct);
                          }}
                        >
                          Update
                        </Button>
                        <Button colorScheme="red" onClick={onClose}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Box>
              );
            })}
          </SimpleGrid>
        )
      )}
    </Container>
  );
};

export default Cards;
