import React from "react";
import { Textarea, Box, Button } from "@chakra-ui/core";
import { useMutation, gql } from "@apollo/client";

const ADD_QUESTION = gql`
                  mutation ($content:String!) {
                  insert_question(objects: {user_id: "b8a1df15-2f63-4b0b-a5db-aeadbb99dee6", content: $content}) {
                    affected_rows
                  }
                }
              `;

const Ask = () => {

  let [value, setValue] = React.useState("");

  const [addQuestion] = useMutation(ADD_QUESTION);

  let handleInputChange = e => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  let handleAddQuestion = () => {
    if (value !== "") {
      addQuestion({ variables: { content: value } })
      .catch((e) => {
        console.log(e.message);
      });
      setValue("");
    }
  }

  return (
      <Box
        w={1/2}
        p="10px"
        boxShadow="0 7px 14px 0 rgba(60,66,87, 0.1), 0 3px 6px 0 rgba(0, 0, 0, .07)"
        >
        <Box m={5} display="block">
          <Textarea
            variant="unstyled"
            value={value}
            size={["700", "166"]}
            onChange={handleInputChange}
            placeholder="Ask me a question" />
        </Box>
        <Box textAlign="right">
          <Button
            rightIcon="email"
            variantColor="teal"
            variant="solid"
            onClick={handleAddQuestion}
            _hover={{ bg: "blue.500", color: " white" }}
            >
            Send
          </Button>
        </Box>
      </Box>
  );
}

export default Ask;
