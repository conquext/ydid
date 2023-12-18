import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/react';

export default function RightScreen() {
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      //   backgroundColor="gray.200"
      // justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        mt="4"
        justifyContent="center"
        alignItems="center"
      >
        <h1>Twita</h1>
        <Heading color="teal.400" size="2xl">
          Authenticate to continue
        </Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" />
                  <Input
                    width="100%"
                    padding="4"
                    type="text"
                    variant="outline"
                    placeholder="enter your DID"
                  />
                </InputGroup>
              </FormControl>

              <Button
                borderRadius={4}
                type="submit"
                variant="solid"
                color="white"
                width="full"
                bg="#9d326c"
                cursor="pointer"
                py={4}
              >
                Continue with yDID
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
