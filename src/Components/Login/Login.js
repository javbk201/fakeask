import React from "react";
import { Box,
         Input,
         InputGroup,
         InputRightElement,
         Heading,
         Button,
         Flex,
         ThemeProvider } from "@chakra-ui/core";


const Login = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <ThemeProvider>
      <Flex alignContent="center" justify="center" >
        <Box
          h={200}
          w={300}
          m={10}
          p={5}
          shadow="md">
          <Heading fontSize="xl">Login</Heading>
          <Box p={1}>
            <Input m={2} variant="unstyled" placeholder="User or Email" size="lg" />
            <InputGroup m={2} size="lg">
                <Input
                  variant="unstyled"
                  type={show ? "text" : "password"}
                  placeholder="Password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
            </InputGroup>
            <Button variantColor="teal" variant="solid">Log</Button>
          </Box>
        </Box>
      </Flex>
    </ThemeProvider>

  );
  };

export default Login;
