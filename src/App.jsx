// App.jsx

import { useState, useEffect } from "react";
import { Box, Link as ChakraLink, Flex, Spacer } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ChakraProvider, VStack, Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import WebFont from "webfontloader"; // Import WebFont

import "./App.css";
import HomePage from "./pages/HomePage";
import ChatComponent from "./pages/ChatComponent.jsx";
import AnswerElaboration from "./pages/AnswerElaboration.jsx";
import QuestionGeneration from "./pages/QuestionGeneration.jsx";
import EssayGeneration from "./pages/EssayGeneration";
import EssayQualityModifier from "./pages/EssayQualityModifier";

import CustomMenuButton from "./components/CustomMenuButton";

// Load the Playfair Display font
WebFont.load({
  google: {
    families: ["Playfair Display:400,700", "sans-serif"],
  },
});

function PersonalElaboration() {
  return <div>Personal Elaboration Content</div>;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Added a new state to handle the menu button color
  const [menuButtonColor, setMenuButtonColor] = useState("black");

  const [whitePageZIndex, setWhitePageZIndex] = useState(-1);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <ChakraProvider>
      <Router>
        <Link to="/">
          <Text
            position="fixed"
            top="35px"
            left="30px"
            fontSize="24px"
            fontWeight="bold"
            fontFamily="Playfair Display"
            zIndex={5} // to ensure it's above most elements
            cursor="pointer" // change the cursor to indicate it's clickable
          >
            Risings GPT
          </Text>
        </Link>

        <CustomMenuButton
          style={{ position: "fixed", top: "2px", right: "20px" }}
          isHovered={isHovered}
          isMenuOpen={isMenuOpen}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={toggleMenu}
          barColor={menuButtonColor}
        />

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.75, ease: "circIn" }}
              style={{
                zIndex: 10,
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
              }}
            >
              <Box
                w="100vw"
                h="100vh"
                bg="white"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                pos="relative"
              >
                <VStack
                  spacing={4}
                  pos="absolute"
                  bottom="50px"
                  left="50px"
                  alignItems="flex-start"
                >
                  <Box
                    w="100vw"
                    h="100vh"
                    bg="white"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    pos="relative"
                  >
                    <VStack spacing={4} alignItems="center">
                      {/* <ChakraLink
                        as={Link}
                        to="/personal-elaboration"
                        onClick={toggleMenu}
                      >
                        Personal Elaboration
                      </ChakraLink> */}
                      <ChakraLink
                        as={Link}
                        to="/question-generation"
                        onClick={toggleMenu}
                      >
                        Question Generation
                      </ChakraLink>
                      <ChakraLink
                        as={Link}
                        to="/answer-elaboration"
                        onClick={toggleMenu}
                      >
                        Answer Elaboration
                      </ChakraLink>
                      <ChakraLink
                        as={Link}
                        to="/essay-generation"
                        onClick={toggleMenu}
                      >
                        Essay Generation
                      </ChakraLink>
                      <ChakraLink
                        as={Link}
                        to="/essay-quality-modifier"
                        onClick={toggleMenu}
                      >
                        Essay Quality Modifier
                      </ChakraLink>
                    </VStack>
                  </Box>
                </VStack>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        <Flex p={5} align="center" justify="center">
          <Box width="70vw">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/personal-elaboration"
                element={<PersonalElaboration />}
              />
              <Route
                path="/question-generation"
                element={<QuestionGeneration />}
              />
              <Route path="/essay-generation" element={<EssayGeneration />} />
              <Route
                path="/answer-elaboration"
                element={<AnswerElaboration />}
              />
              <Route
                path="/essay-quality-modifier"
                element={<EssayQualityModifier />}
              />
            </Routes>
          </Box>
        </Flex>
      </Router>
    </ChakraProvider>
  );
}

export default App;
