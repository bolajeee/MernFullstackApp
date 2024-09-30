import { Box, Container, Heading, HStack, IconButton, Image, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react"
import { useEffect } from "react"
import { useProductStore } from "../store/product"
import { transform } from "framer-motion"

const Cards = () => {

    const textColor = useColorModeValue("gray.600", "gray.200")
    const bg = useColorModeValue("gray.600", "gray.200");

    const { fetchProducts, products } = useProductStore()
    
    useEffect(() => {
    fetchProducts();
    }, [fetchProducts])
    console.log("products", products)
    


  return (
      <Container>
          <SimpleGrid
              columns={{
                  base: 1,
                  md: 2,
                  lg:3
              }}
              spacing={10}
              width={'full'}
          >
              
              {products.map((product) => {
                   <Box
                     className="productCard"
                     key={products._id}
                     product={product}
                     shadow={"lg"}
                     rounded={"lg"}
                     overflow={"hidden"}
                     transition={"all .3s"}
                       _hover={{ transform: " translateY{-5px}", shadow: "xl" }}
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
                       <Heading as={"h3"} size={md} mb={2}>
                         ${product.name}
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
                           onClick={onOpen}
                           colorScheme={"blue"}
                         />
                         <IconButton
                           icon={<DeleteIcon />}
                                   onClick={() => {
                               handleDelete(product._id)
                           }}
                           colorScheme={"red"}
                         />
                       </HStack>
                     </Box>
                   </Box>;
              })}
             
          </SimpleGrid>
    </Container>
  )
}

export default Cards