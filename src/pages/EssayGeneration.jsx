// EssayGeneration.jsx

import { BeatLoader } from "react-spinners";
import React, { useState } from "react";
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

function EssayGeneration() {
  const [essayQuestions, setEssayQuestion] = useState("");
  const [answeredQuestions, setPoints] = useState("");
  const [essayLength, setEssayLength] = useState("");
  const [responses, setResponses] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(false);  // New loading state
  const [error, setError] = useState(null);  // New error state

  const sendQuestionsRequest = async () => {
    setLoading(true);
    setError(null);  // Clear any previous error
    try {
      const response = await fetch("https://risings-gpt-server.azurewebsites.net/essay-generation", {
        method: "POST",
        body: JSON.stringify({
          essay_question: essayQuestions,
          answered_gpt_questions: answeredQuestions,
          essay_length: parseInt(essayLength, 10),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setResponses(data.GPTResponses);
        setPrompts(data.UserPrompts);
      } else {
        const errorText = await response.text();
        setError(errorText || "Failed to fetch from server");
      }
    } catch (error) {
      setError("Error sending question request: " + error.message);
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
          Essay Generation
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
              value={essayQuestions}
              onChange={(e) => setEssayQuestion(e.target.value)}
              placeholder="Enter your essay question..."
              size="md"
              rows={16}
              width="100%"
              resize="none"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Answered GPT Questions</FormLabel>
            <Textarea
              value={answeredQuestions}
              onChange={(e) => setPoints(e.target.value)}
              placeholder="Enter your answered questions..."
              size="md"
              rows={16}
              width="100%"
              resize="none"
            />
          </FormControl>

          <Button colorScheme="teal" w="full" onClick={sendQuestionsRequest}>
            Generate Essay
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

        <Box mt={10}>
          <Heading size="lg" mb={4}>
            Sent Prompts:
          </Heading>
          <List spacing={4}>
            {prompts.map((prompt, index) => (
              <Box
                key={index}
                border="1px solid gray.200"
                borderRadius="md"
                mb={3} // margin-bottom to separate boxes
              >
                <ListItem p={4} style={{ whiteSpace: "pre-line" }}>
                  {prompt}
                </ListItem>
              </Box>
            ))}
          </List>
        </Box>

        <Box mt={10}>
          <Heading size="lg" mb={4}>
            Generated Responses:
          </Heading>
          <List spacing={4}>
            {responses.map((response, index) => (
              <Box
                key={index}
                border="2px solid black"
                borderRadius="md"
                mb={3} // margin-bottom to separate boxes
              >
                <ListItem p={4} style={{ whiteSpace: "pre-line" }}>
                  {response}
                </ListItem>
              </Box>
            ))}
          </List>
        </Box>
      </Box>
    </Flex>
  );
}

export default EssayGeneration;
