// EssayQualityModifier.jsx

import { BeatLoader } from "react-spinners";
import React, { useState } from "react";
import {
  Box,
  Heading,
  Textarea,
  RadioGroup,
  Radio,
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

function EssayQualityModifier() {
  const [essay, setEssay] = useState("");
  const [essayQuality, setEssayQuality] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);  // New loading state
  const [error, setError] = useState(null);  // New error state

  const sendQuestionsRequest = async () => {
    setLoading(true);
    setError(null);  // Clear any previous error
    try {
      const response = await fetch(
        "https://risings-gpt-server.azurewebsites.net/essay-quality-modifier",
        {
          method: "POST",
          body: JSON.stringify({
            current_essay: essay,
            essay_quality: essayQuality,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResponse(data.GPTResponse); // Set the response here
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
          Essay Quality Modifier
        </Heading>

        <VStack spacing={6} align="stretch">
          <FormControl>
            <FormLabel>Desired Essay Quality:</FormLabel>
            <RadioGroup
              onChange={(value) => setEssayQuality(value)}
              value={essayQuality}
            >
              <VStack spacing={2} alignItems="start">
                <Radio value="Good">Good</Radio>
                <Radio value="Decent">Decent</Radio>
                <Radio value="Poor">Poor</Radio>
              </VStack>
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Enter Essay:</FormLabel>
            <Textarea
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              placeholder="Enter your essay content..."
              size="md"
              rows={16}
              width="100%"
              resize="none"
            />
          </FormControl>

          <Button colorScheme="teal" w="full" onClick={sendQuestionsRequest}>
            Modify Essay
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
            Modified Essay:
          </Heading>
          <List>
            <ListItem p={4} style={{ whiteSpace: "pre-line" }}>
              {response}
            </ListItem>
          </List>
        </Box>
      </Box>
    </Flex>
  );
}

export default EssayQualityModifier;
