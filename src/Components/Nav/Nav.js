import React from "react";
import {  Box,
          Button,
          SimpleGrid,
          PseudoBox,
          Menu,
          MenuButton,
          MenuList,
          MenuItem,
          MenuGroup,
          MenuDivider
        } from "@chakra-ui/core";

const Nav = () => {

  return (
    <SimpleGrid
      p={2}
      h={60}
      columns={3}
      spacing={10}
      borderWidth="1px">
      <Box>
        <Menu>
          <MenuButton as={Button} variantColor="teal" variant="ghost">
            Profile
          </MenuButton>
          <MenuList>
            <MenuGroup title="Profile">
              <MenuItem>My Account</MenuItem>
              <MenuItem>Payments </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Help">
              <MenuItem>Docs</MenuItem>
              <MenuItem>FAQ</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Box>
      <Box>
        <Box textAlign="center">
          <PseudoBox
            as="input"
            placeholder="Username"
            type="email"
            flex="1"
            py={2}
            px={4}
            rounded="md"
            bg="gray.100"
            borderWidth="1px"
            _hover={{ borderColor: "gray.200", bg: "gray.200" }}
            _focus={{
              outline: "none",
              bg: "white",
              boxShadow: "outline",
              borderColor: "gray.300",
            }}
            />
          <PseudoBox
            as="button"
            bg="teal.500"
            py={2}
            px={4}
            ml={3}
            rounded="md"
            fontWeight="semibold"
            color="white"
            _hover={{ bg: "teal.600" }}
            _focus={{ boxShadow: "outline" }}
            >
            Search
          </PseudoBox>
        </Box>
      </Box>
      <Box textAlign={["right"]}>
        <Button variantColor="teal"
          variant="ghost"
          rounded="10px"
          spacing={5}
          >
          Login
        </Button>
        <Button
          variantColor="teal"
          variant="ghost"
          rounded="10px"
          spacing={5}
          >
          Register
        </Button>
      </Box>
    </SimpleGrid>
  );
}

export default Nav;
