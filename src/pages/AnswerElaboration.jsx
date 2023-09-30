// AnswerElaboration.jsx

import React, { useState } from 'react';
import {
    Box,
    Heading,
    Textarea,
    NumberInput,
    NumberInputField,
    Button,
    VStack,
    FormControl,
    FormLabel,
    List,
    ListItem,
    Flex,
    Alert,
    AlertIcon,
  } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";

function AnswerElaboration() {
  const [essayQuestion, setEssayQuestion] = useState('');
  const [answeredQuestions, setAnsweredQuestions] = useState('');
  const [essayLength, setEssayLength] = useState("");
  const [elaboration, setElaboration] = useState('');
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);  // New error state

  const sendElaborationRequest = async () => {
      setLoading(true);
      setError(null);  // Clear any previous error
      try {
        // http://127.0.0.1:5000/answer-elaboration
        // http://risings-gpt-server.azurewebsites.net/answer-elaboration
          const response = await fetch("https://risings-gpt-server.azurewebsites.net/answer-elaboration", {
              method: "POST",
              body: JSON.stringify({
                  essay_question: essayQuestion,
                  answered_questions: answeredQuestions,
                  essay_length: parseInt(essayLength, 10),
              }),
              headers: {
                  "Content-Type": "application/json",
              },
          });

          if (response.ok) {
              const data = await response.json();
              setElaboration(data.elaboration);
          } else {
              const errorText = await response.text();
              setError(errorText || "Failed to fetch from server");
          }
      } catch (error) {
          setError("Error sending elaboration request: " + error.message);
      } finally {
          setLoading(false);  
      }
  };


    return (
      <Flex
      bg="gray.50"
      minHeight="100vh"
      p={6}
      alignItems="center"
      justifyContent="center"
    >
      <Box width="70vw" bg="white" p={8} borderRadius="lg" boxShadow="md">
        <Heading mb={6} textAlign="center">
          Answer Elaboration
        </Heading>

        <VStack spacing={6} align="stretch">
        <FormControl>
      <FormLabel>Desired Essay Length</FormLabel>
      <NumberInput
        value={essayLength}
        onChange={(value) => setEssayLength(value)}
        placeholder="Enter desired essay length..."
        width="100%"
      >
        <NumberInputField placeholder="Input essay length" />
      </NumberInput>
    </FormControl>

          <FormControl>
            <FormLabel>Essay Question</FormLabel>
            <Textarea
              value={essayQuestion}
              onChange={e => setEssayQuestion(e.target.value)}
              placeholder="Enter your essay question..."
              size="md"
              rows={5}
              width="100%"
              resize="none"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Answered Questions</FormLabel>
            <Textarea
              value={answeredQuestions}
              onChange={e => setAnsweredQuestions(e.target.value)}
              placeholder="Enter your personal summary points..."
              size="md"
              rows={10}
              width="100%"
              resize="none"
            />
          </FormControl>

          <Button colorScheme="teal" w="full" onClick={sendElaborationRequest}>
            Generate Elaboration
          </Button>
        </VStack>

            {loading && (
                <Flex justifyContent="center" mt={6}>
                    <BeatLoader color="#00BFFF" loading={loading} size={15} />
                </Flex>
            )}

            {error && (
                <Alert status="error" mt={6}>
                    <AlertIcon />
                    {error}
                </Alert>
            )}

            {elaboration && (
              <Box mt={10} border="1px solid gray.200" borderRadius="md" p={4}>
                <Heading size="lg" mb={4}>
                  Generated Elaboration:
                </Heading>
                <p style={{ whiteSpace: "pre-line" }}>{elaboration}</p>
              </Box>
            )}
          </Box>
        </Flex>
    );
}

export default AnswerElaboration;