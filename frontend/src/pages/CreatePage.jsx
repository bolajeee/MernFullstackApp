import { Box, Button, Container, Heading, Input, useColorModeValue, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { useProductStore } from "../store/product"

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image:""
  })
  
  const {createProduct} = useProductStore()

  const handleAddProduct = async() => {
    const {success, message} = await createProduct(newProduct)
    console.log("Success:", success)
    console.log("Message", message)
  }

  return (
    <Container maxW={"container.sm"} pt={'20vh'}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"}>
          Create New Product
        </Heading>

        <Box
          h={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder={"Product Name"}
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder={"Price"}
              name="price"
              value={newProduct.price}
              type="number"
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder={"Product image"}
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Button colorScheme="blue" onClick={handleAddProduct} w={"full"}>
                Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default CreatePage