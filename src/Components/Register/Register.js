import React  from "react";
import { useMutation, gql } from "@apollo/client";
import { Box,
         Input,
         InputGroup,
         InputRightElement,
         Heading,
         Button,
         Flex,
         Stack } from "@chakra-ui/core";


const ADD_USER = gql`mutation ($email: String!, $username: String!, $pass: String!) {
  insert_user(objects: {email: $email, username: $username, pass: $pass}) {
    affected_rows
    returning {
      user_id
    }
  }
}`;

const Register = () => {

  const [addUser] = useMutation(ADD_USER);

  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);

  const [user, setUser] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userId, setUserid] = React.useState("");

  const handleUserChange = e => {
    const inputValue = e.target.value;
    setUser(inputValue);
  };

  const handleEmailChange = e => {
    const inputValue = e.target.value;
    setEmail(inputValue);
  };

  const handlePassChange = e => {
    const inputValue = e.target.value;
    setPassword(inputValue);
  };

  const handleUserId = id => {
    const idValue = id;
    setUserid(idValue);
  }

  const handleAddUser = () => {
    if ((Email !== "") && (user !== "") && (password !== "")) {

      addUser({ variables: { email: Email, username: user, pass: password } })
      .then((user_id) => {
        handleUserId(user_id.data.insert_user.returning[0].user_id);
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
            value={Email}
            variant="unstyled"
            placeholder="Email"
            size="lg"
            onChange={handleEmailChange} />
          <Input
            value={user}
            m={2}
            variant="unstyled"
            placeholder="Username"
            size="lg"
            onChange={handleUserChange} />
          <InputGroup m={2} size="lg">
              <Input
                value={password}
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
