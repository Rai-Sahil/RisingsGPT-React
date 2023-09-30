// HomePage.jsx

import React from "react";
import { Box, Button, Flex, VStack, Text, Spacer } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom"; // Rename the import to avoid conflicts
import { ArrowForwardIcon } from "@chakra-ui/icons";

function HomePage() {
  return (
    <Flex
      bg="gray.200"
      minHeight="100vh"
      p={6}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Getting Started:
      </Text>
      <VStack
        spacing={6}
        align="start"
        bg="white"
        p={8}
        boxShadow="xl"
        borderRadius="lg"
        width="80%"
      >
        <Flex width="100%">
          <Box>1) Generate Questions for Essay</Box>
          <Spacer />
          <RouterLink to="/question-generation">
            <Button rightIcon={<ArrowForwardIcon />} colorScheme="green">
              Generate Questions
            </Button>
          </RouterLink>
        </Flex>

        <Flex width="100%">
          <Box>2) Elaborate Answered Questions</Box>
          <Spacer />
          <RouterLink to="/answer-elaboration">
            <Button rightIcon={<ArrowForwardIcon />} colorScheme="green">
              Answer Elaboration
            </Button>
          </RouterLink>
        </Flex>

        <Flex width="100%">
          <Box>3) Generate Essay with Elaborated Questions</Box>
          <Spacer />
          <RouterLink to="/essay-generation">
            <Button rightIcon={<ArrowForwardIcon />} colorScheme="green">
              Generate Essay
            </Button>
          </RouterLink>
        </Flex>

        <Flex width="100%">
          <Box>4) Modify Essay Quality</Box>
          <Spacer />
          <RouterLink to="/essay-quality-modifier">
            <Button rightIcon={<ArrowForwardIcon />} colorScheme="green">
              Modify Essay Quality
            </Button>
          </RouterLink>
        </Flex>
      </VStack>
    </Flex>
  );
}

export default HomePage;
