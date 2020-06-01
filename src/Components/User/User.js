import React from "react";
import Profile from "../Profile/Profile"
import Questions from "../Questions/Questions"
import Ask from "../Ask/Ask"

import { Box } from "@chakra-ui/core";



const User = () => {

  return(
    <Box>
      <Profile />
      <Ask />
      <Questions />
    </Box>
  );
}

export default User;
