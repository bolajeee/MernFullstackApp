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
  const [selectedProduct, setSelectedProduct] = useState(null); // For tracking the product to be updated

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

  const handleUpdateProduct = async (pid) => {
    const { success, message } = await updateProduct(pid, selectedProduct);
    if (success) {
      toast({
        title: "Success",
        description: "Product updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        products && (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 2,
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
                          setSelectedProduct(product); // Set the product to be updated
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
                            value={selectedProduct?.name || ""}
                            onChange={(e) => {
                              setSelectedProduct({
                                ...selectedProduct,
                                name: e.target.value,
                              });
                            }}
                          />
                          <Input
                            placeholder="Product Price"
                            name="price"
                            value={selectedProduct?.price || ""}
                            onChange={(e) => {
                              setSelectedProduct({
                                ...selectedProduct,
                                price: e.target.value,
                              });
                            }}
                          />
                          <Input
                            placeholder="Product Image URL"
                            name="image"
                            value={selectedProduct?.image || ""}
                            onChange={(e) => {
                              setSelectedProduct({
                                ...selectedProduct,
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
                          onClick={() => handleUpdateProduct(product._id)}
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
