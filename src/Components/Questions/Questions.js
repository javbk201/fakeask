import React from "react";
import { Heading,
         Box,
         Skeleton,
         Button} from "@chakra-ui/core";

import { useMutation, useSubscription, gql } from "@apollo/client";


const QUESTIONS = gql`subscription MyQuery {
                  question(order_by: {created_at: desc}, where: {User_id: {user_id: {_eq: "b8a1df15-2f63-4b0b-a5db-aeadbb99dee6"}}}) {
                    content
                    id
                    answer
                  }
                }`;

const UPDATE_QUESTION = gql`
                            mutation MyMutation($id: uuid!, $answer: String!) {
                              update_question(where: {id: {_eq: $id}}, _set: {answer: $answer}) {
                                affected_rows
                                }
                              }
                        `;

const DELETE_QUESTION = gql`
                              mutation MyMutation($id: uuid!) {
                                delete_question(where: {id: {_eq: $id}}) {
                                  affected_rows
                                }
                              }
                            `;


const Question = () => {

  const { loading, error, data } = useSubscription(QUESTIONS);

  const [deleteQuestion] = useMutation(DELETE_QUESTION);

  let [value, setValue] = React.useState("");

  let handleInputChange = e => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  // let handledeleteQuestion = () => {
  //   deleteQuestion({ variables: { id:  })
  //   .then(() => setValue(""))
  //   .catch((e) => {
  //     setValue(e.message);
  //   });
  // }

  if (loading) return (
    <Box spacing={5}>

      <Box>
        <Skeleton height="20px" my="10px" />
        <Skeleton height="20px" my="10px" />
        <Skeleton height="20px" my="10px" />;
      </Box>
      <Box>
        <Skeleton height="20px" my="10px" />
        <Skeleton height="20px" my="10px" />
        <Skeleton height="20px" my="10px" />;
      </Box>
      <Box>
        <Skeleton height="20px" my="10px" />
        <Skeleton height="20px" my="10px" />
        <Skeleton height="20px" my="10px" />;
      </Box>

    </Box>);
  if (error) return <p>Error :(</p>;

  return data.question.map(({content, id, answer}) => (

      <Box mt={5}
        ml={3}
        pr={3}
        pb={5}
        boxShadow="0 2px 5px 0 rgba(60,66,87, 0.1),
        0 1px 1px 0 rgba(0, 0, 0, .07)"
        spacing={5}
        w={1/2}
        h={150}
        key={id}
        >
        <Heading as="h3">{content}</Heading>
        <Box p={6} mt={5} textAlign="left">
          <Button
            variantColor="teal"
            variant="ghost"
            >
            Answer
          </Button>
          <Button
            rightIcon="delete"
            variantColor="teal"
            variant="ghost"
            key={id}
            >
            Delete
          </Button>
        </Box>
      </Box>
  ));
}

export default Question;
