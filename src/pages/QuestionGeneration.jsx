// QuestionGeneration.jsx

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
import { BeatLoader } from "react-spinners";

function QuestionGeneration() {
  const [essay, setEssay] = useState("");
  const [points, setPoints] = useState("");
  const [questions, setQuestions] = useState("");
  const [essayLength, setEssayLength] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendQuestionsRequest = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://risings-gpt-server.azurewebsites.net/question-generation",
        {
          method: "POST",
          body: JSON.stringify({
            essay_question: essay,
            personal_summary_points: points,
            essay_length: parseInt(essayLength, 10),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setQuestions(data.questions);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch from server");
      }
    } catch (error) {
      setError(error.message || "Error sending question request");
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
          Question Generation
        </Heading>

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

        <FormControl mt={6}>
          <FormLabel>Essay Question</FormLabel>
          <Textarea
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            placeholder="Enter your essay question..."
            size="md"
            rows={5}
            width="100%"
            resize="none"
          />
        </FormControl>

        <FormControl mt={6}>
          <FormLabel>Personal Summary Points</FormLabel>
          <Textarea
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            placeholder="Enter your personal summary points..."
            size="md"
            rows={10}
            width="100%"
            resize="none"
          />
        </FormControl>

        <Button
          colorScheme="teal"
          w="full"
          mt={6}
          onClick={sendQuestionsRequest}
        >
          Generate Questions
        </Button>

        {/* {questions && (
                <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
                    <h3>Generated Questions:</h3>
                    <p>{questions}</p>
                </div>
            )} */}
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

        {questions && (
          <Box mt={10}>
            <Heading size="lg" mb={4}>
              Generated Questions:
            </Heading>
            <Box border="1px solid gray.200" borderRadius="md" mb={3}>
              <List>
                <ListItem p={4} style={{ whiteSpace: "pre-line" }}>
                  {questions}
                </ListItem>
              </List>
            </Box>
          </Box>
        )}
      </Box>
    </Flex>
  );
}

export default QuestionGeneration;
