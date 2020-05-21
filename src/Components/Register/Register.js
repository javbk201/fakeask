import React, {useState}  from "react";
import { useMutation, gql } from "@apollo/client";
import { Box,
         Input,
         InputGroup,
         InputRightElement,
         Heading,
         Button,
         Flex,
         Stack,
         useToast } from "@chakra-ui/core";


const ADD_USER = gql`mutation ($email: String!, $username: String!, $pass: String!) {
                      insert_user(objects: {email: $email, username: $username, pass: $pass}) {
                                    affected_rows
                                }
                        }`;

const Register = () => {

  const [addUser] = useMutation(ADD_USER);

  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);

  let [user, setUser] = React.useState("");
  let [Email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");

  let handleUserChange = e => {
    let inputValue = e.target.value;
    setUser(inputValue);
  };

  let handleEmailChange = e => {
    let inputValue = e.target.value;
    setEmail(inputValue);
  };

  let handlePassChange = e => {
    let inputValue = e.target.value;
    setPassword(inputValue);
  };

  let handleAddUser = () => {
    if ((Email != "") && (user != "") && (password != "")) {

      addUser({ variables: { email: Email, username: user, pass: password } })
      .then(() => {
        setUser("");
        setEmail("");
        setPassword("");
      })
      .catch((e) => {
          console.log(e);
      });
    } else if (Email === "") {
      alert("Ingrese algo en el Email");
    } else if (user === "") {
      alert("Ingrese algo en el user");
    }else if (password === "") {
      alert("Ingrese algo en el password");
    }
  }

  return (
    <Flex align="center" justify="center">
      <Stack
        m={4}
        p={5}
        shadow="md"
        >
        <Heading fontSize="xl">Register</Heading>
        <Box p={1}>
          <Input
            m={2}
            variant="unstyled"
            placeholder="Email"
            size="lg"
            onChange={handleEmailChange} />
          <Input
            m={2}
            variant="unstyled"
            placeholder="Username"
            size="lg"
            onChange={handleUserChange} />
          <InputGroup m={2} size="lg">
              <Input
                variant="unstyled"
                type={show ? "text" : "password"}
                placeholder="Password"
                onChange={handlePassChange}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
          </InputGroup>
          <Button
            variantColor="teal"
            variant="solid"
            onClick={handleAddUser}
            _hover={{ bg: "blue.500", color: " white" }}
            >
            Register
          </Button>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Register;
