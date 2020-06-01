import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Box, Text, Image, Spinner } from "@chakra-ui/core";

const USER = gql`query ($userid: uuid!)
  {
    user(where: {user_id: {_eq: $userid}}) {
    email
    username
    }
  }
`;

const Profile = ( {newProfile} ) => {
  const { loading, error, data } = useQuery(USER);

  if (loading) return <Spinner color="teal.500" />;
  if (error) return <p>Error :(</p>;

  return data.user.map(({username, email, user_id}) => (
      <Box key={user_id}>
        <Box m={5} maxW="sm" rounded="lg" overflow="hidden">
          <Image rounded="full" size="100px" src="https://bit.ly/sage-adebayo" alt="Profile"/>
        </Box>
        <Box ml="2">
          <Text fontWeight="bold">
            {username}
          </Text>
          <Text fontSize="sm">{email}</Text>
        </Box>
      </Box>
      ));


};

export default Profile;
